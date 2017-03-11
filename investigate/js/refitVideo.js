var video = {
  containerElement: document.querySelector('.investigating-container'),
  element: document.querySelector('#investigating'),
  pointOfInterest: 640 / 1280
}

module.exports = function () {
  if (window.innerWidth < video.element.clientWidth) {
    var pointOnElement = (video.pointOfInterest * video.element.clientWidth)
    var marginAmount = (pointOnElement - (window.innerWidth / 2))
    if (marginAmount < 0) {
      video.element.removeAttribute('style')
    } else if (video.element.clientWidth - marginAmount < window.innerWidth) {
      video.element.style.marginLeft =
        -(video.element.clientWidth - window.innerWidth) + 'px'
    } else {
      video.element.style.marginLeft = -marginAmount + 'px'
    }
  } else {
    video.element.removeAttribute('style')
  }
}