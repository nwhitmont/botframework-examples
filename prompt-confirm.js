var builder = require('botbuilder');
var restify = require('restify');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});

//Get secrets from server environment
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Create chat bot
var bot = new builder.UniversalBot(connector);

//Handle bot framework messages
server.post('/api/messages', connector.listen());

bot.dialog('/', [
    function(session){
        if(results.response){
            session.userData.request.name = "";
            builder.Prompts.text(session, "your name?"); 
        }
    }, 
    function(session, results){
        if(results.response){
            session.userData.request.q1 = results.response;
            builder.Prompts.confirm(session, "do you know a1?", {listStyle: builder.ListStyle["button"]}); 
        }
    }, 
    function(session, results){
        if(results.response){
            session.userData.request.q2 = results.response;
            builder.Prompts.confirm(session, "do you know a2?", {listStyle: builder.ListStyle["button"]}); 
        }
    },
    function(session, results){
        if(results.response){
            session.userData.request.q3 = results.response;
            builder.Prompts.confirm(session, "do you know a3?", {listStyle: builder.ListStyle["button"]}); 
        }
    }
]);

// END OF LINE
