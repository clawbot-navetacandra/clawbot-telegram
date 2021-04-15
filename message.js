function handler(app) {
    app.on('message', async (msg) => {
        let from = msg.from;
        let usedprefix = msg.message?.text.charAt(0)

        let senderinfo = from.last_name ?
            from.username ? {
                first_name: from.first_name,
                last_name: from.last_name,
                full_name: `${from.first_name} ${from.last_name}`,
                username: from.username,
                id: from.id
            } :
                {
                    first_name: from.first_name,
                    last_name: from.last_name,
                    full_name: `${from.first_name} ${from.last_name}`,
                    id: from.id
                }
            : from.username ?
                {
                    first_name: from.first_name,
                    full_name: from.first_name,
                    username: from.username,
                    id: from.id
                } :
                {
                    first_name: from.first_name,
                    full_name: from.first_name,
                    id: from.id
                };
        let userDb = global.database.data.users
        userDb.filter(v => v === senderinfo.id).length < 1 ? () => {
            userDb.push(senderinfo.id)
            userDb.save()
        } : ''
        if (!global.PREFIX.includes(usedprefix) || from.is_bot) return;
        
        let args = msg.message.text.slice(1).split(/ +/g);
        let command = args.shift()

        if (global.commandsName.includes(command)) {
            console.log(global.database.data.users[senderinfo.id]);
            const cmd = Object.values(global.plugins).filter(v => v.commands.includes(command))[0].function
            await cmd({
                cmd: command,
                args: args,
                sender: senderinfo,
                msg: msg,
                client: app,
                prefix: usedprefix
            })
        }
    });
    let fs = require('fs');
    let filename = require.resolve(__filename)
    fs.watchFile(filename, () => {
        fs.unwatchFile(filename);
        console.log('re - require message.js');
        delete require.cache[filename];
        global.reloadHandler();
    });
};

module.exports = handler