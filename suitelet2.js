/**
*@NApiVersion 2.x
*@NScriptType Suitelet
*
*/

define(['N/record', 'N/search', 'N/log', 'N/https', 'N/url'], function (record, search, Log, https, url) {

    function onRequest (ctx) { //verifica se o método usado é o post;

        if (ctx.request.method == 'POST') { //variável para ter acesso a todo o body "corpo" do JSON;

            var requestBody = JSON.parse(ctx.request.body); //variável para criar um registro sobre os JSON NÃO processados;
            //verífica cada novo potencial cliente dentro do JSON;

            var record_1 = record.create({
                type: 'customrecord_rsc_rd1'
            }); //id do registro para a integração no NetSuite;
                //cria um registro do tipo: LRC @ JSON Integração RD1;
                
            requestBody.leads.forEach(function (lead) { //requestBody é uma string;
                record_1.setValue({
                    fieldId: 'name',
                    value: lead.name
                }); //atribuindo valores aos campos do registro;
                //Atribuindo informações no novo registro conforme especificado;
                //leads é um array de possíveis clientes enviados pelo RD1;

                record_1.setVaue({
                    fieldId: 'custrecord_rsc_json',
                    value: JSON.stringify(lead) //JSON.stringify converte qqr valor em objeto JSON;
                    //lendo JSON com as informações;
                }); //preenchendo o campo JSON;

                record_1.setValue({
                    fieldId: 'custrecord_rsc_processado', //preenchendo o campo processado;
                    value: 2 //1 é Processado e 2 é NÃO Processado, logo ele seta o valor de Não processado;
                }); //valor Não processado; 
                //pela ordem colocada no NetSuite o 2 significa que NÃO foi processado;
                //então aqui se está pegando as informações para um registro NÃO processado;

                record_1.save(); //salvar o registro;

            });
        };
    };

    return {
        onRequest: onRequest
    };

});