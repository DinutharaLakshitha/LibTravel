var mysql = require('mysql');

exports.searchInLib = function (req,callback) {


    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "0779100600",
        database: "superpeer1"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("connected")
        con.query(`SELECT * FROM book where ${req.body.filter} like \'%${req.body.word}%\' `, function (err, result, fields) {
            if (err) throw err;
            setTimeout(() => {
                if (result.length>0) {
                    console.log(result)
                    callback(JSON.stringify({ 3001: "http://www.3001.com" }))
                }
                else {
                    console.log("empty result")
                    callback(JSON.stringify({}));
                }
            }, 1500)
            
        });
    });

}