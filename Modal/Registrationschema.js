const mongoose = require('mongoose');
const express = require('express');

const registration = new mongoose.Schema({
    name:{
        type : String
    },
    email:{
        type : String
    },
    password:{

    },
})