export class Display {
    // Recup du elementHTML ou on va afficher cette facture
    constructor(container, hiddenDiv) {
        this.container = container;
        this.hiddenDiv = hiddenDiv;
        this.formContainer = document.getElementById("form-container");
        document.getElementById("document-container");
    }
    // On precise la méthode "render()"
    render(docObject, docType) {
        const htmlString = docObject.htmlFormat();
        // On inject le template au niveau de container
        this.container.innerHTML = htmlString;
        // On va retirer la class 'invisible' pour pouvoir afficher le document
        this.hiddenDiv.classList.remove('invisible');
        // On cache le formulaire et less la place au document emis
        this.formContainer.innerHTML = "";
    }
}
