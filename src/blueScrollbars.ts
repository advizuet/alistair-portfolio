const SELECTOR = '.split__left, .split__right, .section-copy, .work__list'

function paint(el: HTMLElement) {
  const overflow = el.scrollHeight - el.clientHeight
  if (overflow <= 1) {
    el.style.setProperty('--sb-h', '0px')
    el.style.setProperty('--sb-top', '0px')
    el.style.setProperty('--sb-track-h', '0px')
    el.style.setProperty('--sb-track-top', '0px')
    return
  }
  const scrollTop = Math.max(0, Math.min(el.scrollTop, overflow))
  const thumbH = Math.max(24, (el.clientHeight / el.scrollHeight) * el.clientHeight)
  const y = (scrollTop / overflow) * (el.clientHeight - thumbH)
  el.style.setProperty('--sb-h', `${thumbH}px`)
  el.style.setProperty('--sb-top', `${scrollTop + y}px`)
  el.style.setProperty('--sb-track-h', `${el.clientHeight}px`)
  el.style.setProperty('--sb-track-top', `${scrollTop}px`)
}

export function startBlueScrollbars() {
  const paintAll = () => {
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach(paint)
  }

  document.addEventListener(
    'scroll',
    (event) => {
      const target = event.target
      if (target instanceof HTMLElement && target.matches(SELECTOR)) {
        paint(target)
      }
    },
    true,
  )
  window.addEventListener('resize', paintAll)
  document.addEventListener('load', paintAll, true)

  const observer = new ResizeObserver(paintAll)
  const watch = () => {
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => observer.observe(el))
    paintAll()
  }

  const mutations = new MutationObserver(watch)
  mutations.observe(document.getElementById('root') ?? document.body, {
    childList: true,
    subtree: true,
  })
  watch()
}
