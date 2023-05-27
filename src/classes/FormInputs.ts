// import interface "HasHtmlFormat"
import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";
// import de la class "Datas" pour créer un instance
import { Datas } from "../classes/Datas.js"
import { HasRender } from "../interfaces/HasRender.js";
import { Display } from "./Display.js";
import { HasPrint } from "../interfaces/HasPrint.js";
import { Print } from "./Print.js";

// Définition de la class a instancier
export class FormInput {
    
    // Propriété de la class(:type)
    form: HTMLFormElement;
    type: HTMLSelectElement;
    firstName: HTMLInputElement;
    lastName: HTMLInputElement;
    address: HTMLInputElement;
    country: HTMLInputElement;
    town: HTMLInputElement;
    zip: HTMLInputElement;
    product: HTMLInputElement;
    price: HTMLInputElement;
    quantity: HTMLInputElement;
    tva: HTMLInputElement;
    docContainer: HTMLDivElement;  //la div ou on inject la facture ou le devis
    hiddenDiv: HTMLDivElement;
    btnPrint: HTMLButtonElement;
    btnReload: HTMLButtonElement;

    constructor() {
        this.form = document.getElementById('form') as HTMLFormElement;
        this.type = document.getElementById('type') as HTMLSelectElement;
        this.firstName = document.getElementById('firstName') as HTMLInputElement;
        this.lastName = document.getElementById('lastName') as HTMLInputElement;
        this.address = document.getElementById('address') as HTMLInputElement;
        this.country = document.getElementById('country') as HTMLInputElement;
        this.town = document.getElementById('town') as HTMLInputElement;
        this.zip = document.getElementById('zip') as HTMLInputElement;
        this.product = document.getElementById('product') as HTMLInputElement;
        this.price = document.getElementById('price') as HTMLInputElement;
        this.quantity = document.getElementById('quantity') as HTMLInputElement;
        this.tva = document.getElementById('tva') as HTMLInputElement;

        // Recup e elemDOM ou on va afficher le formulaire
        this.docContainer = document.getElementById('document-container') as HTMLDivElement
        this.hiddenDiv = document.getElementById('hiddenDiv') as HTMLDivElement;

        this.btnPrint = document.getElementById('print') as HTMLButtonElement;

        // Recup du button reload
        this.btnReload = document.getElementById('reload') as HTMLButtonElement;

        // Pour lancer les Listeners
        this.submitFormListener();

        // écoute le click sur les boutons:  arguments :"btn 'imprimer'" et
        //  la div ou on injecte la facture ou le Devis. On va recuperer
        // cette "div" pour pouvoir imprimer la facture ou devis
        this.printListener(this.btnPrint, this.docContainer);

        // Méthode qui au click sur btn va recharger la page
        this.deleteListener(this.btnReload);
    }

    // Listeners (on utilise une méthode en mode private)
    private submitFormListener(): void {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this) )
    }

    // "printListener()"
    private printListener(btn: HTMLButtonElement, docContainer: HTMLDivElement) {

        // gestion de l'evenement 'onClick'
        btn.addEventListener("click", () => {
            let availableDoc: HasPrint;

            // On va instancer la class "Print"
            availableDoc = new Print(docContainer);
            availableDoc.print();
        })
    }

    // deleteListener(this.btnReload)
    private deleteListener(btn: HTMLButtonElement) {

        btn.addEventListener('click', () => {
            // on recharge la page
            document.location.reload();
            // On va scroller toute en haut de la page
            window.scrollTo(0, 0);
        } )
    }


    // Méthode pour soummetre le formulaire
    private handleFormSubmit(e: Event) {
        e.preventDefault();

        // Verification si on recupèr un "Array"
        const inputs = this.inputDatas();

        // si "inputs" récupéré c'est un "Array", via destructuring on va générer une variable par valeur
        if( Array.isArray(inputs)){
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            // console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);  
            
            // Instance de l'inerface "HasHtmlFormat"
            let docData: HasHtmlFormat;
            //on genere la Date, vu qu'on a besoin d'avoir une date
            let date: Date = new Date();
            // Instanc de la class "Datas"
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);

            // Instance de l'inerface "HasRender"
            let template: HasRender;  //type de variable
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);

            template.render(docData, type);
        }
    }

    private inputDatas(): [string, string, string, string, string, string, number, string, number, number, number] | void {

        // on va returner le "Tiple"
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber;   //=> transformation de la valeur de l'input en "number"       
        const product = this.product.value;
        const price = this.price.valueAsNumber;             
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;

        // Vérification des valeurs "number"
        if(zip > 0 && price > 0 && quantity > 0 && tva > 0 ){
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];

        } else {
            // Si les valeur "number" sont mal renseignés, on va avertir le utilisateur
            alert("Les valeurs numérique doivent être > 0 !!!");
            return ;
        }
    }
}
