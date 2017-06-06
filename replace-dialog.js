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
     session.send('Hello');
     session.dialogData.coupon = true;
     session.send('calling replaceDialog');
     session.replaceDialog('order-pizza', session.dialogData);
});

bot.dialog('order-pizza', function(session, args) {
    session.send('Welcome to order-pizza dialog')
    if(!args.coupon) {
        session.endDialog('Your coupon was not recognized.')
    }
    else {
        session.endDialog('Coupon has been applied to your order!')
    }
})
// END OF LINE
