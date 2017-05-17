(function() {
  let modules = new function() {
    this.niceScroll = () => {
    }

    this.hamburguer = () => {
      let iconHamburguer = document.querySelector('.icon-hamburguer')

      iconHamburguer.addEventListener('click', () => {
        iconHamburguer.classList.toggle('close-hamburguer')
      })
    }
  }

  let init = () => {
    modules.niceScroll()
    modules.hamburguer()
  }

  return init()
})()
