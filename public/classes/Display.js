import { Storage } from "./Storage.js";
export class Display {
    // Recup du elementHTML ou on va afficher cette facture
    constructor(container, hiddenDiv, btnPrint) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.btnPrint = btnPrint;
        this.formContainer = document.getElementById("form-container");
        document.getElementById("document-container");
    }
    // On precise la méthode "render()"
    render(docObject, docType) {
        const htmlString = docObject.htmlFormat();
        // On inject le Html au niveau de container
        this.container.innerHTML = htmlString;
        // On va instancier la class "Storage"
        new Storage(docType, htmlString);
        if (docType === 'invoice') {
            this.btnPrint.innerText = "Imprimer la Facture";
        }
        else {
            this.btnPrint.innerText = "Imprimer le Devis";
        }
        // On va retirer la class 'invisible' pour pouvoir afficher le document
        this.hiddenDiv.classList.remove('invisible');
        // On cache le formulaire et less la place au document emis
        this.formContainer.innerHTML = "";
    }
}
