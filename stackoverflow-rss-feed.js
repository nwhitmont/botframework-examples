
var stackOverflowRss = require('stack-overflow-rss');
 
// get the latest javascript questions 
var consumer = stackOverflowRss({ tag: 'botframework'});
consumer.on('update', function(questions) {
  console.dir(questions);
});
consumer.update();
 
// poll the most voted json and node.js questions feed 
var anotherConsumer = stackOverflowRss({ tags: ['botframework', 'node.js'], sort: 'votes'});
anotherConsumer.on('new', function(newQuestions) {
  console.dir(newQuestions);
});