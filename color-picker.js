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

var colorOptions = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'white',
    'black',
    'grey',
    'pink',
    'purple'
];

bot.dialog('pick1color', [
    function (session) {
        session.userData.ballColors = [];
        builder.Prompts.choice(session, 'Pick your 1st color:', colorOptions)
    },
    function (session, results) {
        session.logger.log(results.response);
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.endDialog(`You picked: ${selectedColor}`);

    }
]);

bot.dialog('pick2colors', [
    function (session) {
        session.userData.ballColors = [];
        builder.Prompts.choice(session, 'Pick your 1st color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 2nd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You have selected the following ball colors: ${session.userData.ballColors}`);
        session.endDialog();
    }
]);

bot.dialog('pick3colors', [
    function (session) {
        session.userData.ballColors = [];
        builder.Prompts.choice(session, 'Pick your 1st color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 2nd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 3rd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);

        session.endDialog(`You have selected the following ball colors: ${session.userData.ballColors}`)
    }
]);

bot.dialog('pick4colors', [
    function (session) {
        session.userData.ballColors = [];
        builder.Prompts.choice(session, 'Pick your 1st color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 2nd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 3rd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 4th color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);

        session.endDialog(`You have selected the following ball colors: ${session.userData.ballColors}`)
    }
]);

bot.dialog('pick5colors', [
    function (session) {
        session.userData.ballColors = [];
        builder.Prompts.choice(session, 'Pick your 1st color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 2nd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 3rd color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 4th color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);
        session.send(`You picked: ${selectedColor}`);

        builder.Prompts.choice(session, 'Pick your 5th color:', colorOptions)
    },
    function (session, results) {
        var selectedColor = results.response.entity;
        // save color to userData
        session.userData.ballColors.push(selectedColor);

        session.endDialog(`You have selected the following ball colors: ${session.userData.ballColors}`)
    }
]);

bot.dialog('/', [
    function (session) {
        session.send('Hello');
        session.send('Welcome to golf ball color picker demo');
        builder
            .Prompts
            .number(session, 'Enter the number of balls for your basket (1-5):');
    },
    function (session, results) {
        session.send(`You picked: ${results.response} ball(s)`);
        switch (results.response) {
            case 1:
                session.send('case 1');
                session.beginDialog("pick1color");
                break;
            case 2:
                session.beginDialog('pick2colors');
                break;
            case 3:
                session.beginDialog('pick3colors');
                break;
            case 4:
                session.beginDialog('pick4colors');
                break;
            case 5:
                session.beginDialog('pick5colors');
                break;
            default:
                session.beginDialog('pick1color');
                break;
        }
    }
]);

// END OF LINE
