import { RItems, upVersion, $$ } from '@/utils'

document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const {
    nodeName,
    offsetTop,
    dataset: { selection },
  } = target

  if (query) {
    if (!(nodeName === 'SECTION')) return
    RItems.value.has(query) ? RItems.value.delete(query) : RItems.value.add(query)
    upVersion()
  } else if (selection) {
    const 含有Sections = $$('section').filter((section) => section.textContent!.includes(selection))
    const 第一个Section = 含有Sections[0]
    const 末一个Section = 含有Sections[含有Sections.length - 1]
    const 下一个Section = 含有Sections.find((e) => e.offsetTop > offsetTop)
    const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < offsetTop)

    const jmp = (() => {
      if (shiftKey && ctrlKey) return 第一个Section
      if (ctrlKey) return 末一个Section
      if (shiftKey) return 上一个Section || 末一个Section
      return 下一个Section || 第一个Section
    })()

    document.documentElement.scrollBy({
      top: jmp.offsetTop - offsetTop,
      behavior: 'smooth',
    })
  }
})
