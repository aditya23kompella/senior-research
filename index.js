import express from 'express'
import hbs from 'hbs'

// const express = require('express')
const app = express()

app.set('view engine', 'hbs')
app.use(express.static('static_files'))
app.use('/node_modules', express.static('node_modules'))

app.listen(3000,function(req,res){
    console.log('Server started at 3000')
})