export function getDomR(dom: HTMLElement) {
  const r = dom.getAttribute('rItemsDataKey')

  return r?.split(',')[0]
}
