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
  ['ДЕНЬ 1 · 28.10 · 19:00', 'Лёгкие ноги и сильная опора.', 'СТОПЫ И ГОЛЕНОСТОП', 'Мягко проработаем стопы и голени, добавим баланс и устойчивость.', 'меньше тяжести в стопах и ногах; больше свободы в голеностопе; лучше почувствуете опору'],
  ['ДЕНЬ 2 · 29.10 · 19:00', 'Подвижные бёдра и ягодицы.', 'ТАЗ, БЁДРА И ЯГОДИЦЫ', 'Добавим движения тазу, проработаем ягодицы и бёдра и подключим силовые упражнения.', 'больше свободы в движениях таза; лучше почувствуете работу ягодиц; тонус ягодиц и бёдер'],
  ['ДЕНЬ 3 · 30.10 · 19:00', 'Гибкий позвоночник и лёгкая спина.', 'ПОЗВОНОЧНИК И КОРПУС', 'Добавим движения грудному отделу и позвоночнику, поработаем с вращениями, дыханием и мышцами спины.', 'меньше скованности после сидения; больше свободы в корпусе; увидите связь подвижности и осанки'],
  ['ДЕНЬ 4 · 01.11 · 19:00', 'Лёгкая шея и свободные плечи.', 'ШЕЯ, ЛОПАТКИ И ПЛЕЧИ', 'Мягко проработаем лопатки и плечевой пояс и научимся лучше контролировать верх тела.', 'меньше зажатости; больше свободы в движениях плеч; расслабленное ощущение верхней части тела'],
  ['ДЕНЬ 5 · 02.11 · 19:00', 'Соединяем всё вместе.', 'ПОЛНОЦЕННАЯ ТРЕНИРОВКА', 'Соединим работу стоп, ног, ягодиц, таза, позвоночника и плеч. Добавим баланс и контроль.', 'почувствуете работу мышц всего тела; движения станут увереннее; увидите силу системной тренировки'],
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
  return (
    <a
      className="inline-flex items-center bg-red px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-!white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red"
      href="#register"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  )
}

function VisualBreak() {
  return (
    <section className="visual-break overflow-hidden w-full bg-foreground px-[1vw] py-[90px] text-cream max-md:px-[7vw] max-md:py-[70px]" aria-label="Фрагменты тренировок">
      <div className="mb-[55px] flex max-w-[920px] items-center gap-[18px] max-md:flex-wrap max-md:gap-[14px]">
        <Sparkles className="flex-none text-red" style={{ animation: 'pulse 2s ease-in-out infinite' }} size={20} aria-hidden="true" />
        <p className="m-0 font-serif text-[clamp(28px,4vw,58px)] leading-[1.05] tracking-[-.04em] max-md:flex-1 max-md:basis-[80%]">Движение — это не наказание. Это способ снова почувствовать себя в своём теле.</p>
        <span className="self-end whitespace-nowrap text-[9px] tracking-[.12em] text-[#aaa39a] max-md:ml-[35px]">НАТАЛЬЯ ФОМИНА· NATASHAFIT</span>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1.35fr] items-end gap-[14px] max-md:grid-cols-[1fr_1fr]">
        <figure className="group relative m-0 overflow-hidden aspect-[1/1.12] max-md:[&.gallery-detail]:col-span-full max-md:[&.gallery-detail]:aspect-[1.7/1]">
          <img className="h-full w-full object-cover saturate-[.7] grayscale transition-[transform,filter] duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:saturate-100 group-hover:grayscale-0" src="/natasha-fitness-mobility.png" alt="Упражнение на мобильность" />
          <figcaption className="absolute bottom-[13px] left-[15px] origin-bottom-left text-[9px] tracking-[.13em] text-black transition-all duration-300 group-hover:scale-200 group-hover:font-bold" style={{ textShadow: '0 1px 8px rgba(0, 0, 0, .4)' }}>МОБИЛЬНОСТЬ</figcaption>
        </figure>
        <figure className="group relative m-0 overflow-hidden aspect-[1/1.12]">
          <img className="h-full w-full object-cover saturate-[.7] grayscale transition-[transform,filter] duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:saturate-100 group-hover:grayscale-0" src="/natasha-fitness-strength.png" alt="Силовое упражнение" />
          <figcaption className="absolute bottom-[13px] left-[15px] origin-bottom-left text-[9px] tracking-[.13em] text-black transition-all duration-300 group-hover:scale-200 group-hover:font-bold" style={{ textShadow: '0 1px 8px rgba(0, 0, 0, .4)' }}>СИЛА</figcaption>
        </figure>
        <figure className="gallery-detail group relative m-0 overflow-hidden aspect-[1/1.12] max-md:col-span-full max-md:aspect-[1.7/1]">
          <img className="h-full w-full object-cover saturate-[.7] grayscale transition-[transform,filter] duration-800 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:saturate-100 group-hover:grayscale-0" src="/natasha-fitness-detail.png" alt="Деталь инвентаря для тренировки" />
          <figcaption className="absolute bottom-[13px] left-[15px] origin-bottom-left text-[9px] tracking-[.13em] text-white transition-all duration-300 group-hover:scale-200 group-hover:font-bold" style={{ textShadow: '0 1px 8px rgba(0, 0, 0, .4)' }}>ВНИМАНИЕ К ДЕТАЛЯМ</figcaption>
        </figure>
      </div>
    </section>
  )
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState<number | null>(0)
  const [time, setTime] = useState({ days: '04', hours: '12', minutes: '36', seconds: '18' })
  const [banner, setBanner] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement
    if (!cursor) return

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`

      const target = e.target as HTMLElement
      const isOnRed = target.closest('.bg-red') || target.closest('[class*="bg-red"]')
      if (isOnRed) {
        cursor.style.background = '#171716'
      } else {
        cursor.style.background = '#E8442F'
      }
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

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
      <div className="custom-cursor" />
      <header className={`sticky top-0 z-20 flex items-center justify-between border-b border-line bg-cream px-[1vw] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] max-md:px-[6vw] ${scrolled ? 'h-[56px] max-md:h-[50px]' : 'h-[82px] max-md:h-[70px]'}`}>
        <a href="#top" className={`flex font-serif font-bold leading-[.75] tracking-[-.06em] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${scrolled ? 'flex-row items-baseline' : 'flex-col'}`}>
          <span className={`transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${scrolled ? 'text-[22px] max-md:text-[18px]' : 'text-[28px] max-md:text-[24px]'}`}>Natasha</span>
          <span className={`text-red transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${scrolled ? 'ml-0 text-[22px] max-md:text-[18px]' : 'text-[28px] max-md:text-[24px]'}`}>FIT</span>
          <small className={`text-[9px] font-sans tracking-[.1em] transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${scrolled ? 'max-h-0 w-0 overflow-hidden opacity-0' : 'mt-2 opacity-100'}`}>НАТАЛЬЯ ФОМИНА</small>
        </a>
        <nav className={`flex items-center gap-[clamp(18px,3vw,48px)] text-[11px] font-bold max-md:absolute max-md:left-0 max-md:right-0 max-md:top-[69px] max-md:flex max-md:flex-col max-md:items-start max-md:border-b max-md:border-line max-md:bg-cream max-md:px-[6vw] max-md:py-[25px] ${menuOpen ? 'max-md:flex' : 'max-md:hidden'}`}>
          {nav.map(([label, href]) => (
            <div key={href} className="w-[90px] overflow-hidden">
              <a href={href} className="block whitespace-nowrap transition-all duration-300 hover:text-red! hover:underline hover:tracking-[.15em]" onClick={() => setMenuOpen(false)}>{label}</a>
            </div>
          ))}
          <a href="#register" className="group inline-flex items-center border border-red px-[16px] py-[8px] text-red! transition-all duration-300 hover:bg-red hover:text-white!" onClick={() => setMenuOpen(false)}>РЕГИСТРАЦИЯ <ArrowUpRight className="ml-2 text-red transition-colors duration-300 group-hover:text-white!" size={17} /></a>
        </nav>
        <button className="hidden flex-col gap-[6px] border-0 bg-none p-[10px_0_10px_10px] max-md:flex" onClick={() => setMenuOpen(!menuOpen)} aria-label="Открыть меню">
          <span className="w-[28px] border-t-2 border-foreground" />
          <span className="w-[28px] border-t-2 border-foreground" />
        </button>
      </header>

      <section className="grid w-full mx-auto min-h-[650px] grid-cols-[1.05fr_.95fr] border-b border-line max-md:min-h-[auto] max-md:flex max-md:flex-col-reverse" id="top">
        <div className="flex flex-col items-start justify-center py-[7vw] pr-[1vw] pl-[1vw] max-md:px-[7vw] max-md:pb-[100px] max-md:pt-[65px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">БЕСПЛАТНЫЙ ONLINE-ИНТЕНСИВ · 5 ДНЕЙ</p>
          <h1 className="max-w-[850px] font-serif text-[clamp(50px,6vw,94px)] font-semibold leading-[.93] tracking-[-.055em] max-md:text-[clamp(52px,13vw,84px)]">За 5 дней уменьшите отёчность, почувствуйте мышцы и добавьте телу <em className="not-italic text-red">тонуса</em></h1>
          <p className="mx-0 mb-[34px] mt-[30px] max-w-[470px] text-[16px] leading-[1.55]">Пять дней системной работы со всем телом, чтобы почувствовать первые изменения и понять, как продолжать работать над фигурой дальше.</p>
          <Button />
        </div>
        <div className="relative min-h-[650px] overflow-hidden bg-[#cfc4b5] max-md:min-h-[520px]">
          <img className="h-full w-full object-cover contrast-[1.06] saturate-[.75]" src="/natasha-fitness-hero.png" alt="Наталья ФоминаФомина  на тренировке" />
          <div className="absolute left-[34px] top-[34px] grid h-[90px] w-[90px] place-content-center rounded-full border border-foreground font-serif text-[40px]/[.7] text-center -rotate-12">
            5<br />
            <small className="text-[9px] font-sans tracking-[.8em] mt-4 ml-4 text-center">ДНЕЙ</small>
          </div>
          <div className="absolute bottom-[24px] right-[28px] text-[10px] leading-[1.4] tracking-[.12em]">
            СТАРТ<br />
            <strong className="font-serif text-[62px]/[.75] tracking-[-.06em]">28.10</strong>
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-[28px] bg-red px-[6vw] py-[22px] text-[11px] font-bold tracking-[.1em] text-white">
        <div>
          <span className="mr-[10px] inline-block h-[7px] w-[7px] rounded-full bg-white" />
          {banner === 0 ? 'СТАРТ 28 СЕНТЯБРЯ' : banner === 1 ? 'ДО СТАРТА ОСТАЛОСЬ' : 'ИНТЕНСИВ УЖЕ ИДЁТ'}
        </div>
        {banner === 1 && (
          <div className="flex gap-[12px]">
            {Object.entries(time).map(([key, value], i) => (
              <span key={key} className="flex flex-col font-serif text-[25px]">
                {value}
                <small className="text-[8px] font-sans tracking-[.1em]">{['ДНИ', 'ЧАСЫ', 'МИН', 'СЕК'][i]}</small>
              </span>
            ))}
          </div>
        )}
        {banner !== 1 && (
          <div className="font-normal tracking-[.04em]">5 тренировок × 40–45 минут · записи бессрочно</div>
        )}
        <a className="inline-flex items-center bg-foreground px-[17px] py-[12px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red" href="#register">
          {banner === 2 ? 'ПРИСОЕДИНИТЬСЯ СЕЙЧАС' : 'РЕГИСТРАЦИЯ'}
          <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
        </a>
      </section>

      <VisualBreak />

      <section className="section w-full grid grid-cols-[.9fr_1.1fr] gap-[6vw] px-[1vw] py-[115px] max-md:flex max-md:flex-col max-md:gap-[50px] max-md:px-[5vw] max-md:py-[80px]" id="result">
        <div className="mb-[70px] max-w-[810px] max-md:mb-[45px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ПЕРВЫЕ ИЗМЕНЕНИЯ</p>
          <h2 className="heading-reveal font-serif text-[clamp(50px,9vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">Как изменятся ощущения<br />в теле за 5 дней</h2>
        </div>
        <div className="border-t border-line">
          {[['Меньше отёчности', 'Почувствуете больше лёгкости в ногах и теле после движения.'], ['Больше тонуса', 'Начнёте лучше чувствовать работу ягодиц, ног и корпуса.'], ['Больше подвижности', 'Добавите движения стопам, тазу, позвоночнику и плечам.'], ['Первый шаг к изменению фигуры', 'Поймёте, как комплексно работать над более подтянутым силуэтом.']].map(([title, copy], i) => (
            <div className="group grid grid-cols-[70px_1fr] gap-[20px] border-b border-line px-[12px] py-[28px] transition-colors duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] hover:bg-red/10" key={title}>
              <span className="text-[11px] font-bold text-red">0{i + 1}</span>
              <div>
                <h3 className="m-0 mb-[10px] text-[17px] font-semibold leading-[1.05] uppercase tracking-[.02em] transition-[transform,color] duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:-translate-x-1 group-hover:text-red">{title}</h3>
                <p className="m-0 text-[14px] leading-[1.5] transition-[transform,color] duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)] group-hover:translate-x-1 group-hover:text-red/80">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground px-[1vw] py-[70px] text-cream max-md:px-[7vw] max-md:py-[65px]">
        <p className="mb-[50px] max-w-[600px] font-serif text-[clamp(28px,3vw,46px)] tracking-[-.04em]">И это ещё НЕ ВСЁ - в бесплатное участие входят:</p>
        <div className="grid grid-cols-3 gap-[30px] max-md:grid-cols-1">
          {[
            [<HeartPulse size={16} aria-hidden="true" />, 'СПЕЦЭФИР', 'с нутрициологом'],
            [<Play size={16} aria-hidden="true" />, 'СИЛОВАЯ', 'тренировка на всё тело'],
            [<Check size={16} aria-hidden="true" />, '«СИЛЬНЫЕ СТОПЫ»', '10 дополнительных упражнений'],
          ].map(([icon, title, desc]) => (
            <div key={String(title)}>
              <b className="flex items-center gap-2 text-[12px] font-bold tracking-[.08em] text-red">
                {icon}
                {title}
              </b>
              <span className="mt-2 block text-[14px]">{desc}</span>
            </div>
          ))}
        </div>
        <small className="mt-[55px] block text-[#aaa39a]">Все материалы и записи остаются у вас бессрочно.</small>
      </section>

      <section className="section bg-[#e5ded4] w-full px-[1vw] py-[115px] max-md:px-[7vw] max-md:py-[80px]" id="audience">
        <div className="mb-[70px] max-w-[710px] max-md:mb-[45px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ПРОВЕРЬТЕ СЕБЯ</p>
          <h2 className="heading-reveal font-serif text-[clamp(50px,7vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">Для кого этот<br /><em className="not-italic text-red">интенсив</em></h2>
          <p className="mt-[30px] max-w-[560px] text-[16px] leading-[1.55]">Если вы смотрите на своё тело и понимаете: пора что-то менять. Неважно, давно вы не тренировались или уже занимаетесь.</p>
        </div>
        <div className="grid grid-cols-3 gap-px border border-line bg-line max-md:grid-cols-1">
          {audience.map(([num, title, copy]) => (
            <article className="group bg-[#e5ded4] p-[25px] min-h-[210px] transition-colors duration-300 hover:bg-red hover:text-white max-md:min-h-[170px]" key={num}>
              <span className="text-[11px] font-bold text-red transition-colors duration-300 group-hover:text-white">{num}</span>
              <h3 className="mt-[55px] max-w-[230px] text-[17px] font-semibold leading-[1.05] uppercase tracking-[.02em] max-md:mt-[35px]">{title}</h3>
              <p className="mx-0 mt-4 max-w-[260px] text-[14px] leading-[1.5]">{copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-[70px] flex max-w-[930px] items-center justify-between gap-[30px] font-serif text-[27px]/[1.12] max-md:flex-col max-md:items-start max-md:text-[28px]">
          <div>
            Не нужно выбирать отдельное упражнение «от живота», «для ягодиц» или «для спины». За 5 дней я покажу, как начать работать со всем телом последовательно.
          </div>
          <Button />
        </div>
      </section>

      <section className="trainer grid grid-cols-2 bg-red text-white max-md:flex max-md:flex-col max-md:gap-[50px]">
        <div className="min-h-[680px] overflow-hidden max-md:min-h-[500px] max-md:max-h-[560px]">
          <img className="h-full w-full object-cover grayscale contrast-[1.1] mix-blend-multiply" src="/natasha-fitness-hero.png" alt="Наталья Фомина, тренер NatashaFIT" />
        </div>
        <div className="py-[10vw] px-[8vw] max-md:px-[7vw] max-md:py-[75px] max-md:pb-[95px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ВАШ ТРЕНЕР НА ЭТИ 5 ДНЕЙ</p>
          <h2 className="heading-reveal font-serif text-[clamp(70px,8vw,125px)] font-semibold leading-[.93] tracking-[-.055em]">Наталья<br /><em className="not-italic text-white">Фомина</em></h2>
          <h3 className="mx-0 mb-[26px] mt-[45px] max-w-[560px] font-serif text-[27px]/[1.1]">Я не хочу дать вам ещё пять тренировок. Я хочу, чтобы за эти 5 дней вы почувствовали разницу в теле и поняли, что делать дальше.</h3>
          <p className="mx-0 mb-[15px] max-w-[510px] text-[15px] leading-[1.5]">Более 10 лет я помогаю женщинам лучше чувствовать мышцы, понимать технику и тренировать тело не по частям, а комплексно.</p>
          <p className="mx-0 max-w-[510px] text-[15px] leading-[1.5]">На интенсиве мы пойдём шаг за шагом: от стоп до всего тела, чтобы вы понимали, зачем мы делаем упражнения и как это ведёт к результату.</p>
          <div className="my-[32px] border-b border-white/45 border-t border-white/45 py-[18px] text-[12px] leading-[1.8] tracking-[.08em]">
            10+ лет в фитнесе<br />
            2 спортивных высших образования<br />
            Инструктор-методист
          </div>
          <a className="inline-flex items-center bg-foreground px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red" href="#register">
            ЗАРЕГИСТРИРОВАТЬСЯ
            <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="section w-full bg-cream px-[1vw] py-[115px] max-md:px-[7vw] max-md:py-[80px]" id="program">
        <div className="mb-[70px] max-w-[710px] max-md:mb-[45px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ПРОГРАММА</p>
          <h2 className="heading-reveal font-serif text-[clamp(50px,7vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">5 дней — всё тело</h2>
          <p className="mt-[30px] max-w-[560px] text-[16px] leading-[1.55]">За 5 дней пройдём всё тело: от стоп до комплексной тренировки. Шаг за шагом возвращаем телу движение и соединяем всё в одну систему.</p>
        </div>
        <div className="mb-[50px] mt-[-20px] flex items-center max-md:mt-[-5px]">
          {days.map((_, i) => (
            <span key={i} className="flex-1 border-b border-foreground pb-[12px] font-serif text-[30px] max-md:text-[22px]">
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-5 gap-[12px] max-md:grid-cols-1">
          {days.map(([meta, title, zone, what, after], i) => (
            <article className={`border border-line p-[22px] min-h-[470px] max-md:min-h-[auto] ${i === 4 ? 'bg-foreground text-cream border-foreground' : ''}`} key={meta}>
              <p className="mb-[30px] min-h-[32px] text-[10px] font-bold tracking-[.14em]">{meta}</p>
              <h3 className="mb-[15px] font-serif text-[30px]/[.98] font-semibold tracking-[-.055em]">{title}</h3>
              <b className="block text-[10px] font-bold tracking-[.1em] text-red">{zone}</b>
              <p className="mt-[35px] text-[13px] leading-[1.5]">
                <strong className="block text-[10px] font-bold uppercase tracking-[.1em]">Что будем делать</strong>
                <br />{what}
              </p>
              <p className="mt-[35px] text-[13px] leading-[1.5]">
                <strong className="block text-[10px] font-bold uppercase tracking-[.1em]">Что получите после</strong>
                <br />
                {after.split('; ').map((x) => (
                  <span className="relative mt-[7px] block pl-[13px] before:absolute before:left-0 before:text-red" key={x}>{x}</span>
                ))}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-[65px] text-center">
          <p className="mb-[28px] font-serif text-[28px]">Почувствуйте первые изменения за 5 дней и поймите, как двигаться дальше.</p>
          <Button />
        </div>
      </section>

      <section className="nutrition w-full grid grid-cols-2 gap-[9vw] bg-foreground px-[1vw] py-[110px] text-cream max-md:flex max-md:flex-col max-md:gap-[50px] max-md:px-[7vw] max-md:py-[80px]">
        <div>
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">БОНУС · 03 НОЯБРЯ· 12:00</p>
          <h2 className="heading-reveal font-serif text-[clamp(60px,8vw,120px)] font-semibold leading-[.93] tracking-[-.055em]">Спецэфир c<br /><em className="not-italic text-white">нутрициологом</em></h2>
          <h3 className="mx-0 mb-[18px] mt-[38px] max-w-[500px] font-serif text-[28px]/[1.1]">Как снизить вес на 3–10 кг и удерживать результат без постоянных диет, запретов и откатов</h3>
          <p className="mx-0 mb-[30px] max-w-[460px] text-[15px] leading-[1.55]">Чтобы снижать вес, одной тренировки недостаточно. Поэтому в интенсиве будет отдельный эфир с понятной системой питания и конкретными рекомендациями.</p>
          <a className="inline-flex items-center bg-red px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red" href="#register">
            ЗАРЕГИСТРИРОВАТЬСЯ
            <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="self-end">
          {['Почему вес возвращается', 'Сколько есть именно вам', 'КБЖУ без фанатизма', 'Как соединить питание и тренировки', 'Как снижать вес и не откатываться', 'Ваши вопросы'].map((x, i) => (
            <div className="flex items-center gap-[22px] border-t border-[#554f48] py-[17px]" key={x}>
              <span className="text-[11px] text-red">0{i + 1}</span>
              <b className="text-[13px] tracking-[.04em]">{x}</b>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-[#e5ded4] px-[1vw] py-[115px] max-md:px-[7vw] max-md:py-[80px]">
        <div className="mb-[70px] max-w-[710px] max-md:mb-[45px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ДОСТУП НАВСЕГДА</p>
          <h2 className="heading-reveal font-serif text-[clamp(50px,7vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">Интенсив закончится.<br /><em className="not-italic text-red">Доступ останется.</em></h2>
        </div>
        <div className="grid grid-cols-4 gap-[16px] max-md:grid-cols-1">
          {[['5', 'ТРЕНИРОВОК', 'Основная программа интенсива'], ['+', '2 БОНУСНЫЕ ТРЕНИРОВКИ', 'Силовая на всё тело + комплекс для стоп'], ['+', 'ЭФИР С НУТРИЦИОЛОГОМ', 'Как снизить вес и удерживать результат'], ['∞', 'БЕССРОЧНЫЙ ДОСТУП', 'Смотрите и повторяйте в любое время']].map(([big, title, copy]) => (
            <div className="border-t border-foreground pt-[18px]" key={title}>
              <strong className="font-serif text-[80px] text-red">{big}</strong>
              <h3 className="my-[14px] text-[13px] font-semibold tracking-[.06em]">{title}</h3>
              <p className="m-0 text-[13px] leading-[1.45]">{copy}</p>
            </div>
          ))}
        </div>
        <p className="my-[90px] font-serif text-[clamp(32px,5vw,70px)] tracking-[-.05em] max-md:mt-[65px]">7 ТРЕНИРОВОК + ЭФИР НУТРИЦИОЛОГА <span className="text-red">= 0 BYN</span></p>
        <Button />
      </section>

      <section className="grid grid-cols-2 gap-[10vw] px-[1vw] py-[110px] max-md:flex max-md:flex-col max-md:gap-[50px] max-md:px-[7vw] max-md:py-[80px]">
        <div>
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">МИНИМУМ ОБОРУДОВАНИЯ</p>
          <h2 className="heading-reveal mb-[38px] font-serif text-[clamp(55px,7vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">Что понадобится<br /><em className="not-italic text-red">для тренировок</em></h2>
          <Button />
        </div>
        <div>
          {[['01', 'КОВРИК', 'Для тренировок и упражнений на полу.'], ['02', 'МФР-РОЛЛ', 'Для самомассажа и подготовки мышц к движению.'], ['03', 'МЯЧИК ДЛЯ СТОП', 'Для работы со стопами и отдельными зонами.']].map(([num, title, copy]) => (
            <div className="flex gap-[25px] border-t border-line py-[23px]" key={num}>
              <span className="text-[11px] font-bold text-red">{num}</span>
              <div>
                <h3 className="mx-0 mb-[8px] text-[15px] font-semibold tracking-[.08em]">{title}</h3>
                <p className="m-0 text-[14px]">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section grid grid-cols-[.75fr_1.25fr] gap-[8vw] bg-[#e5ded4] max-md:flex max-md:flex-col max-md:gap-[50px]">
        <div className="px-[1vw] py-[115px] max-md:px-[7vw] max-md:py-[80px]">
          <p className="mb-6 text-[10px] font-bold tracking-[.14em]">ОТВЕТЫ</p>
          <h2 className="heading-reveal font-serif text-[clamp(50px,7vw,100px)] font-semibold leading-[.93] tracking-[-.055em]">Остались<br /><em className="not-italic text-red">вопросы?</em></h2>
        </div>
        <div className="px-[1vw] py-[115px] max-md:px-[7vw] max-md:py-[80px]">
          <div className="border-t border-line">
            {faqs.map(([q, a], i) => (
              <div className="border-b border-line" key={q}>
                <button
                  className="flex w-full cursor-pointer items-center justify-between border-0 bg-none py-[21px] text-left text-[15px] font-bold"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                >
                  <span className="font-bold">{q}</span>
                  <b className="text-[23px] font-normal text-red">{faqOpen === i ? '−' : '+'}</b>
                </button>
                <div className={`accordion-content ${faqOpen === i ? 'open' : ''}`}>
                  <div>
                    <p className="-mt-1 mb-[22px] mr-[35px] max-w-[600px] text-[14px] leading-[1.5]">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[30px] max-md:mt-[20px]">
            <a className="inline-flex items-center bg-red px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red" href="#register">
              ЗАРЕГИСТРИРОВАТЬСЯ
              <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="bg-red px-[8vw] py-[145px] text-center text-white max-md:px-[7vw] max-md:py-[100px] max-md:pb-[130px]" id="register">
        <p className="mb-[30px] text-[10px] font-bold tracking-[.14em]">NATASHAFIT · СТАРТ 28 СЕНТЯБРЯ</p>
        <h2 className="heading-reveal font-serif text-[clamp(55px,8vw,125px)] font-semibold leading-[.93] tracking-[-.055em]">Дайте своему телу<br /><em className="text-foreground">5 дней</em> и почувствуйте<br />первые изменения сами</h2>
        <a className="mt-[45px] inline-flex items-center bg-foreground px-[23px] py-[17px] text-[11px] font-bold tracking-[.12em] text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-dark-red" href="#register">
          ЗАРЕГИСТРИРОВАТЬСЯ
          <ArrowUpRight className="ml-2" size={17} aria-hidden="true" />
        </a>
      </section>

      <footer className="flex items-center justify-between px-[5vw] py-[25px] text-[11px] tracking-[.04em] max-md:flex-wrap max-md:gap-[18px] max-md:pb-[85px]">
        <a href="#top" className="flex flex-col font-serif text-[24px] font-bold leading-[.75] tracking-[-.06em]">
          Natasha<span className="text-red">FIT</span>
        </a>
        <p className="m-0 text-[#777168]">Бесплатный online-интенсив Натальи Фоминой</p>
        <a href="#top">НАВЕРХ ↑</a>
      </footer>

      <a className="fixed bottom-0 left-0 right-0 z-30 block bg-red px-[18px] py-[18px] text-center text-[11px] font-bold tracking-[.12em] text-white md:hidden" href="#register">
        ЗАРЕГИСТРИРОВАТЬСЯ <span className="ml-2">↗</span>
      </a>
    </main>
  )
}
