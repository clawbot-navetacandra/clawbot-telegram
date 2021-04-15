const rp = require('request-promise');

let handler = {};

handler.function = async function ({ msg, args, sender }) {
    if (args.length < 1) msg.reply('Mana teksnya!!');
    else {
        let domain = process.env.LOCAL_API || 'localhost'
        let req = JSON.parse(await rp.get(`http://${domain}/nulis?teks=${args.join(' ')}&nama=${sender.id}`))

        if (req.status == 'success') {
            msg.replyWithPhoto({source: new Buffer.from(await req.results.data, 'base64')})
        } else {
            msg.reply('Maaf, gambar tidak dapat dikirim. (Kesalahan sistem)')
        }
    }
}

handler.commands = ['nulis'];
handler.tag = 'tool';
handler.help = ['nulis'].map(v => v + ' <teks>')

module.exports = handler