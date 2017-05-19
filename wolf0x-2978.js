var builder = require("botbuilder");
var restify = require('restify');
//require('dotenv-extended').load();

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    function (session) {
        session.beginDialog('phonePrompt');
    },
    function (session, results) {
        session.send('Got it... Setting number to %s', results.response);
    }
]);
bot.dialog('phonePrompt', [
    function (session, args, next) {
        //session.dialogData.profile = args ? args : {};
        if(args){
            session.userData.profile = args;
            console.log(session.userData.profile);
            next();
        }
        else{
            session.userData.profile = {};
            session.userData.profile.name = '';
            session.userData.profile.coding = '';
            session.userData.profile.language = '';
            builder.Prompts.text(session, "Hello... What's your name?");
        }
    },
    function (session, results) {
        if(session.userData.profile.name==''){
            session.userData.profile.name = results.response;
        }
        console.log(session.userData.profile);
        builder.Prompts.text(session, "Hi " + session.userData.profile.name + ", How many years have you been coding?");         
    },
    function (session, results) {        
        if (results.response.length == 10 || results.response.length == 11) {
            session.userData.profile.coding = results.response;
            builder.Prompts.text(session, "What language do you code Node using?");
        } else {
            session.replaceDialog('phonePrompt',session.userData);
        }        
    },
    function (session, results) {
        session.userData.profile.language = results.response;
        session.send("Got it... " + session.userData.profile.name + 
                     " you've been programming for " + session.userData.profile.coding + 
                     " years and use " + session.userData.profile.language + ".");
    }
]);

