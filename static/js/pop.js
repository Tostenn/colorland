// import {  } from "./fonction.js";
import { Color } from "./color.js";

/**
 * lorsqu'on click sur copy on affiche une pop  ok
 * il faut récuperer le nombre de pop           ok
 * formater les color                           ok
 * fermer la pop                                ok
 * reduis les ancienne pop                      ok
 * nombre de pop visible esr de 3               ok
 */
export class Popup{
    /**
     * ggestion des popup
     * @param {HTMLElement} parent 
     * @param {HTMLElement} copyButton 
     * @param {Color} color 
     */
    #SECOND = "second"
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {HTMLButtonElement} copyButton 
     * @param {Color} color 
     */
    constructor(parent,copyButton,color){
        this.parent = parent
        this.copyButton = copyButton
        this.color = color
        this.limit = 3
        this.lastpop = ''
        this.curernt = ''

        // on récupére le templates
        this.template = this.parent.previousElementSibling
        
        // click sur le boutoon copier
        this.copyButton.onclick = () => this.newpop()
        
    }
    /**
     * creer une nouvelle popup
     * @param {Array} color [r, g, b, op]
     */
    newpop(color = false){
        this.autodelete()
        // cloner le template
        const container =  document.createElement('div')
        container.append(this.template.content.cloneNode(true))

        // mise a jour de la color
        this.updateColor(container.querySelector('.pop-color'),color)
        
        // inseret le valeur
        this.writevalue(container,color)

        // fermer la popup
        this.closePop(container)

        // developper la popup
        this.devloPOP(container)

        // copier la couleur
        this.copyColor(container)
        
        // inseret l'élément
        try {
            this.parent.firstElementChild.firstElementChild.classList.add('second')
            this.reduit()
        } catch (error) {}
        this.parent.insertBefore(container,this.parent.firstElementChild)

        this.lastpop = this.parent.lastElementChild
        
        this.curernt = container
    }
    autodelete(){
        if (this.limit == this.parent.childElementCount) this.lastpop.remove()
    }
    /**
     * mise en forme des valeur de la couleur 
     * @param {HTMLElement} container 
     * @param {Array} rgbx [r, g, b, op]
    */
    writevalue(container,rgbx = false){
        rgbx = rgbx ? rgbx : this.color.rgb
        let i = 0
        const rgbContent = Array.from(container.querySelectorAll('.rgb-content span'))
        for (const key in rgbx) {
            const el = rgbContent.filter(
                el => el.getAttribute('class').includes(key)
            )
            if (el.length){
                el[0].innerHTML = rgbx[key]
                key == 'op' ? el[0].style.opacity = rgbx[key] : null
            }
            else if (rgbx){
                if (i == rgbContent.length - 1){
                    const op = this.color.parseop(rgbx[key].toFixed())
                    rgbContent[i].innerHTML = op
                    rgbContent[i].style.opacity = op
                }
                else rgbContent[i].innerHTML = rgbx[key]
                i++
            }
        }
        container.querySelector('.rgb-complet').innerHTML = this.color.formateRGB(rgbx)
    }
    /**
     * fermeture de la popup
     * @param {HTMLElement} container 
     */
    closePop(container){
        const fermer = container.querySelector('#fermer-pop')
        fermer.onclick = ()=>{
            container.style.transition = 'all linear .5s'
            container.style.transform = 'translate(100%)'
            container.style.opacity = '0'

            setTimeout(() =>{
                container.remove()
                // affiche completement la prevedente pop
                try {
                    this.reduit()
                    this.parent.querySelector('.pop').classList.remove(this.#SECOND)
                } catch (error) {}
            }, 600);
        }
    }
    /**
     * developper la pop
     * @param {HTMLElement} container 
     */
    devloPOP(container){
        const devpop = container.querySelector("#devpop")
        devpop.onclick = ()=>{
            this.reduit()
            devpop.parentElement.classList.remove(this.#SECOND)
            this.curernt = devpop.parentElement.parentElement
        }
    }
    /**
     * reduit la popup active
     */
    reduit(){
        this.curernt.firstElementChild.classList.add(this.#SECOND)
    }
    /**
     * mise a jour de la color popup
     * @param {HTMLElement} viewColor 
     * @param {Array} color [r, g, b, op]
     */
    updateColor(viewColor,color=false){
        viewColor.style.backgroundColor = this.color.formateRGB(color)
    }
    /**
     * copier de la popup
     * @param {HTMLElement} container 
     */
    copyColor(container){
        const copi = container.querySelector('.icon')
        copi.onclick = ()=>{
            const colorRgb = container.querySelector('.rgb-complet').innerHTML
            navigator.clipboard.writeText(colorRgb)
            const copieSucces = container.querySelector('.copier-succes')
            copieSucces.style.animationName = 'copier-s'
            copi.style.backgroundColor = colorRgb
        }
    }
}