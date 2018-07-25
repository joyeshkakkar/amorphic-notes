const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const sessionStore = new RedisStore();
sessionStore.on('connect', function() {
  require('amorphic').listen(__dirname, sessionStore);
});
