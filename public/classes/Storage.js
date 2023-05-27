export class Storage {
    constructor(typeVal, htmlString) {
        // propriéte "oldData" 
        this.oldData = [];
        this.setItem(typeVal, htmlString);
    }
    //Verif de localStorage
    static checkLocalStorage() {
        if (localStorage.getItem('invoice') === null) {
            // création "clé "+ "valeur"= "string" sous forme de []
            localStorage.setItem('invoice', '[]');
        }
        if (localStorage.getItem('estimate') === null) {
            // création "clé "+ "valeur"= "string" sous forme de []
            localStorage.setItem('estimate', '[]');
        }
    }
    // métode qui va injecter le Document généré dans LocalStorage
    setItem(typeVal, htmlString) {
        // 1. Vérification si le Tableau existe
        let array;
        array = localStorage.getItem(typeVal);
        if (array !== null) { //si pas null, donc "sting"
            //1.1: On alliment avec ce "string" la proprété "oldData"           
            this.oldData = JSON.parse(array);
            // 1.2 Ensuite on rajoute le HTML généré du document 
            this.oldData.push(htmlString); //mise a jour de []
            // 1.3 On met a jour localStorage
            localStorage.setItem(typeVal, JSON.stringify(this.oldData));
        }
        else {
            window.location.reload();
        }
    }
}
