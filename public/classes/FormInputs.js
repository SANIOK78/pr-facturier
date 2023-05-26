// import de la class "Datas" pour créer un instance
import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
// Définition de la class a instancier
export class FormInput {
    constructor() {
        this.form = document.getElementById('form');
        this.type = document.getElementById('type');
        this.firstName = document.getElementById('firstName');
        this.lastName = document.getElementById('lastName');
        this.address = document.getElementById('address');
        this.country = document.getElementById('country');
        this.town = document.getElementById('town');
        this.zip = document.getElementById('zip');
        this.product = document.getElementById('product');
        this.price = document.getElementById('price');
        this.quantity = document.getElementById('quantity');
        this.tva = document.getElementById('tva');
        // Recup e elemDOM ou on va afficher le formulaire
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        // Pour lancer le Listener
        this.submitFormListener();
    }
    // Listeners (on utilise une méthode en mode private)
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    // Méthode pour soummetre le formulaire
    handleFormSubmit(e) {
        e.preventDefault();
        // Verification si on recupèr un "Array"
        const inputs = this.inputDatas();
        // si "inputs" récupéré c'est un "Array", via destructuring on va générer une variable par valeur
        if (Array.isArray(inputs)) {
            const [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva] = inputs;
            // console.log(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva);  
            // Instance de l'inerface "HasHtmlFormat"
            let docData;
            //on genere la Date, vu qu'on a besoin d'avoir une date
            let date = new Date();
            // Instanc de la class "Datas"
            docData = new Datas(type, firstName, lastName, address, country, town, zip, product, price, quantity, tva, date);
            // Instance de l'inerface "HasRender"
            let template; //type de variable
            template = new Display(this.docContainer, this.hiddenDiv);
            template.render(docData, type);
        }
    }
    inputDatas() {
        // on va returner le "Tiple"
        const type = this.type.value;
        const firstName = this.firstName.value;
        const lastName = this.lastName.value;
        const address = this.address.value;
        const country = this.country.value;
        const town = this.town.value;
        const zip = this.zip.valueAsNumber; //=> transformation de la valeur de l'input en "number"       
        const product = this.product.value;
        const price = this.price.valueAsNumber;
        const quantity = this.quantity.valueAsNumber;
        const tva = this.tva.valueAsNumber;
        // Vérification des valeurs "number"
        if (zip > 0 && price > 0 && quantity > 0 && tva > 0) {
            return [type, firstName, lastName, address, country, town, zip, product, price, quantity, tva];
        }
        else {
            // Si les valeur "number" sont mal renseignés, on va avertir le utilisateur
            alert("Les valeurs numérique doivent être > 0 !!!");
            return;
        }
    }
}