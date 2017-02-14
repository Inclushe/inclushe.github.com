var preview = document.getElementById("preview");
var request = new XMLHttpRequest();
var projects = document.querySelectorAll(".projects")[0];
var data;
request.open('GET', 'projects.json', true);

var addProjects = function(){
  for(var q = 0; q < data.project.length; q++){
    var linkElement = document.createElement("a");
    linkElement.setAttribute("class","link-block");
    linkElement.setAttribute("href",data.project[q].link);
    linkElement.setAttribute("target","_self");
    projects.appendChild(linkElement);
    var links = document.querySelectorAll(".link-block")[q];
    var div = document.createElement("div");
    var divTitle = document.createElement("h2");
    var divTitleText = document.createTextNode(data.project[q].title);
    divTitle.appendChild(divTitleText);
    var divDescript = document.createElement("h3");
    var divDescriptText = document.createTextNode(data.project[q].description);
    divDescript.appendChild(divDescriptText);
    div.setAttribute("class","item");
    div.setAttribute("data-color",data.project[q].color);
    div.setAttribute("data-url",data.project[q].image);
    //div.appendChild();
    links.appendChild(div);
    var item = document.querySelectorAll(".item");
    item[q].appendChild(divTitle);
    item[q].appendChild(divDescript);
  }
};

var doEverything = function(){
  var item = document.querySelectorAll(".item");
  var loadImages = function(){
  for(var a = 0; a < item.length; a++){
    var preloadImg = new Image();
    preloadImg.src = item[a].getAttribute("data-url");
  }
};
loadImages();

preview.setAttribute("style", "background-image: url('" + item[0].getAttribute("data-url") +"');");
item[0].setAttribute("style", "background-color: "+item[0].getAttribute("data-color")+"; color: white;");
var getColor = function(){
  preview.removeAttribute("style");
  for(var f = 0; f < item.length; f++){
    item[f].removeAttribute("style");
    item[f].className = "item";
    var imageURL = this.getAttribute("data-url");
    var colorData = this.getAttribute("data-color");
    preview.setAttribute("style", "background-image: url('" + imageURL +"');");
    this.setAttribute("style","background-color: "+colorData+";");
    this.className = "item hover";
  }
};
var removeColor = function(){
    //this.removeAttribute("style");
    //this.className = "item";
  };

  for(var z = 0; z < item.length; z++){
    if (item[z].addEventListener){
      item[z].addEventListener("mouseover",getColor,false);
      item[z].addEventListener("touchstart",getColor,false);
      item[z].addEventListener("mouseout",removeColor,false);
      item[z].addEventListener("touchend",removeColor,false);
    }
    else {
      item[z].attachEvent("onmouseover", getColor);
      item[z].attachEvent("onmouseout", removeColor);
    }
  }
};


request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    data = JSON.parse(request.responseText);
    addProjects();
    doEverything();
  } else {
    preview.innerHTML = "Could not retrieve projects.";
  }
};
request.onerror = function() {
  preview.innerHTML = "Could not retrieve projects.";
};
request.send();

var drop = document.getElementById("drop");
var selectMail = function(){
  var range;
    if(document.body.createTextRange){
      range = document.body.createTextRange();
      range.moveToElementText(text);
      range.select();
    }
      else if (window.getSelection){
      var selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(drop);
      selection.removeAllRanges();
      selection.addRange(range);
    }
};
var clicked = 0;

if (document.getElementById("email").addEventListener) {
  document.getElementById("email").addEventListener("click",function(){
    if (clicked === 0){
      clicked = 1;
      drop.innerHTML = "<a id='copy'>&#x0069;&#110;&#99;&#108;&#x0075;she&#x0040;&#103;&#109;ail&#46;com</a>";
      drop.setAttribute("style","height: 100px; line-height: 100px;");
      selectMail();
      drop.addEventListener("click",selectMail,false);
    }
    else {
      setTimeout(function(){drop.innerHTML = "";}, 300);
      drop.removeAttribute("style");
      drop.setAttribute("style","height: 0px; line-height: 0px;");
      clicked = 0;
    }
  }, false);
}
else {
  document.getElementById("email").attachEvent("onclick",function(){
    if (clicked === 0) {
      clicked = 1;
      drop.innerHTML = "<a id='copy'>&#x0069;&#110;&#99;&#108;&#x0075;she&#x0040;&#103;&#109;ail&#46;com</a>";
      drop.setAttribute("style","height: 100px; line-height: 100px;");
      selectMail();
      drop.attachEvent("onclick",copyMail);
    }
    else {
      setTimeout(function(){drop.innerHTML = "";}, 300);
      drop.removeAttribute("style");
      drop.setAttribute("style","height: 0px; line-height: 0px;");
      clicked = 0;
    }
  });
}

var placeholder = document.getElementById("placeholder");
var previewOnTop = function(){
  var value = placeholder.getBoundingClientRect().top;
  //console.log(value);
  if(value <= 0){
    preview.setAttribute("class","fixed");
    projects.setAttribute("class","block projects active");
  }
  if(value > 0) {
    preview.removeAttribute("class");
    projects.setAttribute("class","block projects");
  }
};


if (window.addEventListener){
  window.addEventListener("scroll",previewOnTop,false);
  window.addEventListener("resize",previewOnTop,false);
  window.addEventListener("touchmove",previewOnTop,false);
}
else {
  //window.onscroll = previewOnTop();
  //window.resize = previewOnTop();
}
