
var azure = require('azure-storage');

module.exports =  async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.u) {
        var tableSvc = azure.createTableService('tablename', 'accesskey');
        tableSvc.retrieveEntity('LinkTable', 'Links', req.query.u, function(error, result, response){
            if (!error){             
                context.res.status(302).set('location', result.Link.url).send();                
            }
            else{
                context.res = {
                    status: 400,
                    body: "Please pass a valid shortened url"
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