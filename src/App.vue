<script setup lang="ts">
import { onMounted } from 'vue'
import './loop'
import { deleteItem, findAllIndex, globalData, setHoverR, upVersion } from './utils'
import { dom2Data } from './utilsReader'
import { allSectionsData, datas } from './data'

document.addEventListener('click', (e) => {
  const { target, shiftKey, ctrlKey } = e
  if (!target) return
  if (!(target instanceof HTMLElement)) return

  const query = getSelection() + ''
  getSelection()!.empty()

  const { nodeName, offsetTop } = target

  if (query) {
    if (!(nodeName === 'SECTION')) return
    allSectionsData.forEach((section) => {
      findAllIndex(section.join(''), query).forEach((i) => {
        // section[i].R.includes(query) ? deleteItem(section[i].R, query) : section[i].R.push(query)
      })
    })
  } else {
    console.log(dom2Data(target))

    // const 含有Sections = sectionDoms.filter((section) => section.textContent!.includes(selection))
    // const 第一个Section = 含有Sections[0]
    // const 末一个Section = 含有Sections[含有Sections.length - 1]
    // const 下一个Section = 含有Sections.find((e) => e.offsetTop > offsetTop)
    // const 上一个Section = 含有Sections.findLast((e) => e.offsetTop < offsetTop)

    // const jmp = (() => {
    //   if (shiftKey && ctrlKey) return 第一个Section
    //   if (ctrlKey) return 末一个Section
    //   if (shiftKey) return 上一个Section || 末一个Section
    //   return 下一个Section || 第一个Section
    // })()

    // document.documentElement.scrollBy({
    //   top: jmp.offsetTop - offsetTop,
    //   behavior: 'smooth',
    // })
  }
})
document.addEventListener('mousemove', (e) => {
  const { target } = e
  if (!(target instanceof HTMLElement)) return
  setHoverR(target.dataset.selection!)
})

// onMounted(() => {
//   globalData.sectionDoms = Array.from(document.querySelectorAll('section'))
// })

// document.querySelector('#app')!.innerHTML = datas
//   .map(
//     (line) =>
//       `<line>${line
//         .map(
//           (block) =>
//             `<block>${block
//               .map(
//                 (section) =>
//                   `<section class="${section.spk ? 'spk' : ''}">${section
//                     .map(
//                       (word) =>
//                         `<word style="${word.R?.size ? 'color:red' : ''}">${word.word}</word>`
//                     )
//                     .join('')}</section>`
//               )
//               .join('')}</block>`
//         )
//         .join('')}</line>`
//   )
//   .join('')
</script>

<template>
  <line v-for="line of datas">
    <block v-for="block of line">
      <section v-for="section of block" :class="section.spk && 'spk'">
        <word v-for="word of section" :style="0 ? 'color:red' : ''">
          {{ word }}
        </word>
      </section>
    </block>
  </line>
</template>
