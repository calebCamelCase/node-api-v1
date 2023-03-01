/* 
build a server
*/

// 1. import express and create PORT
const express = require('express')
const server = express()
const PORT = 3000 || process.env.PORT

// 3. create a database connection (no, its not out of order)
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sakila'
})

// 5. Root route
// .get(path, callback function)
server.get('/', (req, res )=> { // req==request res==response
    res.json({
        'All Films': `http://localhost:${PORT}/api/film`,
        'All Actors': `http://localhost:${PORT}/api/actor`,
        'All Customers': `http://localhost:${PORT}/api/customer`,
    })
})

// 6. All route
server.get('/api/film', (req, res)=> {
    // run a query
    connection.query(
        // sql query, callback function
        'select * from film;',
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/actor', (req, res)=> {
    connection.query(
        'select * from actor;',
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/customer', (req, res)=> {
    connection.query(
        'select * from customer;',
        (error, rows)=> {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log ('Error', error)
            }
        }
    )
})

// 7. Single route
server.get('/api/film/:id', (req, res) =>{
    const id = req.params.id
    connection.query(
        `select * from film where film_id = ${id}`,
        (error, rows) => {
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log ('Error', error)
            }
        }
    )
})

server.get('/api/actor/:id', (req, res) => {
    const id = req.params.id
    connection.query(
        `select * from actor where actor_id = ${id}`,
        (error, rows) =>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

server.get('/api/customer/:id', (req, res) =>{
    const id = req.params.id
    connection.query(
        `select * from customer where customer_id = ${id}`,
        (error,rows) =>{
            if(!error) {
                if(rows.length === 1) {
                    res.json(...rows)
                } else {
                    res.json(rows)
                }
            } else {
                console.log('Error', error)
            }
        }
    )
})

// 4. connect to database
/* connection.connect((error)=> {
    if(!error) {
        console.log('Database is connected')
    } else {
        console.log('ERROR', error)
    }
})
 */
connection.connect((error)=> {
    !error ? console.log('Database is connected') : console.log('ERROR', error)
})

// 2. listen for PORT
// .listen(PORT, callback function)
server.listen(PORT, ()=> console.log(`Port ${PORT} is talking...`))