var mysql = require('mysql');

exports.searchInLib = function (req, callback) {


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0779100600",
        database: "peer1"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected")
        con.query(`SELECT * FROM book where ${req.body.filter} like \'%${req.body.word}%\' `, function (err, result, fields) {
            if (err) throw err;
            setTimeout(() => {
                if (result.length>0) {
                    console.log(result)
                    callback(JSON.stringify({ 3002: "http://www.3002.com" }))
                }
                else {
                    callback(JSON.stringify({}));
                }
            }, 1500)

        });
    });

}
