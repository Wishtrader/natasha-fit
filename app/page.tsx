'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowUpRight, Check, HeartPulse, Play, Sparkles } from 'lucide-react'

const benefits = [
  ['01', 'МЕНЬШЕ ОТЁЧНОСТИ', 'Почувствуете больше лёгкости в ногах и теле после движения.'],
  ['02', 'БОЛЬШЕ ТОНУСА', 'Начнёте лучше чувствовать ягодицы, ноги, спину и корпус.'],
  ['03', 'БОЛЕЕ ПОДТЯНУТЫЙ СИЛУЭТ', 'Начнёте комплексно работать с животом, ягодицами, бёдрами и корпусом.'],
  ['04', 'БОЛЬШЕ ПОДВИЖНОСТИ', 'Почувствуете больше свободы в наклонах, приседаниях и движениях таза, спины и плеч.'],
  ['05', 'РАБОТА С ЦЕЛЛЮЛИТОМ', 'Поймёте, как движение, мышечная работа и питание помогают менять качество тела.'],
  ['06', 'ПОНЯТНЫЙ ПУТЬ К СНИЖЕНИЮ ВЕСА', 'Поймёте, как соединить тренировки и питание без постоянных диет и откатов.'],
]

const audience = [
  ['01', 'ТЕЛО СТАЛО ОТЕКАТЬ', 'К вечеру появляется тяжесть, хочется чувствовать себя легче.'],
  ['02', 'ФИГУРА ИЗМЕНИЛАСЬ', 'Живот, бёдра, ягодицы и качество кожи уже не радуют так, как раньше.'],
  ['03', 'ТЕЛО СТАЛО «ДЕРЕВЯННЫМ»', 'После сна или сидячего дня хочется размять спину, шею и таз.'],
  ['04', 'НЕ ЧУВСТВУЕТЕ НУЖНЫЕ МЫШЦЫ', 'Делаете упражнения, но нагрузку забирает поясница или «не то».'],
  ['05', 'ТРЕНИРУЕТЕСЬ, НО НЕ ВИДИТЕ РЕЗУЛЬТАТА', 'Стараетесь, а тонус, силуэт и ощущения почти не меняются.'],
  ['06', 'НЕ ПОНИМАЕТЕ, ЧТО ДЕЛАТЬ', 'Упражнений много, но нет понятной последовательности и системы.'],
]

const days = [
  ['ДЕНЬ 1 · 28.09 · 19:00', 'Лёгкие ноги и сильная опора.', 'СТОПЫ И ГОЛЕНОСТОП', 'Мягко проработаем стопы и голени, добавим баланс и устойчивость.', 'меньше тяжести в стопах и ногах; больше свободы в голеностопе; лучше почувствуете опору'],
  ['ДЕНЬ 2 · 29.09 · 19:00', 'Подвижные бёдра и ягодицы.', 'ТАЗ, БЁДРА И ЯГОДИЦЫ', 'Добавим движения тазу, проработаем ягодицы и бёдра и подключим силовые упражнения.', 'больше свободы в движениях таза; лучше почувствуете работу ягодиц; тонус ягодиц и бёдер'],
  ['ДЕНЬ 3 · 30.09 · 19:00', 'Гибкий позвоночник и лёгкая спина.', 'ПОЗВОНОЧНИК И КОРПУС', 'Добавим движения грудному отделу и позвоночнику, поработаем с вращениями, дыханием и мышцами спины.', 'меньше скованности после сидения; больше свободы в корпусе; увидите связь подвижности и осанки'],
  ['ДЕНЬ 4 · 01.10 · 19:00', 'Лёгкая шея и свободные плечи.', 'ШЕЯ, ЛОПАТКИ И ПЛЕЧИ', 'Мягко проработаем лопатки и плечевой пояс и научимся лучше контролировать верх тела.', 'меньше зажатости; больше свободы в движениях плеч; расслабленное ощущение верхней части тела'],
  ['ДЕНЬ 5 · 02.10 · 19:00', 'Соединяем всё вместе.', 'ПОЛНОЦЕННАЯ ТРЕНИРОВКА', 'Соединим работу стоп, ног, ягодиц, таза, позвоночника и плеч. Добавим баланс и контроль.', 'почувствуете работу мышц всего тела; движения станут увереннее; увидите силу системной тренировки'],
]

const faqs = [
  ['Интенсив действительно бесплатный?', 'Да. Участие, 5 тренировок, эфир с нутрициологом и дополнительные материалы — бесплатно.'],
  ['Я давно не тренировалась. Мне подойдёт?', 'Да. Я буду объяснять технику и давать понятную последовательность работы.'],
  ['А если я не смогу быть на тренировке в 19:00?', 'Ничего страшного. Все тренировки останутся в записи бессрочно.'],
  ['Если интенсив уже начался, можно присоединиться?', 'Да. После регистрации вы получите доступ к уже прошедшим тренировкам.'],
  ['Что понадобится для занятий?', 'Коврик, МФР-ролл и мячик для стоп.'],
  ['Где будут проходить тренировки?', 'Онлайн. Все ссылки, записи и материалы вы получите в Telegram.'],
  ['Когда я получу бонусные тренировки?', 'После завершения основной программы интенсива.'],
  ['Сколько будет доступна запись?', 'Бессрочно — вы сможете возвращаться к тренировкам и материалам в любое время.'],
]

function Button({ children = 'ЗАРЕГИСТРИРОВАТЬСЯ' }: { children?: React.ReactNode }) {
  return <a className="cta-button" href="#register">{children}<ArrowUpRight size={17} aria-hidden="true" /></a>
}

function VisualBreak() {
  return <section className="visual-break" aria-label="Фрагменты тренировок">
    <div className="visual-break-copy"><Sparkles size={20} aria-hidden="true" /><p>Движение — это не наказание. Это способ снова почувствовать себя в своём теле.</p><span>НАТАЛЬЯ КОРОТКАЯ · NATASHAFIT</span></div>
    <div className="visual-gallery"><figure className="gallery-tall"><img src="/natasha-fitness-mobility.png" alt="Упражнение на мобильность" /><figcaption>МОБИЛЬНОСТЬ</figcaption></figure><figure><img src="/natasha-fitness-strength.png" alt="Силовое упражнение" /><figcaption>СИЛА</figcaption></figure><figure className="gallery-detail"><img src="/natasha-fitness-detail.png" alt="Деталь инвентаря для тренировки" /><figcaption>ВНИМАНИЕ К ДЕТАЛЯМ</figcaption></figure></div>
  </section>
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [time, setTime] = useState({ days: '04', hours: '12', minutes: '36', seconds: '18' })
  const [banner, setBanner] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setTime((t) => {
      let total = Number(t.days) * 86400 + Number(t.hours) * 3600 + Number(t.minutes) * 60 + Number(t.seconds) - 1
      if (total < 0) total = 0
      return { days: String(Math.floor(total / 86400)).padStart(2, '0'), hours: String(Math.floor((total % 86400) / 3600)).padStart(2, '0'), minutes: String(Math.floor((total % 3600) / 60)).padStart(2, '0'), seconds: String(total % 60).padStart(2, '0') }
    }), 1000)
    const rotate = window.setInterval(() => setBanner((b) => (b + 1) % 3), 7000)
    return () => { window.clearInterval(timer); window.clearInterval(rotate) }
  }, [])

  const nav = useMemo(() => [['РЕЗУЛЬТАТ', '#result'], ['ДЛЯ КОГО', '#audience'], ['ПРОГРАММА', '#program']], [])

  return (
    <main>
      <header className="site-header">
        <a href="#top" className="wordmark">Natasha<span>FIT</span><small>НАТАЛЬЯ КОРОТКАЯ</small></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}<a href="#register" className="nav-cta" onClick={() => setMenuOpen(false)}>РЕГИСТРАЦИЯ <span>↗</span></a></nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню"><span /><span /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy"><p className="eyebrow">БЕСПЛАТНЫЙ ONLINE-ИНТЕНСИВ · 5 ДНЕЙ</p><h1>За 5 дней уменьшите отёчность, почувствуйте мышцы и добавьте телу <em>тонуса</em></h1><p className="hero-sub">Пять дней системной работы со всем телом, чтобы почувствовать первые изменения и понять, как продолжать работать над фигурой дальше.</p><Button /></div>
        <div className="hero-visual"><img src="/natasha-fitness-hero.png" alt="Наталья Короткая на тренировке" /><div className="hero-stamp">5<br /><small>ДНЕЙ</small></div><div className="hero-caption">СТАРТ<br /><strong>28.09</strong></div></div>
      </section>

      <section className="announcement"><div><span className="live-dot" />{banner === 0 ? 'СТАРТ 28 СЕНТЯБРЯ' : banner === 1 ? 'ДО СТАРТА ОСТАЛОСЬ' : 'ИНТЕНСИВ УЖЕ ИДЁТ'}</div>{banner === 1 && <div className="countdown">{Object.entries(time).map(([key, value], i) => <span key={key}>{value}<small>{['ДНИ', 'ЧАСЫ', 'МИН', 'СЕК'][i]}</small></span>)}</div>}{banner !== 1 && <div className="announcement-detail">5 тренировок × 40–45 минут · записи бессрочно</div>}<Button>{banner === 2 ? 'ПРИСОЕДИНИТЬСЯ СЕЙЧАС' : 'РЕГИСТРАЦИЯ'}</Button></section>

      <VisualBreak />

      <section className="section result-section" id="result"><div className="section-heading"><p className="eyebrow">ПЕРВЫЕ ИЗМЕНЕНИЯ</p><h2>Как изменятся ощущения<br />в теле за 5 дней</h2></div><div className="result-list">{[['Меньше отёчности', 'Почувствуете больше лёгкости в ногах и теле после движения.'], ['Больше тонуса', 'Начнёте лучше чувствовать работу ягодиц, ног и корпуса.'], ['Больше подвижности', 'Добавите движения стопам, тазу, позвоночнику и плечам.'], ['Первый шаг к изменению фигуры', 'Поймёте, как комплексно работать над более подтянутым силуэтом.']].map(([title, copy], i) => <div className="result-row" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>

      <section className="bonus-strip"><p>И это ещё не всё — в бесплатное участие входят:</p><div className="bonus-items"><div><b><HeartPulse size={16} aria-hidden="true" /> СПЕЦЭФИР</b><span>с нутрициологом</span></div><div><b><Play size={16} aria-hidden="true" /> СИЛОВАЯ</b><span>тренировка на всё тело</span></div><div><b><Check size={16} aria-hidden="true" /> «СИЛЬНЫЕ СТОПЫ»</b><span>10 дополнительных упражнений</span></div></div><small>Все материалы и записи остаются у вас бессрочно.</small></section>

      <section className="section card-section" id="audience"><div className="section-heading"><p className="eyebrow">ПРОВЕРЬТЕ СЕБЯ</p><h2>Для кого этот<br /><em>интенсив</em></h2><p>Если вы смотрите на своё тело и понимаете: пора что-то менять. Неважно, давно вы не тренировались или уже занимаетесь.</p></div><div className="number-grid">{audience.map(([num, title, copy]) => <article key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="callout">Не нужно выбирать отдельное упражнение «от живота», «для ягодиц» или «для спины». За 5 дней я покажу, как начать работать со всем телом последовательно.<Button /></div></section>

      <section className="trainer"><div className="trainer-image"><img src="/natasha-fitness-hero.png" alt="Наталья Короткая, тренер NatashaFIT" /></div><div className="trainer-copy"><p className="eyebrow">ВАШ ТРЕНЕР НА ЭТИ 5 ДНЕЙ</p><h2>Наталья<br /><em>Короткая</em></h2><h3>Я не хочу дать вам ещё пять тренировок. Я хочу, чтобы за эти 5 дней вы почувствовали разницу в теле и поняли, что делать дальше.</h3><p>Более 10 лет я помогаю женщинам лучше чувствовать мышцы, понимать технику и тренировать тело не по частям, а комплексно.</p><p>На интенсиве мы пойдём шаг за шагом: от стоп до всего тела, чтобы вы понимали, зачем мы делаем упражнения и как это ведёт к результату.</p><div className="credentials">10+ лет в фитнесе<br />2 спортивных высших образования<br />Инструктор-методист</div><Button /></div></section>

      <section className="section program" id="program"><div className="section-heading"><p className="eyebrow">ПРОГРАММА</p><h2>5 дней — всё тело</h2><p>За 5 дней пройдём всё тело: от стоп до комплексной тренировки. Шаг за шагом возвращаем телу движение и соединяем всё в одну систему.</p></div><div className="day-line">{days.map((_, i) => <span key={i}>{String(i + 1).padStart(2, '0')}</span>)}</div><div className="day-grid">{days.map(([meta, title, zone, what, after], i) => <article className={i === 4 ? 'day-card featured' : 'day-card'} key={meta}><p className="eyebrow">{meta}</p><h3>{title}</h3><b>{zone}</b><p><strong>Что будем делать</strong><br />{what}</p><p><strong>Что получите после</strong><br />{after.split('; ').map((x) => <span className="bullet" key={x}>{x}</span>)}</p></article>)}</div><div className="center-cta"><p>Почувствуйте первые изменения за 5 дней и поймите, как двигаться дальше.</p><Button /></div></section>

      <section className="nutrition"><div><p className="eyebrow">БОНУС · 03 ОКТЯБРЯ · 12:00</p><h2>Спецэфир<br /><em>с нутрициологом</em></h2><h3>Как снизить вес на 3–10 кг и удерживать результат без постоянных диет, запретов и откатов</h3><p>Чтобы снижать вес, одной тренировки недостаточно. Поэтому в интенсиве будет отдельный эфир с понятной системой питания и конкретными рекомендациями.</p><Button /></div><div className="topic-list">{['Почему вес возвращается', 'Сколько есть именно вам', 'КБЖУ без фанатизма', 'Как соединить питание и тренировки', 'Как снижать вес и не откатываться', 'Ваши вопросы'].map((x, i) => <div key={x}><span>0{i + 1}</span><b>{x}</b></div>)}</div></section>

      <section className="section access"><div className="section-heading"><p className="eyebrow">ДОСТУП НАВСЕГДА</p><h2>Интенсив закончится.<br /><em>Доступ останется.</em></h2></div><div className="access-grid">{[['5', 'ТРЕНИРОВОК', 'Основная программа интенсива'], ['+', '2 БОНУСНЫЕ ТРЕНИРОВКИ', 'Силовая на всё тело + комплекс для стоп'], ['+', 'ЭФИР С НУТРИЦИОЛОГОМ', 'Как снизить вес и удерживать результат'], ['∞', 'БЕССРОЧНЫЙ ДОСТУП', 'Смотрите и повторяйте в любое время']].map(([big, title, copy]) => <div key={title}><strong>{big}</strong><h3>{title}</h3><p>{copy}</p></div>)}</div><div className="price-line">7 ТРЕНИРОВОК + ЭФИР НУТРИЦИОЛОГА <span>= 0 BYN</span></div><Button /></section>

      <section className="equipment"><div><p className="eyebrow">МИНИМУМ ОБОРУДОВАНИЯ</p><h2>Что понадобится<br /><em>для тренировок</em></h2><Button /></div><div className="equipment-list">{[['01', 'КОВРИК', 'Для тренировок и упражнений на полу.'], ['02', 'МФР-РОЛЛ', 'Для самомассажа и подготовки мышц к движению.'], ['03', 'МЯЧИК ДЛЯ СТОП', 'Для работы со стопами и отдельными зонами.']].map(([num, title, copy]) => <div key={num}><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></section>

      <section className="section faq"><div className="section-heading"><p className="eyebrow">ОТВЕТЫ</p><h2>Остались<br /><em>вопросы?</em></h2></div><div className="faq-list">{faqs.map(([q, a], i) => <div className={faqOpen === i ? 'faq-item active' : 'faq-item'} key={q}><button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i}><span>{q}</span><b>{faqOpen === i ? '−' : '+'}</b></button>{faqOpen === i && <p>{a}</p>}</div>)}</div><Button /></section>

      <section className="final-cta" id="register"><p className="eyebrow">NATASHAFIT · СТАРТ 28 СЕНТЯБРЯ</p><h2>Дайте своему телу<br /><em>5 дней</em> и почувствуйте<br />первые изменения сами</h2><Button /></section>
      <footer><a href="#top" className="wordmark">Natasha<span>FIT</span></a><p>Бесплатный online-интенсив Натальи Короткой</p><a href="#top">НАВЕРХ ↑</a></footer>
      <a className="mobile-sticky" href="#register">ЗАРЕГИСТРИРОВАТЬСЯ <span>↗</span></a>
    </main>
  )
}
