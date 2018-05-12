const fs = require("fs");

let args = process.argv.slice(2);

module.exports = {
    add: function () {

        fs.readFile('./dict-store.json', 'utf8', (err, data) => {
            if (data != "") {
                var obj = JSON.parse(data);
            }
            else {
                var obj = {};
            }
            let key = args[1];
            obj[key] = args[3];
            data = JSON.stringify(obj);
            fs.writeFileSync("./dict-store.json", data);
        })
    },

    list: function () {
        fs.readFile("./dict-store.json", "utf8", (err, data) => {
            if (!err && data != "") {
                console.log(data)
            } else {
                console.log(err);
            }
        });
    },

    get: function () {
        fs.readFile("./dict-store.json", "utf8", (err, data) => {
            if (!err && data != "") {
                let key = args[1];
                let obj = JSON.parse(data);
                if (obj[key] != undefined) {
                    console.log("value = " + obj[key]);
                }
                else {
                    console.log("key not found")
                }
            }
            else {
                console.log("the object is empty");
            }
        });
    },

    remove: function () {
        fs.readFile("./dict-store.json", "utf8", (err, data) => {
            if (!err && data != "") {
                let key = args[1];
                let obj = JSON.parse(data);
                if (obj[key] != undefined) {
                    delete obj[key];
                    let newData = JSON.stringify(obj);
                    console.log("new object :" + " " + newData);
                    fs.writeFileSync("./dict-store.json", newData);
                }
                else {
                    console.log("key not found")
                }
            }
            else {
                console.log("the object is empty");
            }
        });
    },

    clear: function () {
        fs.truncate("./dict-store.json", (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("file is cleared");
            }
        });
    }
};
require("make-runnable");

