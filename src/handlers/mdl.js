window.docReady(() => {
  /**
   * Add click listeners to drawer items to close it
   */
  let closeDrawer = () => {
    let obfuscator = document.querySelector('.mdl-layout__obfuscator')
    let drawer = document.querySelector('.mdl-layout__drawer')

    obfuscator.className = obfuscator.className.replace(/\s?is-visible/, '')
    drawer.className = drawer.className.replace(/\s?is-visible/, '')
  }

  document.querySelectorAll('.mdl-navigation__link').forEach((item) => {
    item.addEventListener('click', closeDrawer)
  })
})
