const path = require('path');
const fs = require('fs');
const syntaxerror = require('syntax-error')

module.exports = {
    config: function () {
        global.database = new (require('./lib/database'))
        global.idling = new (require('./lib/idling'))
    
        global.reload = (event, filename) => {
            if (global.commandsFilter(filename)) {
                let dir = path.join(global.commandsFolder, filename)
                if (dir in require.cache) {
                    delete require.cache[dir]
                    if (fs.existsSync(dir)) {
                        console.info(`re - require plugin '${filename}'`)
                    }
                    else {
                        console.warn(`deleted plugin '${filename}'`)
                        return delete global.plugins[filename]
                    }
                } else console.info(`requiring new plugin '${filename}'`)
                let err = syntaxerror(fs.readFileSync(dir), filename)
                if (err) console.error(`syntax error while loading '${filename}'\n${err}`)
                else try {
                    delete global.plugins[filename]
                    global.plugins[filename] = require(dir)
                } catch (e) {
                    console.error(e)
                }
            }
        }

        global.commandsFolder = path.join(__dirname, 'commands')
        global.commandsFilter = filename => /\.js$/.test(filename)
        global.plugins = {}
        for (let filename of fs.readdirSync(global.commandsFolder).filter(global.commandsFilter)) {
            try {
                global.plugins[filename.replace(/\.js/g, '')] = require(path.join(global.commandsFolder, filename))
            } catch (e) {
                console.error(e)
                delete global.plugins[filename]
            }
        };
        global.commandsName = [];
        Object.values(global.plugins).forEach(v => v.commands.forEach(c => global.commandsName.push(c)));
        global.PREFIX = ['/', '!', '#'];
        let filename = require.resolve(__filename)
        fs.watchFile(filename, () => {
            fs.unwatchFile(filename);
            console.log('re - require config.js');
            delete require.cache[filename];
            require(filename).config();
            let err = syntaxerror(fs.readFileSync(filename), filename)
            
            if (err) console.error(`syntax error while loading 'message.js'\n${err}`)
        })
    }
}
