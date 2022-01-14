const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgresuser',
  host: 'postgres',
  database: 'express',
  password: 'pwd123',
  port: 5432,
})

//curl -kv http://localhost:8080/customers
app.get('/customers', (req, res) => {

    pool.query('select * from customers', function (err, result) {
        if (err) throw err
        res.send(result.rows)
    })
})

//curl -kv http://localhost:8080/customers/1
app.get('/customers/:id', (req, res) => {

    pool.query(`select * from customers where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result.rows)
    })
})

//curl -kv -XDELETE http://localhost:8080/customers/1
app.delete('/customers/:id', (req, res) => {

    pool.query(`delete from customers where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

//curl -kv -XPUT -H 'Content-Type: application/json; charset=UTF-8' -d '{"id":2,"name":"beril talin guldibi"}' http://localhost:8080/customers/2
app.put('/customers/:id', (req, res) => {

    pool.query(`update customers set name='${req.body.name}' where id=${req.params.id}`, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

//curl -kv -XPOST -H 'Content-Type: application/json; charset=UTF-8' -d '{"id":2,"name":"beril talin güldibi"}' http://localhost:8080/customers
app.post('/customers', (req, res) => {

    pool.query('insert into customers(id,name) values($1, $2)', [req.body.id, req.body.name], function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.listen(8080, () => console.log('Server ready'))