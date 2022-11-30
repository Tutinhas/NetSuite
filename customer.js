/**
 *@NApiVersion 2.1
 *@NScriptType Restlet
 */
define(['N/log', 'N/record', 'N/search'], function (log, record, search) {
    // var JSON = {
    //     "isperson": "T",
    //     "firstname": "Adriano",
    //     "lastname": "Reis",
    //     "email": "adriano.reis@gmail.com",
    //     "title": "Desenvolvedor NetSuite",
    //     "companyname": "Runsmart.Cloud",
    //     "comments": "Gosto de sorvete",
    //     "subsidiary": "75",
    //     "custentity_esc_industry": "29",
    //     "custentity35": "Sativa",
    //     "custentity34": "Sim",
    //     "custentity28": "Sim"
    // }

    function _get(context) {
        log.audit({
            title: '_get',
            details: context
        });

        // Busca o cliente com o e-mail "adriano.reis@gmail.com"
        var customerSearchObj = search.create({
            type: "customer",
            filters:
                [
                    ["email", "is", "adriano.reis@gmail.com"]
                ],
            columns:
                [
                    search.createColumn({ name: "datecreated", label: "Data de criação" }),
                    search.createColumn({ name: "isperson", label: "É um indivíduo" }),
                    search.createColumn({
                        name: "entityid",
                        sort: search.Sort.ASC,
                        label: "Nome"
                    }),
                    search.createColumn({ name: "companyname", label: "Nome da empresa" }),
                    search.createColumn({ name: "comments", label: "Comentários" }),
                    search.createColumn({ name: "subsidiary", label: "Subsidiária principal" }),
                    search.createColumn({ name: "custentity_esc_industry", label: "Segmento" }),
                    search.createColumn({ name: "custentity34", label: "Ele(a) gosta de sorvete?" }),
                    search.createColumn({ name: "custentity35", label: "Nome do animal de estimação" })
                ]
        }).run().getRange(0, 1);
        log.audit({
            title: 'customerSearchObj',
            details: customerSearchObj
        });

        var dados = [];

        // Checa se a busca trouxe resultados.
        if (customerSearchObj.length > 0) {
            for (i = 0; i < customerSearchObj.length; i++) {
                dados.push({
                    datecreated: customerSearchObj[i].getValue({ //Retornar campos do search.createColumn; Ex:isperson;
                        name: "datecreated"
                    }),

                    isperson: customerSearchObj[i].getValue({
                        name: "isperson"
                    }),

                    entityid: customerSearchObj[i].getValue({
                        name: "entityid"
                    }),

                    companyname: customerSearchObj[i].getValue({
                        name: "companyname"
                    }),

                    comments: customerSearchObj[i].getValue({
                        name: "comments"
                    }),

                    subsidiary: customerSearchObj[i].getValue({
                        name: "subsidiary"
                    }),

                    custentity_esc_industry: customerSearchObj[i].getValue({
                        name: "custentity_esc_industry"
                    }),

                    custentity34: customerSearchObj[i].getValue({
                        name: "custentity34"
                    }),

                    custentity35: customerSearchObj[i].getValue({
                        name: "custentity35"
                    }),

                });
            };
        };

        return dados;
    };

    function _post(context) {
        log.audit({
            title: '_post',
            details: context
        });

        const Record = record.create({
            type: record.Type.CUSTOMER
        });

        Record.setValue({
            fieldId: "isperson",
            value: context.isperson
        });

        Record.setValue({
            fieldId: "firstname",
            value: context.firstname
        });

        Record.setValue({
            fieldId: "lastname",
            value: context.lastname
        });

        Record.setValue({
            fieldId: "email",
            value: context.email
        });

        Record.setValue({
            fieldId: "title",
            value: context.title
        });

        Record.setValue({
            fieldId: "companyname",
            value: context.companyname
        });

        Record.setValue({
            fieldId: "comments",
            value: context.comments
        });

        Record.setValue({
            fieldId: "subsidiary",
            value: context.subsidiary
        });

        Record.setValue({
            fieldId: "custentity_esc_industry",
            value: context.custentity_esc_industry
        });

        Record.setValue({
            fieldId: "custentity35",
            value: context.custentity35
        });

        Record.setValue({
            fieldId: "custentity34",
            value: context.custentity34
        });

        Record.setValue({
            fieldId: "custentity28",
            value: context.custentity28
        });

        var newRecord = Record.save();

        return newRecord;
    }

    function _put(context) {

    }

    function _delete(context) {

    }

    return {
        get: _get,
        post: _post,
        put: _put,
        delete: _delete
    }

});