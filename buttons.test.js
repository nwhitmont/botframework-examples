var builder = require('botbuilder');
var assert = require('assert');


describe('menuDialog', function() {
    this.timeout(5000);
    // Test case for menu
    it('should present a list of options', function (done) {
        var step = 0;
        var connector = new builder.ConsoleConnector();
        //var bot = universalBot(connector);
        var bot = new builder.UniversalBot(connector);

        bot.dialog('/', [
            (session) => {
                builder.Prompts.choice(session, 'Your choices', ['A', 'B', 'C', 'Exit'], {listStyle: builder.ListStyle.button});

            },
            (session, results) => {
                console.log('selected option: ' + results.response.entity);

                switch (results.response.entity) {
                    case 'A':
                        session.send("You picked A");
                        break;
                    case 'B':
                        session.beginDialog("You picked B");
                        break;
                    case 'C':
                        session.beginDialog("You picked C");
                        break;
                    case 'Exit':
                        session.endDialog("You picked Exit");
                        break;
                    default:
                        session.endDialog("Please chose from available options.");
                        break;
                }
            }
        ]);


        bot.on('send', function (message) {
            switch (++step) {
                case 1:
                    console.log(`Step: ${step}`);
                    assert(message.text == 'Your choices');
                    connector.processMessage('A');
                    done();
                    break;
                case 2:
                    console.log(`Step: ${step}`);
                    assert(message.text == 'You picked A');
                    done();
                    break;
            }
        });
        connector.processMessage('start');
    });   
});
