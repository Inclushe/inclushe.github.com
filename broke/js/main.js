function id(name){
  return document.getElementById(name);
}
function rand(min,max,round){
  // works the same as PHP's rand() function with optional rounding
  if (round === true) {
    return Math.round((Math.random() * (max-min)) + min);
  }
  else {
    return (Math.random() * (max-min)) + min;
  }
}
function inRange(min,max,value){
  if ((min <= value) && (value <= max)){
    return true;
  }
  else {
    return false;
  }
}
// all characters in this DOS font
var characters = ["#", "$", "%", "&", "\'", "\(", "\)", "*", "+", "\,", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", "\;", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "\\", "]", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~", " ", "¡", "¢", "£", "¥", "ª", "«", "¬", "°", "±", "²", "µ", "·", "º", "»", "¼", "½", "¿", "Ä", "Å", "Æ", "Ç", "É", "Ñ", "Ö", "Ü", "ß", "à", "á", "â", "ä", "å", "æ", "ç", "è", "é", "ê", "ë", "ì", "í", "î", "ï", "ñ", "ò", "ó", "ô", "ö", "÷", "ù", "ú", "û", "ü", "ÿ", "ƒ", "Γ", "Θ", "Σ", "Φ", "Ω", "α", "δ", "ε", "π", "σ", "τ", "φ", "ⁿ", "₧", "∙", "√", "∞", "∩", "≈", "≡", "≤", "≥", "⌐", "⌠", "⌡", "─", "│", "┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼", "═", "║", "╒", "╓", "╔", "╕", "╖", "╗", "╘", "╙", "╚", "╛", "╜", "╝", "╞", "╟", "╠", "╡", "╢", "╣", "╤", "╥", "╦", "╧", "╨", "╩", "╪", "╫", "╬", "▀", "▄", "█", "▌", "▐", "░", "▒", "▓", "■"];
// all colors used in DOS text mode
var colors = ["0, 0, 0", "0, 0, 128", "0, 128, 0", "0, 128, 128", "128, 0, 0", "128, 0, 128", "128, 128, 0", "192, 192, 192", "128, 128, 128", "0, 0, 255", "0, 255, 0", "0, 255, 255", "255, 0, 0", "255, 0, 255", "255, 255, 0", "255, 255, 255"];

var wandowsActive = false;
var wandowsCurrentLine = null;
var wandowsPreviousLine = null;
var wandowsLines = ["We apolggize for the inconveniefce, but Windows did not start successfudly.  A",
"recent `ardware or software chafge eight have caused thas.",
"",
"If qour computer stgpped responding$ restarted unexpectedly$ or was",
"autgmatacaldy s`ut down to protect qour files afd fglders, choose Last Cnowf",
"Good Coffigurataon to revert to the most recent settings that wgrked.",
"",
"If a previous startup attempt was ifterrupted due tg a power faalure or because",
"the Power or Reset buttgn was pressed, gr if you aren't sure what caused the",
"problem$ chgose Start Wandows Ngrmadly.",
"",
"    Safe Mode",
"    Safe Mode wath Fetwgrkifg",
"    Safe Mode wath Command Prompt",
"",
"    Last Kngwn Good Configuratign (qour most recent settings that wgrked)",
"",
"    Start Wandows Ngrmadly",
"",
"Use the up and down arrgw keys to mgve the `ighdight to your chgice&"];
var wandowsActiveLines = [11, 12, 13, 15, 17];

var c = id("c"), ctx = c.getContext("2d", {alpha: false});
var ratio = 1;
var blinkRate = 550;
var optionsVisible = false;
var toggleEnabled = true;
c.height = Math.floor(document.body.clientHeight / ratio);
c.width = Math.floor(document.body.clientWidth / ratio);
ctx.font = '16px "Dos"'
ctx.textBaseline = "top";
var blinkers = [];
var blinking = true;
var currentlyBlinking = true;
var toggleEnabledInterval = null;
var blinkingInterval = null;
var hideOptionToggleTimeout = null;
var pixelated = false;
var touch = false;
var extraClasses = "";
var resolutionForm = id("resolution").getElementsByTagName("input");
var screenForm = id("screen").getElementsByTagName("input");
var otherForm = id("otherOptions").getElementsByTagName("input");

// loading
ctx.fillStyle = "black";
ctx.fillRect(0,0,c.width,c.height);
var loadingBlinking = false;
function loadingAnimation(){
  if (loadingBlinking){
    ctx.fillStyle = "black";
    ctx.fillRect(0,14,9,2);
    loadingBlinking = false;
  }
  else {
    ctx.fillStyle = "white";
    ctx.fillRect(0,14,9,2);
    loadingBlinking = true;
  }
};
loadingBlinkingInterval = window.setInterval(loadingAnimation, 100);

function enableTouch(){
  touch = true;
  window.removeEventListener("toggleEnabledInterval");
}

function drawNew() {
  wandowsActive = false;
  if (touch){
    id("wandowsMobile").setAttribute("class", "wandows-mobile-icons hidden");
  }
  ctx.font = '16px "Dos"'
  ctx.textBaseline = "top";
  blinkers = [];
  for (var y = 0; (y * 16) < c.height; y++){
    for (var x = 0; (x * 9) < c.width; x++){
      var char = characters[rand(0,characters.length - 1,true)];
      var bgColor = colors[rand(0,colors.length - 1,true)];
      var color = colors[rand(0,colors.length - 1,true)];
      ctx.fillStyle = "rgb(" + bgColor + ")";
      ctx.fillRect(x * 9,y * 16,9,16);
      if (rand(0,1,true) === 0){
        blinkers.push({ x: x, y: y, char: char, bgColor: bgColor, color: color});
      }
      else {
        ctx.fillStyle = "rgb(" + color + ")";
        ctx.fillText(char, (x * 9),(y * 16));
      }
    }
  }

}

function blink(){
  ctx.font = '16px "Dos"'
  ctx.textBaseline = "top";
  if (blinking == true){
      for (var a = 0; a < blinkers.length; a++){
        var currentBlinker = blinkers[a];
        ctx.fillStyle = "rgb(" + currentBlinker.bgColor + ")";
        ctx.fillRect(currentBlinker.x * 9,currentBlinker.y * 16,9,16);
        ctx.fillStyle = "rgb(" + currentBlinker.color + ")";
        ctx.fillText(currentBlinker.char, (currentBlinker.x * 9),(currentBlinker.y * 16));
      }
      blinking = false;
    }
    else {
      for (var a = 0; a < blinkers.length; a++){
        var currentBlinker = blinkers[a];
        ctx.fillStyle = "rgb(" + currentBlinker.bgColor + ")";
        ctx.fillRect(currentBlinker.x * 9,currentBlinker.y * 16,9,16);
      }
      blinking = true;
    }
}
function startBlinking(){
  // COMMENCE THE BLINKING
  currentlyBlinking = true;
  blinkingInterval = window.setInterval(blink, blinkRate);
}
function stopBlinking(){
  // WHY WOULD YOU STOP THE BLINKING
  currentlyBlinking = false;
  window.clearInterval(blinkingInterval);
}
function redrawOnResize(){
  c.height = document.body.clientHeight / ratio;
  c.width = document.body.clientWidth / ratio;
  window.clearInterval(blinkingInterval);
  startBlinking();
  drawNew();
}
function resolution(){
  if (currentlyBlinking == false){
    startBlinking();
  }
  console.log("name: " + this.name + " | value = " + this.value);
  var values = id("resolution").querySelectorAll("input[type=number]");
  if (this.name == "resolution"){
    if (this.value == "vga"){
      window.removeEventListener("resize", redrawOnResize, false);
      c.height = 480 / ratio;
      c.width = 639 / ratio;
      drawNew();
    }
    else if (this.value == "svga"){
      window.removeEventListener("resize", redrawOnResize, false);
      c.height = 600 / ratio;
      c.width = 800 / ratio;
      drawNew();
    }
    else if (this.value == "screen"){
      window.addEventListener("resize", redrawOnResize, false);
      c.height = Math.floor(document.body.clientHeight / ratio);
      c.width = Math.floor(document.body.clientWidth / ratio);
      drawNew();
    }
    else if (this.value == "custom"){
      window.removeEventListener("resize", redrawOnResize, false);
      if (inRange(1,4028,values[1].value)){
        values[1].removeAttribute("style");
        c.height = Math.floor(values[1].value / ratio);
      }
      else {
        values[1].setAttribute("style","background-color: #f33");
      }
      if (inRange(1,4028,values[0].value)){
        values[0].removeAttribute("style");
        c.width = Math.floor(values[0].value / ratio);
      }
      else {
        values[0].setAttribute("style","background-color: #f33");
      }
      drawNew();
    }
  }
  else if ((this.name == "width") || (this.name == "height")){
    if (this.name == "width"){
      if (inRange(8,4028,this.value)){
        this.removeAttribute("style");
        if (resolutionForm[3].checked){
          c.width = this.value / ratio;
          drawNew();
        }
      }
      else {
        this.setAttribute("style","background-color: #f33");
      }
    }
    else if (this.name == "height"){
      if (inRange(8,4028,this.value)){
        this.removeAttribute("style");
        if (resolutionForm[3].checked){
          c.height = this.value / ratio;
          drawNew();
        }
      }
      else {
        this.setAttribute("style","background-color: #f33");
      }
    }
  }
  else if (this.name == "ratio"){
    console.log("fire1");
    if (inRange(1,8,this.value)){
      console.log("fire2");
      this.removeAttribute("style");
      ratio = this.value;
      if (resolutionForm[0].checked){
        c.height = Math.floor(480 / ratio);
        c.width = Math.floor(639 / ratio);
      }
      else if (resolutionForm[1].checked){
        c.height = Math.floor(600 / ratio);
        c.width = Math.floor(800 / ratio);
      }
      else if (resolutionForm[2].checked){
        c.height = Math.floor(document.body.clientHeight / ratio);
        c.width = Math.floor(document.body.clientWidth / ratio);
      }
      else if (resolutionForm[3].checked){
        c.height = Math.floor(values[1].value / ratio);
        c.width = Math.floor(values[0].value / ratio);
      }
      else {
        console.warn("This shouldn't appear in the console, but it did.");
      }
      console.log(c.height + " | " + c.width);
      drawNew();
    }
    else {
      this.setAttribute("style","background-color: #f33");
    }
  }
  else {
    console.warn("This shouldn't appear in the console, but it did.");
  }
}
function screen(){
  console.log("name: " + this.name + " | value = " + this.value);
  if (this.name == "screen"){
    if (this.value == "stretch"){
      id("c").removeAttribute("style");
      id("c").className = "stretched" + extraClasses;
    }
    else if (this.value == "fit"){
      id("c").removeAttribute("style");
      id("c").className = "fit" + extraClasses;
      id("c").setAttribute("style","height: 100%");
      if (c.offsetWidth >= document.body.clientWidth){
        id("c").setAttribute("style","width: 100%");
      }
    }
    else if (this.value == "center"){
      id("c").removeAttribute("style");
      id("c").className = "center" + extraClasses;
    }
    else {
      console.warn("This shouldn't appear in the console, but it did.");
    }
  }
  else if (this.name == "resizing"){
    if (this.value == "blurry"){
      pixelated = false;
      id("c").className = id("c").className.replace(" pixelated","");
      extraClasses = "";
    }
    else if (this.value == "sharp"){
      pixelated = true;
      extraClasses = " pixelated"
      id("c").className += " pixelated";
    }
    else {
      console.warn("This shouldn't appear in the console, but it did.");
    }
  }
  else if (this.name == "blinkingrate"){
    blinkRate = this.value;
    window.clearInterval(blinkingInterval);
    startBlinking();
  }
  else {
    console.warn("This shouldn't appear in the console, but it did.");
  }
}
function other(){
  if (this.name == "options"){
    if (this.value == "hideOptions"){
      if (this.checked){
        toggleEnabled = false;
      }
      else {
        toggleEnabled = true;
      }
    }
    else if (this.value == "hideMouse"){
      if (this.checked){
        document.body.setAttribute("style", "cursor: none");
      }
      else {
        document.body.removeAttribute("style");
      }
    }
    else if (this.value == "fullscreen"){
      if (this.checked){
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement){
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
          else if (document.documentElement.msRequestFullscreen){
            document.documentElement.msRequestFullscreen();
          }
          else if (document.documentElement.mozRequestFullScreen){
            document.documentElement.mozRequestFullScreen();
          }
          else if (document.documentElement.webkitRequestFullscreen){
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        }
      }
      else {
        if (document.exitFullscreen){
          document.exitFullscreen();
        }
        else if (document.msExitFullscreen){
          document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen){
          document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen){
          document.webkitExitFullscreen();
        }
      }
    }
  }
}
function hideOptionToggle(){
  if (optionsVisible && toggleEnabled){
    // do nothing
  }
  else {
    id("optionsToggle").style.opacity = "0";
  }
}
function showSettingsToggle(){
  if (optionsVisible && toggleEnabled){
    clearTimeout(hideOptionToggleTimeout);
  }
  else if (id("optionsToggle").style.opacity == "1"){
    // do nothing
  }
  else if (toggleEnabled) {
    id("optionsToggle").style.opacity = "1";
    hideOptionToggleTimeout = setTimeout(hideOptionToggle,2500);
  }
}
function toggleOptions(){
  if (optionsVisible){
    id("options").className = "options hidden";
    id("optionsToggle").removeAttribute("style");
    id("optionsToggle").innerHTML = "OPTIONS";
    optionsVisible = false;
  }
  else {
    id("options").className = "options";
    id("optionsToggle").style.opacity = "1";
    id("optionsToggle").style.backgroundColor = "transparent";
    id("optionsToggle").innerHTML = "HIDE";
    optionsVisible = true;
  }
}
function moveWandows(key){
  if (wandowsActive){
    if (key.keyCode == 38 || key == "up"){
      wandowsPreviousLine = wandowsCurrentLine;
      wandowsCurrentLine--;
      if (wandowsCurrentLine == -1){
        wandowsCurrentLine = 4;
      }
    }
    else if (key.keyCode == 40 || key == "down"){
      wandowsPreviousLine = wandowsCurrentLine;
      wandowsCurrentLine++;
      if (wandowsCurrentLine == 5){
        wandowsCurrentLine = 0;
      }
    }
    else if (key.keyCode == 13 || key == "enter"){
      console.log(wandowsCurrentLine);
      ctx.fillStyle = "black";
      ctx.fillRect(0, wandowsActiveLines[wandowsCurrentLine] * 16,c.width,16);
      switch (wandowsCurrentLine){
        case 0:
          var text = "    wrong answer, man"
          wandowsLines[wandowsActiveLines[wandowsCurrentLine]] = text;
          for (var letter = 0; letter < text.length; letter++){
            ctx.fillStyle = "white";
            ctx.fillRect(letter * 9, wandowsActiveLines[wandowsCurrentLine] * 16,9,16);
            ctx.fillStyle = "black";
            ctx.fillText(text.charAt(letter), (letter * 9),(wandowsActiveLines[wandowsCurrentLine] * 16));
          }
          break;
        case 1:
          ctx.fillStyle = "black";
          ctx.fillRect(0,0,c.width,c.height);
          location.href = "https://www.youtube.com/embed/W9DST-6jIBU?autoplay=1&iv_load_policy=3&modestbranding";
          drawNew();
          startBlinking();
          break;
        case 2:
          ctx.fillStyle = "black";
          ctx.fillRect(0,0,c.width,c.height);
          location.href = "https://www.youtube.com/embed/0hxFyDpfcg0?autoplay=1&iv_load_policy=3&modestbranding";
          drawNew();
          startBlinking();
          break;
        case 3:
          var text = "    there was no good configuratign lol"
          wandowsLines[wandowsActiveLines[wandowsCurrentLine]] = text;
          for (var letter = 0; letter < text.length; letter++){
            ctx.fillStyle = "white";
            ctx.fillRect(letter * 9, wandowsActiveLines[wandowsCurrentLine] * 16,9,16);
            ctx.fillStyle = "black";
            ctx.fillText(text.charAt(letter), (letter * 9),(wandowsActiveLines[wandowsCurrentLine] * 16));
          }
          break;
        case 4:
          ctx.fillStyle = "black";
          ctx.fillRect(0,0,c.width,c.height);
          setTimeout(function(){
            drawNew();
            startBlinking();
          },rand(500,1000,true));
          break;
      }
    }
    if (wandowsPreviousLine != null) {
      var previousLine = wandowsLines[wandowsActiveLines[wandowsPreviousLine]];
      var previousLinePos = wandowsActiveLines[wandowsPreviousLine];
      var currentLine = wandowsLines[wandowsActiveLines[wandowsCurrentLine]];
      var currentLinePos = wandowsActiveLines[wandowsCurrentLine];
      for (var letter = 0; letter < previousLine.length; letter++){
        ctx.fillStyle = "black";
        ctx.fillRect((letter * 9), previousLinePos * 16,9,16);
        ctx.fillStyle = "white";
        ctx.fillText(previousLine.charAt(letter), (letter * 9),(previousLinePos * 16));
      }
      for (var letter = 0; letter < currentLine.length; letter++){
        ctx.fillStyle = "white";
        ctx.fillRect(letter * 9, currentLinePos * 16,9,16);
        ctx.fillStyle = "black";
        ctx.fillText(currentLine.charAt(letter), (letter * 9),(currentLinePos * 16));
      }
    }
    wandowsPreviousLine = null;
  }
}
var mobileListeners = false;
function runWandows(){
  window.removeEventListener("resize", redrawOnResize, false);
  blinkers = [];
  wandowsActive = true;
  wandowsCurrentLine = 4;
  c.height = 440;
  c.width = 768;
  ctx.font = '16px "Dos"'
  ctx.textBaseline = "top";
  for (var line = 0; line < wandowsLines.length; line++){
    for (var letter = 0; letter < wandowsLines[line].length; letter++){
      if (line == 17){
        ctx.fillStyle = "white";
        ctx.fillRect(letter * 9,line * 16,9,16);
        ctx.fillStyle = "black";
        ctx.fillText(wandowsLines[line].charAt(letter), (letter * 9),(line * 16));
      }
      else {
        wandowsLines[line].charAt(letter);
        ctx.fillStyle = "white";
        ctx.fillText(wandowsLines[line].charAt(letter), (letter * 9),(line * 16));
      }
    }
  }
  window.addEventListener("keydown", moveWandows, false);
  if (touch){
    id("wandowsMobile").setAttribute("class", "wandows-mobile-icons");
    if (mobileListeners == false){
      id("mobileUp").addEventListener("touchstart", function(){moveWandows("up")}, false);
      id("mobileDown").addEventListener("touchstart", function(){moveWandows("down")}, false);
      id("mobileEnter").addEventListener("touchstart", function(){moveWandows("enter")}, false);
      mobileListeners = true;
    }
  }
}

// run when dos font is loaded
WebFontConfig = {
  custom: { families: ['Dos'],
            urls: [ 'fonts/dos.css']},
  active: function() {
    window.clearInterval(loadingBlinkingInterval);
    drawNew();
    startBlinking();
    window.addEventListener("resize", redrawOnResize, false);
    for (var option = 0; option < resolutionForm.length; option++){
      resolutionForm[option].addEventListener("change", resolution, false);
      resolutionForm[option].addEventListener("keyup", resolution, false);
    }
    for (var option = 0; option < screenForm.length; option++){
      screenForm[option].addEventListener("change", screen, false);
    }
    for (var option = 0; option < otherForm.length; option++){
      otherForm[option].addEventListener("change", other, false);
    }
    window.addEventListener("resize", function(){
      if (c.className.indexOf("fit") != -1){
        if (c.offsetHeight >= document.body.clientHeight){
          id("c").setAttribute("style","height: 100%");
        }
        if (c.offsetWidth >= document.body.clientWidth){
          id("c").setAttribute("style","width: 100%");
        }
      }
    }, false);
    window.addEventListener("mousemove", showSettingsToggle, false);
    toggleEnabledInterval = window.addEventListener("touchstart", enableTouch, false);
    id("optionsToggle").addEventListener("click",toggleOptions,false);
    id("wandows").addEventListener("click",function(){
      toggleOptions();
      stopBlinking();
      ctx.fillStyle = "black";
      ctx.fillRect(0,0,c.width,c.height);
      setTimeout(runWandows,rand(300,600,true));
    },false);
  }
};
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'false';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();
