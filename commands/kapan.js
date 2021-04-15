function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
};

let handler = {};

handler.function = async function ({ msg, cmd, args }) {

    if (args.length >= 1) {
        let _a = `${Math.floor(Math.random() * 10)} ${pickRandom(['detik', 'menit', 'jam', 'hari', 'minggu', 'bulan', 'tahun', 'dekade', 'abad'])} lagi ...`
        let _q = `${cmd} ${args.join(' ')}`;
        msg.reply(`Pertanyaan : ${_q}\nJawaban : ${_a}`)
    } else {
        msg.reply('Mana pertanyaannya _-')
    }

}
handler.commands = ['', 'kah'].map(v => 'kapan' + v)
handler.tag = 'kerang'
handler.help = ['', 'kah'].map(v => 'kapan' + v + ' <pertanyaan>')

module.exports = handler