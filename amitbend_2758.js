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
var customLibrary = require('./library1');


//Handle bot framework messages
server.post('/api/messages', connector.listen());


bot.dialog('/',function(session) {
     let msg = new builder.Message(session)
        .text(["main dialog"])
        .addAttachment(
            new builder
                .HeroCard(session)
                .buttons([
                    builder.CardAction.imBack(session, "action?library:dialog", "Start library:dialog")
                ])
        );
    session.send(msg);
    
    customLibrary.startSimpleDialog(session);
});

// add library to bot
bot.library(customLibrary.createLibrary());

// END OF LINE
