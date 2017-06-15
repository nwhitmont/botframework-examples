var builder = require('botbuilder');
var restify = require('restify');

//Server setup
var server = restify.createServer();

server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('bot listening at http://localhost:3978/');
});

//Get secrets from server environment
var connector = new builder.ChatConnector({appId: process.env.MICROSOFT_APP_ID, appPassword: process.env.MICROSOFT_APP_PASSWORD});

//Create chat bot
var bot = new builder.UniversalBot(connector);

//Handle bot framework messages
server.post('/api/messages', connector.listen());

bot.dialog('/', [
    function (session) {
        session.send('Choice prompt demo');

        builder
            .Prompts
            .choice(session, "Choose", "m1|m2", {
                listStyle: builder.ListStyle.button
            });
    },
    function (session, results) {
        session.send('You picked:');
        session.endConversation(results.response.entity);
    }
]);

// END OF LINE