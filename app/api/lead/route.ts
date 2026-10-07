import { NextResponse } from 'next/server'

const TELEGRAM_API = 'https://api.telegram.org'
const MAX_NAME = 120
const MAX_PHONE = 40
const RATE_WINDOW_MS = 10 * 60 * 1000
const RATE_MAX_HITS = 5

const hits = new Map<string, number[]>()

function rateLimited(key: string): boolean {
  const now = Date.now()
  const list = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  if (list.length >= RATE_MAX_HITS) {
    hits.set(key, list)
    return true
  }
  list.push(now)
  hits.set(key, list)
  return false
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: 'Заявки временно недоступны. Попробуйте позже.' },
      { status: 503 },
    )
  }

  if (rateLimited(clientKey(req))) {
    return NextResponse.json(
      { ok: false, error: 'Слишком много заявок. Попробуйте чуть позже.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Некорректный запрос.' }, { status: 400 })
  }

  const { name, phone, website, honeypot } = (body ?? {}) as Record<string, unknown>

  const cleanName = typeof name === 'string' ? name.trim().slice(0, MAX_NAME) : ''
  const cleanPhone = typeof phone === 'string' ? phone.trim().slice(0, MAX_PHONE) : ''

  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true })
  }

  const digits = cleanPhone.replace(/\D/g, '')
  if (cleanName.length < 2 || digits.length < 6) {
    return NextResponse.json(
      { ok: false, error: 'Укажите имя и телефон.' },
      { status: 400 },
    )
  }

  const source = typeof website === 'string' && website.trim() ? website.trim().slice(0, 300) : ''

  const now = new Date()
  const time = now.toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const text = [
    '<b>📩 Новая заявка — NatashaFIT</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(cleanName)}`,
    `<b>Телефон:</b> ${escapeHtml(cleanPhone)}`,
    source ? `<b>Страница:</b> ${escapeHtml(source)}` : '',
    `<b>Время:</b> ${escapeHtml(time)} (МСК)`,
  ]
    .filter(Boolean)
    .join('\n')

  let telegramOk = false
  let telegramDescription = ''

  try {
    const res = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      cache: 'no-store',
    })
    const data = (await res.json()) as { ok?: boolean; description?: string }
    telegramOk = Boolean(data.ok)
    telegramDescription = data.description ?? `HTTP ${res.status}`
  } catch (err) {
    telegramDescription = err instanceof Error ? err.message : 'network error'
  }

  if (!telegramOk) {
    console.error('[lead] telegram send failed:', telegramDescription)
    return NextResponse.json(
      { ok: false, error: 'Не удалось отправить заявку. Напишите нам напрямую.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
