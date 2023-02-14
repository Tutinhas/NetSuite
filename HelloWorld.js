/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 */
 define(['N/ui/dialog'],

        function(dialog) {
            
            function helloWorld(){
            
            var options = {
            title: 'Hello!',
            message: 'Hello, World!'
        };

        try {

            dialog.alert(options);

            log.debug({
                title: 'sucesso!',
                details: 'sem sucesso!'
            });
            
        } catch (error) {
           
            log.error ({
                title: title,
                details: message
            });
        }

    }

        return {
            pageInit: helloWorld
        };
});