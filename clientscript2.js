/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 *
 * clientscript2.js
 * 
 */
 define(["N/currentRecord", "N/search"], function (currentRecord, search) {
    var pageInit = function () {
    };
    var enviarDuplicidade = function () {
        var cocheira = currentRecord.get();
        var nome = cocheira.getValue({ fieldId: "name" });
        console.log(nome);
        var cavalo = cocheira.getValue({ fieldId: "custrecord_rsc_cavalinho" });
        console.log(cavalo);
        search.create({
            type: "customrecord_rsc_cocheira",
            //Filtra as cocheiras cujo o id do cavalo delas é igual ao current_cavalo;
            filters: [["custrecord_rsc_cavalinho", "IS", cavalo]]
        }).run().each(function (result) {
            if (String(cocheira.id) != String(result.id)) {
                alert("Inconsistencia, cavalo já tem uma cocheira");
            }
            return true;
        });
    };

    return {
        pageInit: pageInit,
        enviarDuplicidade: enviarDuplicidade
    }
    
});