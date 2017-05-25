var builder = require('botbuilder');
var restify = require('restify');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

//Get secrets from server environment
var connector = new builder.ChatConnector({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});

//Create chat bot
var bot = new builder.UniversalBot(connector);

//Handle bot framework messages
server.post('/api/messages', connector.listen());

bot.dialog('/', function (session) {
    session.send('Hello');

    session.beginDialog('menu');
});

// END OF LINE

bot.dialog('menu', [
    (session) => {
        builder
            .Prompts
            .choice(session, 'Your choices', [
                'A', 'B', 'C', 'Exit'
            ], {listStyle: builder.ListStyle.button});

    },
    (session, results) => {
        let input = _.get(results, 'response.entity', null) || _.get(session, 'message.text', null);
        switch (input) {
            default:
                session.endDialog("Please chose from available options.");
                break;
            case 'A':
                session.send("You chose A");
                break;
            case 'B':
                session.beginDialog("You chose B");
                break;
            case 'C':
                session.beginDialog("You chose C");
                break;
            case 'Exit':
                session.endDialog("Thanks for using menu!");
                break;
        }
    }
]).triggerAction({matches: /^(menu)$/i});

// END OF LINE
