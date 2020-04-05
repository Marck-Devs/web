var aboutText = {
    el :document.getElementById("about.text"),
    top: Math.round(document.getElementById("about").getBoundingClientRect().y) - 100
}
document.addEventListener("scroll", function(ev){
    var top = window.scrollY;
    console.log(top)
    if(top >= aboutText.top){
        aboutText.el.style.animationName = "AboutFadeIn"
    } else if(aboutText.el.style.animationName == "AboutFadeIn"){
        aboutText.el.style.animationName = "AboutFadeOut"
    }
})