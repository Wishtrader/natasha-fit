'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full border border-white/60 bg-white px-[18px] py-[16px] text-[14px] text-foreground outline-none transition-colors placeholder:text-[#777168] focus:border-foreground'

export function LeadForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    if (name.trim().length < 2 || phone.replace(/\D/g, '').length < 6) {
      setStatus('error')
      setError('Укажите имя и телефон.')
      return
    }

    setStatus('loading')
    setError('')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          honeypot,
          website: typeof window !== 'undefined' ? window.location.href : '',
        }),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!res.ok || !data?.ok) {
        setStatus('error')
        setError(data?.error ?? 'Что-то пошло не так. Попробуйте ещё раз.')
        return
      }

      setStatus('success')
      setName('')
      setPhone('')
    } catch {
      setStatus('error')
      setError('Нет связи. Попробуйте ещё раз.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mx-auto mt-[45px] flex max-w-[540px] flex-col items-center gap-[18px] border border-white/60 bg-white px-[28px] py-[38px] text-center text-foreground">
        <span className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-red text-white">
          <Check size={22} aria-hidden="true" />
        </span>
        <p className="m-0 font-serif text-[30px] leading-[1.05] tracking-[-.04em]">Заявка отправлена</p>
        <p className="m-0 max-w-[400px] text-[14px] leading-[1.5] text-[#777168]">
          Скоро свяжусь с вами и отправлю ссылки на участие в интенсиве.
        </p>
      </div>
    )
  }

  return (
    <form className="relative mx-auto mt-[45px] flex max-w-[540px] flex-col gap-[14px]" onSubmit={handleSubmit} noValidate>
      <label className="sr-only" htmlFor="lead-name">
        Имя
      </label>
      <input
        className={inputClass}
        id="lead-name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="ВАШЕ ИМЯ"
        value={name}
        maxLength={120}
        onChange={(e) => {
          setName(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
      />

      <label className="sr-only" htmlFor="lead-phone">
        Телефон
      </label>
      <input
        className={inputClass}
        id="lead-phone"
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        placeholder="ТЕЛЕФОН"
        value={phone}
        maxLength={40}
        onChange={(e) => {
          setPhone(e.target.value)
          if (status === 'error') setStatus('idle')
        }}
      />

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-company">Компания</label>
        <input
          id="lead-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {status === 'error' && error && (
        <p className="m-0 bg-foreground px-[16px] py-[12px] text-left text-[13px] text-white" role="alert">
          {error}
        </p>
      )}

      <button
        className="mt-[8px] inline-flex items-center justify-center gap-[8px] bg-foreground px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red disabled:pointer-events-none disabled:opacity-70"
        type="submit"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'ОТПРАВЛЯЕМ…' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}
        {status !== 'loading' && <ArrowUpRight size={17} aria-hidden="true" />}
      </button>

      <p className="m-0 text-center text-[11px] leading-[1.5] text-white/70">
        Оставляя заявку, вы соглашаетесь на обработку персональных данных.
      </p>
    </form>
  )
}
