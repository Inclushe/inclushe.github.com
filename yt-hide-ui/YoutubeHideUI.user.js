// ==UserScript==
// @name         Hide Youtube UI
// @namespace    http://youtube.com/*
// @version      1
// @description  Hides Youtube UI on the new HTML5 player
// @author       Inclushe
// @match        http://tampermonkey.net/index.php?version=3.11&ext=dhdg&updated=true&old=3.10.109&intr=true
// @include      https://www.youtube.com/watch?v=*
// @exclude      https://www.youtube.com/embed/*
// @grant        none
// ==/UserScript==

var hideStatus = 0;
var ytElements = ["ytp-gradient-bottom", "ytp-chrome-bottom", "ytp-firefox-bottom", "ytp-button", "ytp-cards-button", "video-annotations", "ytp-spinner", "video-ads", "ad-container", "annotation"];
var properties = ["initial", "hidden"];

window.toggleUI = function(){
  console.log();
  if(hideStatus === 1){
      hideStatus = 0;
      }
  else
  {
      hideStatus = 1;   
  }
  hide(hideStatus);
};

window.hide = function(status){
    for (var i=0;i<(ytElements.length);i++)
  {
    if (document.getElementsByClassName(ytElements[i])[0] != null){
      for (var x=0;x<(document.getElementsByClassName(ytElements[i]).length);x++)
      document.getElementsByClassName(ytElements[i])[x].style.visibility = properties[status];
    }
    
  }
};

var addButton = function(){
    document.getElementById("watch8-secondary-actions").innerHTML += "<div class='yt-uix-menu' id='hideUI' style='visibility'><button class='yt-uix-button' style='border: none; color: #808080'><span class='yt-uix-button-content' id='hideUItext'>Hide UI</span></button></div>";
    document.getElementById("hideUI").addEventListener("click", toggleUI);
};

setInterval(function(){
    var button = document.getElementById("hideUI");
    var bar = document.getElementById("watch8-secondary-actions");
    if (bar != null) {
        if (button === null)
        {
            addButton();
            if (hideStatus === 1)
            {
                toggleUI();
            }
        }
            }
},100);