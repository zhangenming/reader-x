import { setHoverR } from '../assets/utils'

document.addEventListener('mousemove', (e) => {
  const { target } = e
  if (!(target instanceof HTMLElement)) return
  setHoverR(target.dataset.selection!)
})
