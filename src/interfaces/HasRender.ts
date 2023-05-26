import { HasHtmlFormat } from "../interfaces/HasHtmlFormat.js";

export interface HasRender {

    // Structure : va exiger une méthode "render()"
    render(docObject: HasHtmlFormat, docType: string): void;
}

