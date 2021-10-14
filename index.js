const http = require('http');
const greet = require('./grereting.js');
const mysql = require('mysql2');

http.createServer((req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, DELETE, PUT',
        'Access-Control-Max-Age': 2592000
    };

    if (req.method === 'GET' && req.url === '/getAll') {

        new Promise((resolve, reject) => {
            connection.query(
                'SELECT * FROM todos',
                function (err, results) {
                    if (err) {
                        console.log(err.message)
                        reject(err.message)
                    } else {
                        resolve(results)
                    }
                });

        }).then(response => {
                res.writeHead(200, headers);
                res.end(JSON.stringify(response));
            }
        )
    }

    if (req.method === 'GET' && req.url === '/hello') {
        res.writeHead(200, headers);
        res.end('Hello from node js url === /hello');
    }

    if (req.method === 'POST' && req.url === '/addNewTodo') {

        req.on('data', chunk => {
            new Promise((resolve, reject) => {
                connection.query(
                    `INSERT INTO todos 
                     VAlUES (DEFAULT, ${chunk.toString()}, DEFAULT)`,
                    function (err, results) {
                        if (err) {
                            console.log(err.message)
                        } else {
                            resolve()
                        }
                    });
            }).then(() => {
                new Promise((resolve, reject) => {
                    connection.query(
                        'SELECT * FROM todos',
                        function (err, results) {
                            if (err) {
                                console.log(err.message)
                                reject(err.message)
                            } else {
                                resolve(results)
                            }
                        })

                }).then(response => {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(response))
                })
            })
        });
    }

    if (req.method === 'DELETE' && req.url === '/delete') {
        console.log('asdkjhflakdsj')
        res.writeHead(200, headers)
        res.end('sdfadsf')
        //         new Promise((resolve, reject) => {
        //             connection.query(
        //                 `DELETE FROM todos
        //                     WHERE id=${chunk}`,
        //                 function (err, results) {
        //                     if (err) {
        //                         console.log(err.message)
        //                         res.end(`Something goes wrong... ${err.message}`)
        //                         reject(err.message)
        //                     } else {
        //                         resolve()
        //                     }
        //                 })
        //         }).then(response => {
        //             new Promise((resolve, reject) => {
        //                 connection.query(
        //                     'SELECT * FROM todos',
        //                     function (err, results) {
        //                         if (err) {
        //                             console.log(err.message)
        //                             res.end(`Something goes wrong... ${err.message}`)
        //                             reject(err.message)
        //                         } else {
        //                             resolve(results)
        //                         }
        //                     })
        //
        //             }).then(response => {
        //                 res.writeHead(200, headers);
        //                 res.end(JSON.stringify(response))
        //             })
        //         })
        //     }
        // )
    }

}).listen(3000);


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root'
});

connection.connect(function (err) {
    if (err) {
        return console.error('Error: ' + err.message);
    } else {
        console.log('MYSQL connected!');
    }
});

console.log('asd');
greet.greetings('anton');
greet.bye('anton');

connection.query('CREATE DATABASE IF NOT EXISTS todos',
    function (err, results) {
        if (err) console.log(err);
        else console.log('DataBase was created');
    });

connection.query('USE todos', function (err, results) {
    if (err) {
        console.log(err.message)
    } else {
        console.log('Database was selected...')
    }
});

connection.query('CREATE TABLE IF NOT EXISTS todos(\n' +
    'id INT PRIMARY KEY AUTO_INCREMENT,\n' +
    'todos_name VARCHAR(255) NOT NULL,\n' +
    'isDone CHAR(1) NOT NULL DEFAULT("0")\n' +
    ')',
    function (err, results) {
        if (err) console.log(err);
        else console.log('Table was created');
    });


new Promise((resolve, reject) => {
    connection.query(
        'SELECT * FROM todos WHERE id = 3',
        function (err, results) {
            if (err) {
                console.log(err.message);
            } else {
                resolve(results);
            }
        });

}).then(response => console.log(response));
