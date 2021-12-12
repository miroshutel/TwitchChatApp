const PORT = 8000
const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const { v1: uuidv1 } = require('uuid')
const { connect } = require('getstream')
const StreamChat = require('stream-chat').StreamChat
app.use(cors())
app.use(express.json())
const dotenv = require('dotenv')

dotenv.config()
app.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body

        const userId = uuidv1()
        const hashedPassword = await bcrypt.hash(password, 10)
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const token = client.createUserToken(userId)
        res.status(200).json({ username, userId, hashedPassword, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const client = connect(process.env.API_KEY, process.env.API_SECRET, process.env.APP_ID)
        const chatClient = StreamChat.getInstance(process.env.API_KEY, process.env.API_SECRET)
        const { users } = await chatClient.queryUsers({ name: username })
        if (!users.length > 0) return res.status(404).json({ message: 'User not found' })

        const success = await bcrypt.compare(password, users[0].hashedPassword)
        const userId = users[0].id
        const token = client.createUserToken(userId)
        const confirmedName = users[0].name
        const hashedPassword = users[0].hashedPassword
        if (success) {
            res.status(200).json({ token, username: confirmedName, userId, hashedPassword })
        } else {
            res.status(500).json({ message: 'Login failed' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
})
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })