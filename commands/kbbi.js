const rp = require('request-promise');
const cheerio = require('cheerio');

let handler = {};

handler.function = async function ({msg, args}) {
    if (args.length >= 1) {
        try {
            let url = `https://kbbi.kemdikbud.go.id/entri/${args.join(' ')}`;
            const html = cheerio.load(await rp(url))('div[class="container body-content"]').html();
            const _ = cheerio.load(html);
            let existRes = _('ol').html() ? true : false;
            let existRes1 = _('ul[class="adjusted-par"]').html() ? true : false;
            if (existRes || existRes1) {
                let fullTitle = _('h2').text()
                let title = fullTitle.includes(' » ')
                    ? fullTitle.split(' » ')[1]
                    : fullTitle
                let arti = [];
                let root = existRes ? 'ol' : 'ul[class="adjusted-par"]'
                _(root).find('font[color="red"]').remove().html();
    
                _(`${root} > li`).each((i, el) => {
                    return arti.push(_(el).text())
                });
            
                let data_arti = arti.length > 1 ? arti.map(v => '- ' + v).join('\n') : arti.join('')
    
                msg.reply(`${title}\n\nArti :\n${data_arti}`)
            } else {
                msg.reply(`Arti "${args.join(' ')}" tidak ditemukan.`)
            }
        } catch (err) {
            msg.reply(err)
        }
    } else {
        msg.reply('Mana kata yang mau dicari _-')
    }
}
handler.commands = ['kbbi']
handler.tag = 'tool'
handler.help = ['kbbi'].map(v => v + ' <kata>')

module.exports = handler