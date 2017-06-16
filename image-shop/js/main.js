(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)
var objects = {}

function hello () {
  var request = new window.XMLHttpRequest()
  request.open('GET', 'assets/products.json', true)
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      objects = JSON.parse(request.responseText)
    } else {
      console.log(request.status)
    }
  }
  request.onerror = function () {
    console.log('Could not retrieve projects.')
  }
  request.send()
}

hello()

function updateDialog (el) {
  for (var i = 0; i < $$('#hover g path').length; i++) {
    $$('#hover g path')[i].removeAttribute('class')
  }
  el.target.setAttribute('class', 'active')
  $('#title').textContent = objects[el.target.id]['title']
  $('#link').href = 'https://www.google.com/search?q=' + encodeURIComponent(objects[el.target.id]['title'].toLowerCase()) + '&tbm=shop'
  $('#price').textContent = objects[el.target.id]['price']
    //   fill: blue;
    // fill-opacity: 0.3;
}

for (var i = 0; i < $$('#hover g path').length; i++) {
  $$('#hover g path')[i].addEventListener('click', updateDialog)
}

},{}]},{},[1]);
