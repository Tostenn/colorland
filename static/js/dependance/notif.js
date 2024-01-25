// creer une nouvelle notifif
// pouvoir fermer la notif
// la notif disparait aprés 1s || 1.5s


/**
 * gestio des notification
 */
export class Notif{
    /**
     * 
     * @param {HTMLElement} parent 
     */
    DESTROY = 'destroy'
    constructor(parent){
        this.parent = parent
        this.template = this.parent.querySelector('template.article-alert')
    }
    /**
     * nouvelle alert
     * @param {string} msg 
     * @param {string} clas 
     * @param {number} t 
     */
    new(msg,clas="",t=3){
        t*=1000
        console.log(t);
        const article = document.createElement('article')
        article.append(this.template.content.cloneNode(true))

        // message de l'alert
        article.querySelector('.msg').innerHTML = msg
        
        // message de l'alert
        if (clas) article.classList.add(clas)
        
        console.log(article.innerHTML)
        // fermer l'alert
        article.querySelector('.croix').onclick = ()=> this.destroy(article)
        setTimeout(() => {
            this.destroy(article)
        }, t);

        // ajouter à la page
        this.parent.insertBefore(article,this.parent.firstElementChild)
        console.log(this.parent.firstElementChild);
    }
    /**
     * detruit l'alert
     * @param {HTMLElement} article 
     * @param {number} t 
     */
    destroy(article,t){
        article.classList.add(this.DESTROY)
        setTimeout(() => {
            article.remove()
        }, t);
    }
}