h = window.innerHeight
w = window.innerWidth
color = document.querySelector('.color')
color.style.height = ''+h -300+'px'
copier = document.querySelector('.text')
r = document.querySelector('.r .text')
msg = document.querySelector('.msg')
g = document.querySelector('.g .text')
b = document.querySelector('.b .text')
x = 0
y = 0
z = 0
color1 = ''
i = 0
n = 0
copier = document.querySelector('.barre-copi')
message = ['tres bon choix cette couleur apporte la joie','pas mal cette couleur','cette couleur iras bien dans votre site','belle initiatise','aimais vous vraiment cette couleur ?','...']
color.onclick = function(){
    i++
    x = Math.round(Math.random()*254)
    y = Math.round(Math.random()*254)
    z = Math.round(Math.random()*254)
    color1 = 'rgb('+x+','+y+','+z+')'
    color.style.backgroundColor = color1
    r.value = x
    g.value = y
    b.value = z
    // copier.innerHTML = color1
    copier.style.display = 'block'
}
color.onmousedown = () => {
    color.style.width = '100%'
}
color.onmouseup = () => {
    color.style.width = '100%'
}
r.onkeyup = () =>{
    x = r.value
    i++
    color1 = 'rgb('+x+','+y+','+z+')'
    color.style.backgroundColor = color1
    console.log(i)
}
g.onkeyup = () =>{
    y = g.value
    color1 = 'rgb('+x+','+y+','+z+')'
    color.style.backgroundColor = color1
    console.log(color1)
}
b.onkeyup = () =>{
    z = b.value
    color1 = 'rgb('+x+','+y+','+z+')'
    color.style.backgroundColor = color1
    console.log(color1)
}
pop = document.querySelector('.ppoopp')
pop.style.left = ''+w-320+'px'
pop.style.top = ''+h-390+'px'
setInterval(() => {
    h = window.innerHeight
    w = window.innerWidth
    pop.style.left = ''+w-320+'px'
    pop.style.top = ''+h-390+'px'
    // console.log(pop.style.left)
}, 1000);
rgb = document.querySelector('.rgb')
popColor = document.querySelector('.pop-color')
window.onclick = () => {
    if (i % 5 == 0){
        pop.style.display = 'block'
        n = Math.round(Math.random()*5)
        popColor.style.backgroundColor = color1
        rgb.innerHTML = color1
        rgb.style.color = color1
        msg.innerHTML = message[n]
        i++
    }
}
pos = document.querySelector('.pos')
pos.onclick = () =>{
    pop.style.display = 'none'
}
copier.onclick = () => {
    pop.style.display = 'block'
    n = Math.round(Math.random()*5)
    popColor.style.backgroundColor = color1
    rgb.innerHTML = color1
    rgb.style.color = color1
    msg.innerHTML = message[n]
    i++

}
