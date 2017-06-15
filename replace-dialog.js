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

bot.dialog('/',function(session) {
     session.send('Starting replaceDialog example...');
     // set some value in dialogData
     session.dialogData.coupon = true;
     session.send('calling replaceDialog');
     // pass in dialogData to replaceDialog
     session.replaceDialog('second-dialog', session.dialogData);
});

bot.dialog('second-dialog', function(session, args) {
    // what did we get from previous replaceDialog call?
    console.log('\ngot args from replaceDialog:');
    console.log(args);
    session.send('Welcome to second-dialog');
    if(!args.coupon) {
        // we didn't get the args from previous dialog
        session.endDialog('args not present');
    }
    else {
        // args arrived OK from previous dialog
        session.endDialog('args found OK');
    }
})

// END OF LINE
