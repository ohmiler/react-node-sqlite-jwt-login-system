const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3001
const JWT_SECRET = process.env.JWT_SECRET

app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message)
    }
    console.log('Connected to the SQLite Database.')
})

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`)

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user
        next()
    })
}

// Protected Dashboard Route
app.get('/api/dashboard', verifyToken, (req, res) => {
    const username = req.user.username

    res.json({ message: `Welcome to your dashboard, ${username}` })
})

// API Endpoints

// Register Endpoint
app.post('/register', async(req, res) => {
    const { username, password } = req.body 

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`

    db.run(sql, [username, hashedPassword], function(err) {
        if (err) {
            if (err.errno === 19) {
                return res.status(409).json({ message: 'Username already exists'})
            }
            return res.status(500).json({ message: 'Database error' })
        }

        res.status(201).json({ message: 'User registered succesfully', userId: this.lastID })
    })

})

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body
    const sql = `SELECT * FROM users WHERE username = ?`

    db.get(sql, [username], async(err, user) => {
        if (err) {
            return res.status(500).json({ message: 'Server error'})
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h'})
        res.json({ message: 'Login successfully', token })
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})