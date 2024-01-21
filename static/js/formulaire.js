
export class Form{
    constructor(form,option){
        this.forms = form
        this.form = new FormData(form)
        try {this.btn = this.forms.querySelector('input[type=submit]')}
        catch (error) {this.btn = forms.querySelector('button')}

        console.log(this.btn);
        // option par defaut
        this.option = Object.assign({},{
            btn:true,
            alert:true,
            msg:'champs obligatoire *',
            event:onkeyup,
        },option)

        //desactivation du boutton d'envoi
        if (this.option.btn) this.desativeBtn()

        // sytéme de vérification
        let key = Array.from(this.form.keys())
        this.veri = {}
        for (const i of key) {this.veri[i] = true}

        form.onkeyup = () =>  this.main()
    }
    
    desativeBtn() {
        this.btn.setAttribute('disabled','')
    }
    
    activeBtn() {
        this.btn.removeAttribute('disabled')
    }
    /**
     * 
     * @param {string} name
     * 
     * @returns {string}
     */
    msgPerso(name){
        if (this.option.msgPersoName){
            if (name in this.option.msgPersoName){
                return this.option.msgPersoName[name]
            }
            else{
                return this.option.msg
            } 
        }
        else if(this.option.msgPersoType){
            let element = ''
            let types = ''
            try {
                element = 'input[name='+name+']'
                element = this.forms.querySelector(element)
                types = element.getAttribute('type')
            } 
            catch (error) {
                if (name != 'sex'){
                    element = 'textarea[name='+name+']'
                    element = this.forms.querySelector(element)
                    types = 'description'
                }
            }
            if (types in this.option.msgPersoType){
                return this.option.msgPersoType[types]
            }
            else{
                return this.option.msg
            } 
        }
        else{
            return this.option.msg
        }
    }

    msgAlert(name) {   
        const element = this.el(name)
        const div = document.createElement('div')
        div.setAttribute('class','alert')
        div.innerHTML = this.msgPerso(name)
        this.forms.insertBefore(div,element)    
    }
    
    supAlert(name){
        name = this.el(name)
        if ((this.option.msgPerso)){
            for (const [key,value] of Object.entries(this.option.msgPerso)) {
                    
                if(name.innerHTML == value){
                    this.forms.removeChild(name)
                }
            }
        }
        else{
            if(name.innerHTML.includes('champs')){
                this.forms.removeChild(name)
            }
        }
    }
    
    el(name) {
    
        try {
            
            let namel = 'input[name='+name+']'
            const names = this.forms.querySelector(namel).nextElementSibling.nextElementSibling
        
            return names
        } 
        catch (error) {
            if (name != 'sex'){
                name = 'textarea[name='+name+']'
                const names = this.forms.querySelector(name).nextElementSibling
            
                return names
    
            }
        }
    }

    main(){
        this.form = new FormData(this.forms)
        let key = Array.from(this.form.keys())
        let len = 0
        for (const i of key) {
            if (!this.form.get(i)){
                if (this.option.btn) this.desativeBtn()
                if (this.veri[i]){
                    this.msgAlert(i)
                    this.veri[i] = false
                }
                len++
            }
            else{
                this.supAlert(i)
                this.veri[i] = true
            }
        }
        if (len == 0) this.activeBtn()
    }
}

export class Forms{
    /**
     * 
     * @param {HTMLDivElement} element 
     * @param {Object} option {
     * btn ;bool
     * alert: bool
     * msg : string
     * file: bool
     * select:name
     * facul : []
     * msgPersoName : {nameInput:msg}
     * msgPersoType : {nameInput:msg}
     * }
     */
    constructor(element,option){
        this.element = element
        this.child = Array.from(element.children)
        this.childs = []
        this.activeBtn = {}
        this.verifi= {}

        this.child.forEach(element => {
            if (element.getAttribute('name')) {
                this.childs.push(element)
                this.verifi[element.getAttribute('name')] = true
                this.activeBtn[element.getAttribute('name')] = false
            }
        });
        // option par defaut
        this.option = Object.assign({},{
            btn:true,
            alert:true,
            msg:'champs obligatoire *',
            file:false,
            facul:[],
            select:false,
        },option)

        //desactivation du boutton d'envoi
        if (this.option.btn) this.desativeBtn()

        // sytéme de vérification
        const typeInput = ['file','time','date','hidden','radio','checkbox']
        this.childs.forEach(element => {
            if (!typeInput.includes(element.getAttribute('type'))){
                if (!this.option.facul.includes(element.getAttribute('name'))){
                    if(this.option.select == element.getAttribute('name')){
                        element.onchange =()=>{
                            this.valideChamp(element,this.option.select,false)
                        }
                        // element.oninput =()=>{
                        //     this.valideChamp(element,this.option.select,false)
                        // }
                    }

                    else{
                        element.onkeyup = ()=>{
                            const name = element.getAttribute('name')
                            this.valideChamp(element,name,false)       
                        }
                    }
                }
                else{
                    this.option.facul.forEach(value => {
                        this.activeBtn[value] = true
                    });
                }
            }
            
            else{
                // cas ou il ya un input file
                if (element.getAttribute('type') == 'file' && this.option.file){
                    element.onchange = ()=>{
                        const name = element.getAttribute('name')
                        this.valideChamp(element,name,true)
                        try {
                            let namefile = element.value.replace('C:\\fakepath\\','')
                            const label = element.previousElementSibling
                            if(label){
                                const p = label.querySelector('span.name-file')
                                if (p){
                                    p.innerHTML = namefile
                                }
                                document.querySelector('input[name="nom"]').value = namefile.replace('.pdf','')
                            }
                                this.valideChamp(element,name,false)
                        } catch (error) {
                            
                        }
                    }
                }
                else if(['date','time','checkbox'].includes(element.getAttribute('type'))){
                   
                    element.onchange = () => {
                        const name = element.getAttribute('name')
                       
                    }
                }
                else {
                    this.activeBtn[element.getAttribute('name')] = true
                }
                
                    
            }
            
        });
    }
    
    /**
     * @param {HTMLDivElement} file 
     * @param {boolean} bool 
     */
    files(file,bool = true) {
        const labelFile = file.previousElementSibling
        if (bool) labelFile.classList.add('cl-v')
        else labelFile.classList.remove('cl-v')
    }

    valideChamp(element,name,file= false){
        if (!element.value){
            if (name == 'tel' && this.option.number){
                if (!element.value.lenght >= this.option.number){
                    console.log()
                    this.msgAlert(name)
                    return
                }

            }
            if(this.verifi[name]){
                this.msgAlert(name)
                this.verifi[name] = false
                this.activeBtn[name] = false
            }
            this.files(element,false)
        }
        else{
            if (file )this.files(element)
            this.supAlert(name)
            this.verifi[name] = true
            this.activeBtn[name] = true
        }
        this.verifiSubmit()
    }

    verifiSubmit(log=false){
        let cpt = 0
        let count = 0

        this.childs.forEach(element => {
            
            if(!element.value)cpt++
            count++
        });
        // for (const [key,value] of Object.entries(this.activeBtn)) {
        //     if (!value) {
        //         cpt++
        //     }
        //     count++
        // }
        if (cpt == 0 && count>0) {
            this.active()
            if (log){
                log = {}
                for (const iterator of this.childs) {
                    const name = iterator.getAttribute('name')
                    log[name] = iterator.value
                    iterator.value = ''
                    if (!this.option.facul.includes(name))
                    this.activeBtn[name] = false
                }
                return log
            }
            else return true
        }
        return false
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    desac(e){
        e.preventDefault()
    }

    desativeBtn(){
        this.element.addEventListener('submit',this.desac)
    }

    active(){
        this.element.removeEventListener('submit',this.desac)
    }

    /**
     * @param {string} name
     * @returns {string}
     */
    msgPerso(name){ 
        if (this.option.msgPersoName){
            if (name in this.option.msgPersoName)
                return this.option.msgPersoName[name]

            else if (this.option.msgPersoType)
                return this.msgPersoType(name)

            else
                return this.option.msg
        }

        else if(this.option.msgPersoType){
           return this.msgPersoType(name)
        }

        else{
            return this.option.msg
        }
    }

    msgPersoType(name){
        let element = ''
        let types = ''
        try {
            element = 'input[name='+name+']'
            element = this.element.querySelector(element)
            types = element.getAttribute('type')
        } 
        catch (error) {
            if (name != 'sex'){
                element = 'textarea[name='+name+']'
                element = this.element.querySelector(element)
                types = 'description'
            }
        }
        if (types in this.option.msgPersoType){
            return this.option.msgPersoType[types]
        }
        else{
            return this.option.msg
        }
    }

    msgAlert(name) {  
        const element = this.el(name)
        const div = document.createElement('div')
        div.classList.add('erroForm')
        div.innerHTML = this.msgPerso(name)
        element.insertAdjacentElement('afterend',div) 
    }
    
    supAlertPerso(name,param){
        let cpt = 0

        for (const [key,value] of Object.entries(param)) {
                    
            if(name.innerHTML == value){
                this.element.removeChild(name)
                cpt++
            }
        }
        return cpt
    }

    supAlert(name){
        
        name = this.el(name).nextElementSibling
        if ((this.option.msgPersoName)){
            let cpt = this.supAlertPerso(name,this.option.msgPersoName)
            if (cpt == 0 && this.option.msgPersoType)
                this.supAlertPerso(name,this.option.msgPersoType)
        }

        else if ((this.option.msgPersoType)){
            this.supAlertPerso(name,this.option.msgPersoType)
        }
        
        if(name.innerHTML == this.option.msg){
            this.element.removeChild(name)
        }
    }
    
    el(name) {
    
        try {
            
            let namel = 'input[name='+name+']'
            let names = this.element.querySelector(namel)
            if (!names){
                namel = 'textarea[name='+name+']'
                names = this.element.querySelector(namel)
                if (!names){
                    name = 'select[name='+name+']'
                    names = this.element.querySelector(namel)

                }
                
            }
            return names
        } 
        catch (error) {
    
        }
    }
}