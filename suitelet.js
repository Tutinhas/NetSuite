/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 define(['N/ui/serverWidget', 'N/search', 'N/log'], function (UI, search, log) {
  function onRequest(context) {

    const form = UI.createForm({                        
      title: "LRC @ Ref Cliente"                              //Criação do formulário LRC @ Ref Cliente;
    });

    form.addField({
      id: "custpage_rsc_cliente",
      label: "cliente",                                     //Inserindo dados do cliente, Id, tipo;
      type: UI.FieldType.SELECT,
      source: "customer"
    });

    form.addField({
      id: "custpage_rsc_subsidiaria_principal",
      label: "subsidiaria_principal",                     //Inserindo dados da subsidiária, id, tipo;
      type: UI.FieldType.SELECT,
      source: "subsidiary"
    });

    form.addButton({
      id: "custpage_rsc_button",
      label: "Enviar",                                  //Criação do botão;
      functionName: "enviar"
    });

    form.clientScriptModulePath = "./clientscript.js"; //Passa para o Suitelet qual o arquivo de ClientScript ele irá chamar;
    context.response.writePage(form);
    
  }

  return {
    onRequest: onRequest
  };

});