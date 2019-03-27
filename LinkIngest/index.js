var short = require('short-uuid');
var azure = require('azure-storage');
var entGen = azure.TableUtilities.entityGenerator;

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var tableSvc = azure.createTableService('tablename', 'accesskey');
    var translator = short();    
    
    if ((req.body && req.body.url)) {
        var shortString = translator.new();
        var task = {
            PartitionKey: entGen.String('Links'),
            RowKey: entGen.String(shortString),
            Link: {'url' : req.body.url}
        }

        tableSvc.insertEntity('LinkTable', task, {echoContent : true}, function (error, result, response){
            if (!error){
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: result.Link.url
                };
                
            }
            else {
                context.res = {
                    status: 400,
                    body: error
                };        
                
            }
        });

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};