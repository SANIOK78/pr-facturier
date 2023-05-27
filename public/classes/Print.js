export class Print {
    /**Lors de l'instanciation on va devoir definir l'element
     * dans lequel se trouve la facture ou le document a imprimer
    */
    constructor(el) {
        this.el = el;
    }
    print() {
        // on remplace le contenu de "body" par le contenu de ce
        // qu'il y a dans le "el.HTML"
        document.body.innerHTML = this.el.innerHTML;
        // méthode 'Print' de l'objet Window va imprimer toute 
        // la page et du coup vu qu'on a remplacé le contenu de 
        // "body", il va imprimer seulement ce qu'il va touvé
        // "Facture" ou "Devis"
        window.print();
        // Vu qu'on a fait caché le formulaire, une foit qu'on
        // a imprimé le document, on va reaficher le formulaire
        // pour créer un autre document
        document.location.reload(); //recharger la page
    }
}
