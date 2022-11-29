/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */

 define(['N/record', 'N/search', 'N/log', 'N/currentRecord', 'N/url'], function (record, search, log, currentRecord, url) {

    function pageInit(context) {
    }

    function fieldChanged(context) {
        var fieldId = context.fieldId; //Variável fieldId recebe o nome do id;
        console.log("fieldId", fieldId);
        var record_atual = context.currentRecord;
        var idCliente = record_atual.getValue({
            fieldId: "custpage_rsc_cliente"
        });
        console.log("cliente", idCliente);
        if (fieldId == "custpage_rsc_cliente") {

            search.create({
                type: "customer",
                filters: [["internalId", "IS", idCliente]],
                columns: ["subsidiary"]
            }).run().each((result) => {
                var subsidiaria = result.getValue("subsidiary");
                console.log(subsidiaria);

                record_atual.setValue({
                    fieldId: 'custpage_rsc_subsidiaria_principal',
                    value: subsidiaria
                });

                return true;
            });
        };
    };
    function enviar() {
        var record_atual = currentRecord.get(); //captura o registro atual;
        var cliente = record_atual.getValue({ fieldId: "custpage_rsc_cliente" });
        var sub = record_atual.getValue({ fieldId: "custpage_rsc_subsidiaria_principal" });
        console.log("ENVIAR: cliente = " + cliente + ", sub = "+ sub);
        var final_record = record.create({
            type: "customrecord_rsc_cliente" //tipo de registro que você esta criando;
        });
        final_record.setValue({
            fieldId: "custrecord_rsc_sub",
            value: sub
        });
        final_record.setValue({
            fieldId: "custrecord_rsc_cliente",
            value: cliente
        });
        final_record.setValue({
            fieldId: "name",
            value: "teste_1"
        });
        
        var todaydate = new Date();
        final_record.setValue({
            fieldId: "custrecord_rsc_datas",
            value: todaydate
        });

        var id_final_record = final_record.save();
        //alert("Registro criado com sucesso!");

        var output = url.resolveRecord({
            recordType: 'customrecord_rsc_cliente',
            recordId: id_final_record,
            isEditMode: false
        });

        window.location.replace(output);
    };

    return {
        pageInit: pageInit,
        fieldChanged: fieldChanged,
        enviar: enviar
    };
});

//esquerda função = chave / direita função = valor;