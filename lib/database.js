const fs = require('fs');
const path = require('path');

let databaseLoc = path.join(process.cwd(), 'database.json');

class _staticFunction {
    constructor() {
        if (!fs.existsSync(databaseLoc)) {
            fs.writeFileSync(databaseLoc, JSON.stringify({
                users: {}
            }));
        }

        this._data = JSON.parse(fs.readFileSync(databaseLoc))
        let _dataLen = this.data.users.length
        let intervalLen = 0
        setInterval(() => {
            intervalLen = this._data.users.length
            if (intervalLen !== _dataLen) {
                this.save()
            }
        }, 10);
    }

    get data() {
        return this._data
    }

    add(path, data) {
        this._data[path] = data
        this.save()
    }

    save() {
        fs.writeFileSync(databaseLoc, JSON.stringify(this._data))
        console.log('Saving Database..');
        this._data = JSON.parse(fs.readFileSync(databaseLoc))
    }
}


module.exports = _staticFunction