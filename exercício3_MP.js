/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 */
 define(['N/record', 'N/search', 'N/runtime', 'N/log'], function (record, search, runtime, log) {
    //script convertido da versão 1.0 Variáveis e lógica mantidas;
    var getInputData = function () {
        return search.create({
            type: "customrecord_rsc_rd1",
            filters: ["custrecord_rsc_processado", "IS", 2],
            columns: ["custrecord_rsc_json"] //lê as informações do JSON (leads);
        });
    };

    var map = function (ctx) { //A função map do script será responsável por capturar o JSON de cada um dos registros "LRC @ JSON Integração RD1";
        try {                  //E capturar cada um dos clientes da chave "leads" do JSON; //variavel para fazer a leitura do JSON;
            var request = JSON.parse(ctx.value); //pega as informações do contexto do map e transforma em um objeto, o contexto está no registro (search);
            var dados = JSON.parse(request.values["custrecord_rsc_json"]); //capturando o JSON; //variavel para pegar valores especificos do JSON recebidos do registro NetSuite;
            log.audit("dados", dados);
            var email = dados.email;
            var title = dados.tilte;
            var subsidiary = dados.subsidiary;
            var classe = dados.class;
            var location = dados.location;
            var departament = dados.departament;
            var phone = dados.phone;

            //Separando nome do sobrenome;
            var completo = dados.name ? dados.name.split("") : [];
            var nome = completo.splice(0); //primeiro elemento é retirado do array e colocado na variavel nome;
            var lastname = completo.toString();
            lastname.replace(",", " ");
            log.audit("lastaname", lastname);

            //criar registro com {name, lastname, title, email, subsidiary, class, location, departament, phone};
            var record_1 = record.create({ //criando um novo registro dinâmico sobre o cliente;
                type: 'customer', //preciso do tipo parceiro;
            });

            record_1.setValue({ fieldId: 'firstname', value: nome });
            record_1.setValue({ fieldId: 'lastname', value: lastname });
            record_1.setValue({ fieldId: 'email', value: email });
            record_1.setValue({ fieldId: 'subsidiary', value: subsidiary });
            record_1.setValue({ fieldId: 'title', value: title });
            record_1.setValue({ fieldId: 'class', value: classe });
            record_1.setValue({ fieldId: 'location', value: location });
            record_1.setValue({ fieldId: 'departament', value: departament });
            record_1.setValue({ fieldId: 'phone', value: phone });
            record_1.save(); //Cada variável dos setValue NÃO podem ser undefined. Sempre tem que ser defined, no mínimo vazia;
        }

        catch (erro) {
            log.error("erro", erro);
        }

    };

    return {
        getInputData: getInputData,
        map: map
    }
    
});