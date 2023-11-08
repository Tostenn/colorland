import {  } from "./fonction.js";
import { Color } from "./color.js";



/**
 * lorsqu'on click sur copy on affiche une pop
 * il faut récuperer le nombre de pop
 * formater les color
 * fermer la pop
 * reduis les ancienne pop
 * nombre de pop visible esr de 3
 */
export class Popup{
    /**
     * ggestion des popup
     * @param {HTMLElement} parent 
     * @param {HTMLElement} copyButton 
     * @param {Color} color 
     */
    constructor(parent,copyButton,color){
        this.parent = parent
        this.copyButton = copyButton
        this.color = color

        // on récupére le templates
        this.template = this.parent.querySelector('template')
        console.log(this.color.rgb);
        this.newpop()
    }

    newpop(){
        // cloner le template
        const container = this.template.content.cloneNode(true)

        // inseret le valeur
        const rgbContent = container.querySelectorAll('.rgb-content span')
        this.writevalue(rgbContent)
        // inseret l'élément
        this.parent.insertBefore(container,this.parent.firstElementChild)
    }
    /**
     * 
     * @param {Array} rgbContent 
    */
   writevalue(rgbContent){
    let i = 0
    rgbContent = Array.from(rgbContent)
    for (const key in this.color.rgb) {
        const el = rgbContent.filter(
            el => el.getAttribute('class').includes(key)
        )
        if (el.length){
            el[0].innerHTML = this.color.rgb[key]
            key == 'op' ? el[0].style.opacity = this.color.rgb[key] : null
        }
    }
    }
}
