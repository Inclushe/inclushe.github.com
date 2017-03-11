(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
var element = document.querySelector('#element')
var textbox = document.querySelector('#textbox')
var urlTextbox = document.querySelector('#url')
var refitVideo = require('./refitVideo.js')
var refitTextbox = require('./refitTextbox.js')
var resetDialog = require('./resetDialog.js')

function setMessage (message) {
  var urlString = ''
  if (message) {
    urlString = String(document.location).replace(window.location.search, '') +
      '?message=' + encodeURIComponent(message)
  }
  return urlString
}
function getMessage () {
  var params = {}
  urlTextbox.value = String(document.location).replace(window.location.search, '')
  if (window.location.search !== '') {
    window.location.search.replace('?', '').split('&').forEach(function (val) {
      params[val.match(/(.*)=(.*)/)[1]] =
        decodeURIComponent(val.match(/(.*)=(.*)/)[2])
    })
    if (params.message) {
      textbox.textContent = params.message
      urlTextbox.value = setMessage(params.message)
    }
  }
}
getMessage()

refitVideo()
// get window params
window.addEventListener('load', refitVideo)
window.addEventListener('resize', refitVideo)

textbox.addEventListener('click', function () {
  if (element.classList.contains('viewing')) {
    element.classList.toggle('viewing')
    element.classList.toggle('editing')
  }
  refitTextbox()
})
textbox.addEventListener('keydown', function () {
  window.setTimeout(function () {
    urlTextbox.value = setMessage(textbox.textContent)
  }, 1)
  refitTextbox()
})
document.querySelector('#share-icon').addEventListener('click', function () {
  resetDialog()
  document.querySelector('#url-bar').classList.remove('hidden')
})
document.querySelector('#info').addEventListener('click', function () {
  resetDialog()
  document.querySelector('#notice').classList.remove('hidden')
})
document.querySelector('#exit').addEventListener('click', function () {
  element.classList.toggle('viewing')
  element.classList.toggle('editing')
})

},{"./refitTextbox.js":2,"./refitVideo.js":3,"./resetDialog.js":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = function () {
  document.querySelector('#dialog').classList.remove('hidden')
  Array.from(document.querySelectorAll('#dialog > div')).forEach(function (el) {
    el.classList.add('hidden')
  })
}

},{}]},{},[1]);
