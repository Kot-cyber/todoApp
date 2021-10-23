const http = require('http');
const { connectToDB } = require('./connectionToDB')


const server = http.createServer((req, res) => {

    const headers = {
        'Access-Control-Allow-Origin': 'http://localhost:3006',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-type, Accept',
        'Access-Control-Max-Age': 2592000
    };

    switch (req.method) {
        case 'GET':
            let queryString = 'SELECT * FROM todos';
            queryToDB(queryString)
                .then(response => {
                    res.writeHead(200, headers);
                    res.end(JSON.stringify(response));
                });
            break;
        case 'POST':
            req.on('data', chunk => {
                queryToDB(`INSERT INTO todos
                                 VAlUES (DEFAULT, ${chunk.toString()}, DEFAULT)`)
                    .then(() => {
                        queryToDB('SELECT * FROM todos')
                            .then(response => {
                                res.writeHead(200, headers);
                                res.end(JSON.stringify(response))
                            })
                    })
            });
            break;
        case 'PATCH':
            req.on('data', chunk => {
                let element = JSON.parse(chunk);
                queryToDB(`UPDATE todos
                                SET isDone = ${+element.isDone === 0 ? 1 : 0}
                                WHERE  id = ${element.id}`)
                    .then(response => {
                        queryToDB('SELECT * FROM todos')
                            .then(response => {
                                res.writeHead(200, headers);
                                res.end(JSON.stringify(response));
                            })
                    })
            })
            break;
        case 'DELETE':
            let todoId = +req.url.substring(1)
            queryToDB(`DELETE FROM todos
                WHERE id=${todoId}`)
                .then(() => {
                    queryToDB('SELECT * FROM todos')
                        .then(response => {
                            res.writeHead(200, headers);
                            res.end(JSON.stringify(response))
                        })
                })
            break;
        case 'OPTIONS':
            res.writeHead(200, headers);
            res.end('Success');
            break;
    }

    function queryToDB(queryString) {
        return new Promise((resolve, reject) => {
            connection.query(queryString,
                function (err, results) {
                    if (err) {
                        console.log(err.message);
                        res.writeHead(500, headers);
                        res.end(JSON.stringify(err.message));
                        reject(err.message);
                    } else {
                        resolve(results)
                    }
                });
        })
    };


})

const PORT = process.env.PORT || 3000;

server.listen(PORT, console.log(`Server is running on ${PORT}...`));

const connection = connectToDB();

