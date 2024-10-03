const express = require('express')
const router = require.Router()
const bcrypt = require('bcrypt')

const User = require('../models/user.js')