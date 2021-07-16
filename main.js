const { Telegraf } = require('telegraf');
const fs = require('fs');
const path = require('path');
const server = require('./server');

require('./config').config();


(async function () {

    server()

    const app = new Telegraf(process.env.TOKEN);
    app.launch();

    // app.on('message', msg => msg.replyWithPhoto)
    global.reloadHandler = async () => {
        await app.stop()
        await console.log('restarting..');
        await app.launch()
        await require('./message.js')(app)
        console.log('Starting..');
    }

    console.log(Object.keys(global.plugins))

    Object.freeze(global.reload)
    fs.watch(path.join(__dirname, 'commands'), global.reload)

    console.log(global.commandsName);
    require('./message.js')(app);

    console.log('Starting');
    

})();
