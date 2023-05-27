
export interface HasSetItem {

    // Structure de la métode a respecter
    setItem(typeVal: string, htmlString: string ): void
}

/**
 * - "typeVal: string" => arg: on precise "facture" ou "devis";
 * - "htmlString: string" => le code HTML transformé en "string" 
 * (dans class "Datas" on a la méthode htmlFormat() qui nous
 *  génèr le HTML) et qu'on va injecter dans LocalStorage
*/