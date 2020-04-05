// Archivo js 
var servR = document.getElementById("services_hr");
var servT = document.getElementById("services").scrollHeight + (window.innerHeight * 0.60);
console.log(down)
document.addEventListener("scroll", function(ev){
    var top = window.scrollY;
    if(top >= servT){
        servR.style.animationName = "Services_r";
    }else if(top < (servT + 20) && servR.style.animationName == "Services_r"){
        servR.style.animationName = "Services_r_out";
    }
})