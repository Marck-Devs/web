var maxHeight =  document.querySelector(".main-padding").scrollHeight - window.innerHeight;
var header = document.getElementById("main.header");
var line = document.querySelector("#h_main");
var title = document.getElementById("main.title");
var subtitle = document.getElementById("main.subtitle");
document.addEventListener("scroll", function(ev){
    var top = window.scrollY;
    // al 25% la linea se esconde
    var lnMax = maxHeight * 0.01;
    var diff = (top >= lnMax) ? 0 : maxHeight - top;
    var width = Math.round(diff / maxHeight);
    line.style.animationDelay = "1s";
    line.style.animationName = (!width) ? "leftROut" : "leftR";
    var titles = maxHeight * 0.7;
    diff = (top >= titles) ? 0 : maxHeight - top;
    width = Math.round(diff / maxHeight);
    title.style.animationName = (!width) ? "easeOutTop" : "easeInTop";
    subtitle.style.animationName = (!width) ? "easeOutBot" : "easeInBot";
    console.log(width)
});