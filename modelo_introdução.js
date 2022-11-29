/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet // Pode ser: Suitelet, UserEvent, MapReduce etc; 
 * (ou seja, você precisará alterar conforme o tipo de script que um problema exige);
 * 
 * pedido_de_vendas.ts //Nome do documento que você adotou;
 * 
 */

 import * as UI from "N/ui/serverWidget";   //Exemplos de importação;
 import { EntryPoints } from "N/types";     //Exemplos de importação;
 import Search from "N/search";             //Exemplos de importação;

 // A primeira linha representa a versão da API (Não modifique até o fim de 2021);

// A segunda linha, por sua vez, representa o tipo do script. Podendo ser ele: Suitelet, UserEvent, MapReduce etc;
// (ou seja, você precisará alterar conforme o tipo de script que um problema exige);

// Após isso, é possível notar os imports realizados. Estes imports são criados com base na exigência do problema que você realizará;
// Como explicado no tópico Documentação. é possível ver todos os módulos disponíveis no próprio NetSuite;