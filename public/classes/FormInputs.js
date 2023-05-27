// import de la class "Datas" pour créer un instance
import { Datas } from "../classes/Datas.js";
import { Display } from "./Display.js";
import { Print } from "./Print.js";
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
        // Recup e element du DOM ou on va afficher le formulaire
        this.docContainer = document.getElementById('document-container');
        this.hiddenDiv = document.getElementById('hiddenDiv');
        this.btnPrint = document.getElementById('print');
        // Recup de la <div id="stored-data" > ou on va aficher le doc recup dan LocalStorage
        this.storedEl = document.getElementById('stored-data');
        // Recup du button reload
        this.btnReload = document.getElementById('reload');
        // Recup du button "AffichFacture"
        this.storedInvoices = document.getElementById('stored-invoices');
        // Recup du button "AffichDevis"
        this.storedEstimates = document.getElementById('stored-estimates');
        // Pour lancer les Listeners
        this.submitFormListener();
        // pour pouvoir imprimer la facture ou devis
        this.printListener(this.btnPrint, this.docContainer);
        // Méthode qui au click sur btn va recharger la page
        this.deleteListener(this.btnReload);
        // Listener qui va chercher un doc dans "localStorage"
        this.getStoredDocsListener();
    }
    // Listeners (on utilise une méthode en mode private)
    submitFormListener() {
        this.form.addEventListener("submit", this.handleFormSubmit.bind(this));
    }
    // "printListener()"
    printListener(btn, docContainer) {
        // gestion de l'evenement 'onClick'
        btn.addEventListener("click", () => {
            let availableDoc;
            // On va instancer la class "Print"
            availableDoc = new Print(docContainer);
            availableDoc.print();
        });
    }
    // deleteListener(this.btnReload)
    deleteListener(btn) {
        btn.addEventListener('click', () => {
            // on recharge la page
            document.location.reload();
            // On va scroller toute en haut de la page
            window.scrollTo(0, 0);
        });
    }
    // Méthode qui va chercher un doc dans "localStorage"
    getStoredDocsListener() {
        // pour les "Factures"
        this.storedInvoices.addEventListener("click", this.getItems.bind(this, "invoice"));
        // pour les "Devis"
        this.storedEstimates.addEventListener("click", this.getItems.bind(this, "estimate"));
    }
    ;
    // Méthode qui va verifier le LocalStorage,
    getItems(docType) {
        if (this.storedEl.hasChildNodes()) {
            // on va vider tous ce que se trouve
            this.storedEl.innerHTML = "";
        }
        // 2. On verifie ce qu'on a dans LocalStorage par rapport a ce "docType"
        // "invoice" ou "estimte"
        if (localStorage.getItem(docType)) { //si c'est "true"
            let array; //type de la variable
            array = localStorage.getItem(docType); //on va l'associer a cette variable
            // 2.1 Ne sachant pas dans qel cas on est, on va faire une autre verification
            if (array !== null && array.length > 2) { //ca veut dire qu'on a des valeur dans []
                let arrayData; //type de la variable
                arrayData = JSON.parse(array); //on y met ce qu'on a trouvé
                arrayData.map((doc) => {
                    // création des elements "div"
                    let card = document.createElement('div');
                    let cardBody = document.createElement('div');
                    // on applique les "class"
                    let cardClasses = ['card', 'mt-5'];
                    let cardBodyClasses = 'card-body';
                    // on applique les class au éléments
                    card.classList.add(...cardClasses);
                    cardBody.classList.add(cardBodyClasses);
                    // Insertions des valeurs recupéré dans la DOM
                    cardBody.innerHTML = doc;
                    card.append(cardBody);
                    // ensuite on les passe dans la div ou on veut les afficher
                    this.storedEl.append(card);
                });
            }
            else {
                this.storedEl.innerHTML = '<div class="p-5">Aucune data disponible </div>';
            }
        }
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
            template = new Display(this.docContainer, this.hiddenDiv, this.btnPrint);
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
