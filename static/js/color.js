import { couleurs } from "./main.js";
/**
 * cettte classe va generer des color ok
 * apppliquer la color a l'élément    ok
 * renvoir les color actuel           ok
 * metter a jours les champs          ok
 * appplique les modification -------
 * des champs sue l'element color     ok
 */

export class Color{
    /**
     * @param {HTMLElement} form 
     */
    constructor(form){
        
        this.rgb = {
            r:0,
            g:0,
            b:0,
            op:0                
        }
        this.element = form // element parent
         
        // gestion des champs
        this.dataform = new FormData(this.element)
        this.inputAll = Array.from(this.element.querySelectorAll('input'))
        this.inputAll.forEach(elements => {
            this.sartvalue(elements)

            elements.oninput = ()=>{
                this.sartvalue(elements)
                this.applicolor()
                if (elements.getAttribute('name') == 'op'){
                    elements.nextElementSibling.innerHTML = elements.value +'%'
                }
            }
        });
        
        // gestion des color
        this.colorelement = this.element.querySelector('.button-pos .color')
        this.colorelement.onclick = ()=>{

            // generer une nouvelle color
            this.Generate()

            // appliquer la nouvelle color
            this.applicolor()
            
            // mise a jour des champs
            this.updataInput()   
        }

        // appliquer la color des element
        const blockCh = Array.from(this.element.querySelector('.champs').children)
        blockCh.forEach(el=>{
            el.ondblclick = () => {
                for (const key in this.rgb) {
                    if (el.getAttribute('class').includes(key)){
                        for (const key in this.rgb) {
                            this.rgb[key] = key != 'op' ? 0 :this.rgb[key]
                        }
                        this.rgb[key] = 255
                    }
                }
                this.applicolor()
                this.updataInput()
            }
        })
    }
    
    parseop(op,inv=false){
        if (inv){
            
            return op *100
        }
        return op > 1 ? op /100 : op
    }  
    /**
     * 
     * @param {HTMLElement} el 
     */
    sartvalue(el){
        const value = el.value
        const name = el.getAttribute('name')
        this.rgb[name] = name == 'op'?
        this.rgb.op =this.parseop(value) : value
    }
    /**
     * insert une nouvelle couleur
     * @param {Array} value [r, g, b, op]
     * @returns {Boolean}
     */
    insert(value){
        if (Array.isArray(value) && value.length > 0){
            let n = 0
            for (const key in this.rgb) {
                this.rgb[key] = key == 'op'?
                this.rgb.op =this.parseop(value[n]) : value[n]
                n++
                if(n == value.length) break 

            }
            this.applicolor()
            this.updataInput()
            return true
        }
    }
    /**
     * 
     * @param {Number} op 
     */
    Generate(){
        const codeColor = couleurs(this.rgb.op) 
        this.rgb.r = codeColor[0]
        this.rgb.g= codeColor[1]
        this.rgb.b = codeColor[2]
        this.rgb.op =this.parseop(codeColor[3])
    }
    formateRGB(rgbx = false){
        rgbx = rgbx ? rgbx : this.rgb
        let colorrgb = 'rgba('
        for (const vaule in rgbx) {
            colorrgb+= rgbx[vaule]+','
        }
        colorrgb = colorrgb.slice(0,colorrgb.length-1)
        colorrgb += ')'
        return colorrgb
    }
    applicolor(){
        this.colorelement.style.backgroundColor = this.formateRGB()
    }
    updataInput(){
        for (const name of this.dataform.keys()) {
            const ch = this.inputAll.filter(el =>
                el.getAttribute('name') == name
            )
            if (ch.length){
                ch[0].value = name == 'op'? this.parseop(this.rgb[name],true) : this.rgb[name]
            }
        }
    }
}