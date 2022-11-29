/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
 define(['N/log', 'N/record', 'N/currentRecord', 'N/search'], function (log, record, currentRecord, search) {

    function beforeLoad(ctx) {
        var form = ctx.form;     ////se o usuario quiser criar ou editar um cavalo;

        if (ctx.type == ctx.UserEventType.EDIT || ctx.type == ctx.UserEventType.CREATE) { //edição, criação e edição em linha do registro;
        //cria-se um botão para verificar a duplicidade;
            form.addButton({
                id: "custpage_rsc_checarduplicidade",  //id do botão;
                label: "Checar duplicidade",          //Nome do botão;
                functionName: "enviarDuplicidade"    //função que o "parâmetro" clientScript puxa;
            });

            form.clientScriptModulePath = "./clientscript2.js"; //Passa para o Suitelet qual o arquivo de ClientScript ele irá chamar;
        };
    };

    function beforeSubmit(ctx) {                  
        var cocheira = ctx.newRecord; //Acessando o registro;
        var nome = cocheira.getValue({ fieldId: "name" });
        log.audit("nome", nome);
        var cavalo = cocheira.getValue({ fieldId: "custrecord_rsc_cavalinho" }); //id do cavalo dentro do registro colcheira;
        log.audit("cavalo", cavalo);

        search.create({
            type: "customrecord_rsc_cocheira",
            filters: [["custrecord_rsc_cavalinho", "IS", cavalo]] //filtrando através do id do cavalo;
        }).run().each(function (result) { //verifica se o cavalo já está em uma cocheira;
            if (String(cocheira.id) != String(result.id)) {
                throw new Error("Inconsistencia, cavalo já tem uma cocheira");
            }
            return true;
        });

    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit
    }
    
});

//Na linha 10 if(ctx.type == ctx.UserEventType.VIEW){ temos o objeto ctx.type. Ele referencia qual é o tipo do contexto onde está sendo trabalhado;
//Os principais valores são: VIEW (tela de visualização de um registro), CREATE (tela de criação) e EDIT (tela de edição);