module.exports = function () {
  document.querySelector('#dialog').classList.remove('hidden')
  Array.from(document.querySelectorAll('#dialog > div')).forEach(function (el) {
    el.classList.add('hidden')
  })
}
