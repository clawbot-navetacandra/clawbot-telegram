function MapCommands(arr) {
    let list = []
    for (let i = 0; i < arr.length; i++) {
        list.push(`│ • ${arr[i]}`)
    }
    return list.join('\n')
}

function ListCommands(prefix, tag = "main") {
    let list = []
    Object.values(global.plugins).filter(v => v.tag === tag).forEach(e => {
        e.help.map(v => list.push(prefix + v))
    });
    return MapCommands(list)
}

let handler = {};

handler.function = async function ({ msg, sender, client, prefix }) {

    let d = new Date();

    let week = d.toLocaleDateString('id', { weekday: 'long' })
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    let time = d.toLocaleTimeString('id').replace(/\./g, ' : ')

    let message = `
╭─「 ${client.botInfo.first_name} 」
│ Hai, ${sender.username ? `@${sender.username}` : sender.full_name}
│
│ Tanggal: ${week}, ${date}
│ Waktu: ${time} ( GMT +00:00 )
│ Prefix: 「 ${global.PREFIX.join(' , ')} 」
╰───────\n
╭─「 Main 」
${ListCommands(prefix)}
╰───────\n
╭─「 Tools 」
${ListCommands(prefix, 'tool')}
╰───────\n
╭─「 Kerang Ajaib 」
${ListCommands(prefix, 'kerang')}
╰───────
    `;
    msg.reply(message)
};

handler.commands = ['help', 'menu', 'start', '?'];
handler.tag = 'main'
handler.help = ['help', 'menu', 'start', '?'];

module.exports = handler