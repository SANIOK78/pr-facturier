import { HasHtmlFormat } from "../interfaces/HasHtmlFormat";
import { HasRender } from "../interfaces/HasRender.js";

export class Display implements HasRender {

    formContainer: HTMLDivElement;

    // Recup du elementHTML ou on va afficher cette facture
    constructor(private container: HTMLDivElement, private hiddenDiv: HTMLDivElement ) {

        this.formContainer = document.getElementById("form-container") as HTMLDivElement;
        document.getElementById("document-container")
    }

    // On precise la méthode "render()"
    render(docObject: HasHtmlFormat, docType: string) {

        const htmlString: string = docObject.htmlFormat();

        // On inject le template au niveau de container
        this.container.innerHTML = htmlString; 

        // On va retirer la class 'invisible' pour pouvoir afficher le document
        this.hiddenDiv.classList.remove('invisible');

        // On cache le formulaire et less la place au document emis
        this.formContainer.innerHTML = "";
    }
}

