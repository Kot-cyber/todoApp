const mysql = require('mysql2');

exports.connectToDB = () => {
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

    connection.query(
        `CREATE TABLE IF NOT EXISTS todos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    todos_name VARCHAR(255) NOT NULL,
    isDone CHAR(1) NOT NULL DEFAULT("0")
    )`,
        function (err, results) {
            if (err) console.log(err);
            else console.log('Table was created');
        });

    return connection;
}
