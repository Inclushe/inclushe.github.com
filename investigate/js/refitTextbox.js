module.exports = function () {
  window.setTimeout(function () {
    var textbox = document.querySelector('#textbox')
    var coords = textbox.getBoundingClientRect()
    if (window.innerHeight > (coords.top) + (coords.height)) {
      textbox.removeAttribute('style')
      textbox.dataset.maxHeight =
        (textbox.getBoundingClientRect().height)
    } else {
      textbox.setAttribute('style', 'max-height: ' +
        textbox.dataset.maxHeight + 'px; overflow-y: scroll')
    }
  }, 1)
}
