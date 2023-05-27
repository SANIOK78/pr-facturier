import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
import { HasRender } from "../interfaces/HasRender.js";
import { Storage } from "./Storage.js";

export class Display implements HasRender {

    formContainer: HTMLDivElement;

    // Recup du elementHTML ou on va afficher cette facture
    constructor(
        private container: HTMLDivElement,
        private hiddenDiv: HTMLDivElement,
        private btnPrint: HTMLButtonElement,

    ) {
        this.formContainer = document.getElementById("form-container")as HTMLDivElement;
        document.getElementById("document-container")
    }

    // On precise la méthode "render()"
    render(docObject: HasHtmlFormat, docType: string) {

        const htmlString: string = docObject.htmlFormat();

        // On inject le Html au niveau de container
        this.container.innerHTML = htmlString; 

        // On va instancier la class "Storage"
        new Storage(docType, htmlString)

        if(docType === 'invoice') {
            this.btnPrint.innerText = "Imprimer la Facture"
        } else {
            this.btnPrint.innerText = "Imprimer le Devis"
        }

        // On va retirer la class 'invisible' pour pouvoir afficher le document
        this.hiddenDiv.classList.remove('invisible');

        // On cache le formulaire et less la place au document emis
        this.formContainer.innerHTML = "";
    }
}

