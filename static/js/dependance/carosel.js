
/**
 * Carosel permet faire des image ou autre automatique
 * avec la bonne structure HTML
 * @param {HTMLElement} element 
 * l'element html qui englobe toute autre element enfant a faire défiler
 * @param {object} option 
 * object contenant les différentes options pour modifier le comportement du Carosel
 */

export class Carosel{

    compter = 0

    constructor(element,option){

        this.element = element
        this.first = element.firstElementChild.cloneNode(true)
        this.element.appendChild(this.first)
        this.child = Array.from(element.children)
        
        // option par defaut
        this.option = Object.assign({},{
            visible:1,
            defile:1,
            margin:0,
            time:1,
            active:false
        },option)
        
        try {
            // les bouton gautche et droite
            this.option.gauche.onclick= ()=> this.nextL()
            this.option.droit.onclick= ()=> this.nextR()
        } catch (error) {}
        
        // la taille d'un element
        

        // actif 
        if (option.active){
            this.active()
        }

        // response
        if (this.option.reponse){
            window.onresize = ()=>{
                if (window.innerWidth < 700){
                    this.option.visible = 1
                } else {
                    this.option.visible = 2
                }
                this.visible()
            }   
        }
        this.visible()
        if (this.option.auto){
            const t = setInterval(() => {
                this.nextR()
            }, this.option.time*1000);
        }
    }

    visible(){
        if (this.option.visible == 1)
            this.child.forEach(el => el.style.flex = '1 0 100%')
        
        else if (this.option.visible == 2){
            this.child.forEach(el => el.style.flex = '1 0 45%')

        }
        this.w=this.child[this.compter].getBoundingClientRect()
        this.w = this.w.width + this.option.margin
    }

    /**
     * deplacement a droite
     */
    nextR(){
        this.compter += this.option.defile 
        const cal = (-this.compter*this.w) 
        this.element.style.transform = 'translateX('+(cal)+'px)'
        this.element.style.transition = (this.option.time/2) + 's linear'
        
        if (this.option.active){
            this.active()
        }
        if (this.compter >= this.child.length -1){
            setTimeout(() => {
                this.compter = 0
                this.element.style.transition = 'uniset'
                this.element.style.transform = 'translateX(0)'
                
            }, this.option.time);
        }

    }

     /**
     * deplacement a gauche
     */
    nextL(){
        this.compter-= this.option.defile
        
        if (this.compter <0){
            this.compter = this.child.length -2
            this.element.style.transition = 'uniset'
            const cal = -this.compter * this.w 
            this.element.style.transform = 'translateX('+(cal)+'px)'
            if (this.option.active){
                this.active()
            }
            return
        }
        this.element.style.transition = (this.option.time/2) + 's linear'
        const cal = -this.compter * this.w
        this.element.style.transform = 'translateX('+(cal)+'px)'
        if (this.option.active){
            this.active()
        }
    }
    active(){
       
        const sectionBoule = document.querySelectorAll('section.boule .item')
        sectionBoule.forEach(els =>{
            els.classList.remove('active')
            // els.setAttribute('class','')
        })
        if (this.compter >= this.child.length -1){
            sectionBoule[0].classList.add('active')
            return
        }

        sectionBoule[this.compter].classList.add('active')
    }
    /**
    * 
    * @returns {HTMLElement}
    */
    currentTarget(){
        return this.child[this.compter]
    }
   
}



export class CaroselTouch{

    /**
     * @param {Carosel} carosel
     */
    constructor(carosel){
        this.carosel = carosel
        // lorqu'on clic || touche l'ecrant
        this.carosel.element.addEventListener('mousedown', this.startDrag.bind(this))
        this.carosel.element.addEventListener('touchstart', this.startDrag.bind(this))
        // touchstart | lorsqu'on touche l'ecrant
        
        // lors du deplacement clic || touche l'ecrant
        window.addEventListener('mousemove', this.Drag.bind(this))
        window.addEventListener('touchmove', this.Drag.bind(this))
        
        // end move
        window.addEventListener('touchend', this.End.bind(this))
        window.addEventListener('touchcancel', this.End.bind(this))
        window.addEventListener('mouseup', this.End.bind(this))
    }

    /**
     * 
     * @param {MouseEvent|TouchEvent} e 
     */
    startDrag(e){
        console.clear()
        // on s'arret si il y a plus de un doigt sur l'ecran
        if (e.touches){
            if (e.touches?.length > 1) return
            else e = e.touches[0]
        }
        
        this.origin = {x: e.screenX}
    }
    /**
     * 
     * @param {MouseEvent|TouchEvent} e 
     */
    End(e){

        if (this.origin){
            if (!this.sens > 0){
                this.carosel.nextR()
            } else {
                this.carosel.nextL()
            }
            this.origin = null
        }

    }
    /**
     * deplacement
     * @param {MouseEvent|TouchEvent} e 
     */
    Drag(e){

        if (this.origin){
            const point = e.touches ? e.touches[0] : e 
            this.sens =  point.screenX - this.origin.x 
            console.log(this.sens);
            if (this.sens){
                this.carosel.element.style.transform = 'translate('+this.sens+'px)'
            }
        }
    }
}

