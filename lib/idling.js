const rp = require('request-promise');

class handleIdling {
    constructor(interval = 30000) {
        setInterval(async () => {
            try {
                await rp(`http://${process.env.LOCAL_API}/anti-idling`)
            } catch (e) {
                return
            }
        }, interval);
    }
}

module.exports = handleIdling
