function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
};

let handler = {};

handler.function = async function ({ msg, cmd, args }) {
    console.log(args.join(' '));

    if (args.length >= 1) {
        let _a = pickRandom(['Ya', 'Mungkin iya', 'Mungkin', 'Mungkin tidak', 'Tidak', 'Tidak mungkin']);
        let _q = `${cmd} ${args.join(' ')}`;
        msg.reply(`Pertanyaan : ${_q}\nJawaban : ${_a}`)
    } else {
        msg.reply('Mana pertanyaannya _-')
    }

}
handler.commands = ['apakah'];
handler.tag = 'kerang'
handler.help = ['apakah'].map(v => v + ' <pertanyaan>');

module.exports = handler