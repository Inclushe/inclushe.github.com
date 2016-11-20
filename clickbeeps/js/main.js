function id(name){
  return document.getElementById(name);
}
function rand(min,max,round) {
  if (round === true) {
    return Math.round((Math.random() * (max-min)) + min);
  }
  else {
    return (Math.random() * (max-min)) + min;
  }
}
function cl(text){
  console.log(text);
}
var scrolled = 0;
var firstpopup = id("firstpopup");
function showFirstPopup(){
  if (scrolled === 0){
    firstpopup.setAttribute("class","first-popup");
    document.body.setAttribute("class","no-scroll");
    window.removeEventListener("scroll",showFirstPopup,false);
    scrolled = 1;
  }
};
window.addEventListener("scroll",showFirstPopup,false);
function closeFirstPopup(){
  firstpopup.setAttribute("class","first-popup hidden");
  document.body.removeAttribute("class");
  id("firstpopupcross").removeEventListener("click",closeFirstPopup,false);

}
id("firstpopupcross").addEventListener("click",closeFirstPopup,false);

function sendEmail(){
  var email = id("firstpuEmail");
  if (email.value.indexOf("@") >= 0 && email.value.indexOf(".") >= 0){
    email.value = "Sign up successful!"
    email.disabled = true;
    email.removeAttribute("style");
    id("firstpuButton").disabled = true;
    id("firstpuButton").removeAttribute("style");
    id("firstpuButton").removeEventListener("click",sendEmail,false);
    setTimeout(function(){closeFirstPopup();},1000);
  }
  else {
    email.style.backgroundColor = "#633";
    id("firstpuButton").style.backgroundColor = "#633";
  }
}
id("firstpuButton").addEventListener("click",sendEmail,false);
id("firstpuEmail").addEventListener("keypress",function(){
  if (event.keyCode == 13){
    sendEmail();
  }
},false);

var secondpuShown = 0;
id("secondpuYes").addEventListener("click",function(){
  id("secondpuYes").setAttribute("class","hidden");
  id("secondpuNo").setAttribute("class","hidden");
  id("secondpuFeedback").innerHTML = "Thanks for your feedback.";
},false);
id("secondpuNo").addEventListener("click",function(){
  id("secondpuYes").setAttribute("class","hidden");
  id("secondpuNo").setAttribute("class","hidden");
  id("secondpuFeedback").innerHTML = "Woooooow.<br>Fuck you too.<br>Do you know who wrote this article?<br><i><b>FUCKING. BOBBY. FINGER.</b></i>";
},false);
id("secondpuCross").addEventListener("click",function(){
  id("secondpu").setAttribute("class","second-popup hidden");
},false);

var header = id("header");
function pos(){
  try {
    var articlefold = id("article-fold").getBoundingClientRect().top;
    if (articlefold <= 100) {
      if (header.getAttribute("class") == "header") {
        header.setAttribute("class","header dark");
        document.getElementsByClassName("socal-sidebar")[0].style.opacity = "1";
        document.getElementsByClassName("socal-sidebar")[1].style.opacity = "1";
      }
    }
    else if (header.getAttribute("class") == "header dark") {
      header.setAttribute("class","header");
      document.getElementsByClassName("socal-sidebar")[0].style.opacity = "0";
      document.getElementsByClassName("socal-sidebar")[1].style.opacity = "0";
    }
    var secondpuTrigger = id("secondpuTrigger").getBoundingClientRect().top;
    if (secondpuTrigger <= 0 && secondpuShown === 0) {
      id("secondpu").removeAttribute("style");
      id("secondpu").setAttribute("class","second-popup");
      secondpuShown = 1;
    }
  }
  catch (err){
  }
  if (id("triggered")){
    if (id("triggered").getBoundingClientRect().top <= 500){
      console.log("%c", "background-color: #d78; padding: 200px; padding-left: 2000px; margin: -50px;");
      console.log("%c☻ YOU S̨̡̏̏ͭͭ̏͆̇͌̈́̅̾̚҉̺̪̙͓͔̣Ḥ̷͉̺͉͇̟͙̰̻͉̩͕́͆̿ͩͤ̾̈͐͛̀͊̑̀̍́ͅO̵͎̬̤̞̥̪̮̣̹̣̤̺͍̣̺̻̜̓̅ͦ̽ͬ̂͂̀̑̈̊̚͟͝͝͠ͅU̴̷̹̣̫̩͉̲͕̖̝̳̟͂̑̉͐̃͆ͩ͂͑ͫ̂̋ͧ͘L̴̷̮̭̖̤͚̹̭̂̌ͯ͆͑̈́ͫ̚̕D̀̓́ͯͯ̇̓̑ͮ̈̀͌͐͆̃ͫ͐ͫ͘͏̬̭̰̰̩͖͔̦̭̹̝̣̬̝͙̣̩̞͡N̰̦̯̯̦͎͓̙̻̻̬͚͔̥̫ͥͣ̃͑̀͢ͅ'̵̧̦̣̤͍̤͕̹̳͍̥̗͍͈͉̲̪̋̽͐̊ͣͬ̆̏͋͐̏͜͡T̒̔̉͆̉̾̃ͭ̿̏̋́̌ͭͥ̅ͭͨͨ͏̸̢̤̭͖̝̖͇̭̥̺ BE H"+ "%cE"+ "%cR"+ "%cE", "color: white;", "color: rgba(255,255,255,0.8);", "color: rgba(255,255,255,0.6);", "color: rgba(255,255,255,0.4);");
      document.getElementsByTagName("html")[0].innerHTML = '<!DOCTYPE html> <html> <head> <title>CATASTROPHIC ERROR</title> <style> body { height: 100%; width: 100%; background-image: url("err/error.png"); background-size: cover; background-attachment: fixed; background-position: center; image-rendering: pixelated; } </style> </head> <body></body> </html>';
    }
  }
}
window.addEventListener("scroll",pos,false);
window.addEventListener("resize",pos,false);
window.addEventListener("touchmove",pos,false);

var money = 0.00;
function getMoney(){
  id("stuff").innerHTML = '<audio autoplay><source src="images/chaching.mp3"></audio>';
  if (money == 0.00){
    document.body.innerHTML += "<div id='moneyBlock'><h2>BOBBY FINGER'S PIGGY BANK</h2><br><h1 id='moneyAmount'>$0.01</h1></div>"
    id("woah").addEventListener("click",getMoney,false);
  }
  money += rand(3,10,true)/100;
  money.toFixed(2);
  id("moneyAmount").innerHTML = "$" + money.toFixed(2);
}

id("nextPageButton").addEventListener("click",function(){
  this.parentElement.removeChild(this);
  id("nextPage").innerHTML = "<div class='spon-message'> <p> And now a word from our sponsers. <br> Please tap or click on every ad below to help support Clickbeeps. <br> <i class='arrow-down'></i> </p> </div> <div class='woah' id='woah'> </div> <div class='next-page-content'> <h2 id='triggered'><b>4. Eat only junk food!</b>&nbsp;Weight is just a number anyways...</h2> <img src='images/fatsandler.gif'/> </div>";
  window.scroll(0, id("nextPage").offsetTop);
  id("woah").addEventListener("click",getMoney,false);
},false);
/*setInterval(function(){
  document.body.innerHTML += "<div class='pops' style='top: 0; left: 0'></div>"
},2000);*/
