// importation de la cass
import { FormInput } from './classes/FormInputs.js';
// import class "Storage"
import { Storage } from './classes/Storage.js';
// Instanciation de la class "FormInput"
new FormInput();
// On n'est pas obliger de instancier la class "Storage"
// vue qu'elle est en mode "STATIC" et on aura acces a rien
// On doit passer par le "nom" de la class pour avoir acces
// a ces méthodes et propriété.
Storage.checkLocalStorage();
