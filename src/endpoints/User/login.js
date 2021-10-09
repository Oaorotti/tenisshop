import express from 'express'
import User from '../../database/Schemas/UserSchema'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const router = express.Router()

router.post('/login', async (req, res) => {
	const { username, password, email } = req.body

	if (!username) {
		res.status(400).send({
			message: 'you need to specify a username',
		})
		return
	}
	if (!password) {
		res.status(400).send({
			message: 'you need to specify a password',
		})
		return
	}
	if (!email) {
		res.status(400).send({
			message: 'you need to specify a email',
		})
		return
	}

	const user = await User.findOne({ username: `${username}` })

	if (!user) {
		return res.status(404).json({
			message: 'User not found on DB!',
		})
	}

	const userID = user._id
	const userPasswordHash = user.password

	let token = null

	bcrypt.compare(password, userPasswordHash).then(async (result) => {
		if (result) {
			token = await jwt.sign({ id: userID }, config.JWT_SECRET, {
				expiresIn: '24h',
			})
			res.json({
				token: token,
			})

			console.log(`User ${username} authenticated`)
		} else {
			res.status(403).json({ message: 'Wrong credentials' })
		}
	})
})

export default router
