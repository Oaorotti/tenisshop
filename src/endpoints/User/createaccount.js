import express from 'express'
import bcrypt from 'bcrypt'
import User from '../../database/Schemas/UserSchema'

const router = express.Router()

router.post('/register', (req, res) => {
	const { username, password, email } = req.body

	const Users = new User()

	if (!username) {
		res.status(400).json({
			message: 'You must specify a username!',
		})
		return
	}
	if (!email) {
		res.status(400).json({
			message: 'You must specify a email!',
		})
		return
	}
	if (!password) {
		res.status(400).json({
			message: 'You must specify a password!',
		})
		return
	}

	User.find({
		username: username,
	}).exec(function (err, docs) {
		if (docs.length > 0) {
			return res.status(409).send({
				message: 'User already exists.',
			})
		} else {
			bcrypt.hash(password, 10, function (err, hash) {
				try {
					Users.username = username
					Users.password = hash.toString()
					Users.email = email
					Users.save()

					console.log(`User ${username} created on DB! 🦧`)

					return res.status(201).send({
						message: 'User created on database',
					})
				} catch (error) {
					console.log(`Error while hashing, error ${error}`)
					return res.status(400).send({
						message: 'Error while hashing',
					})
				}
			})
		}
	})
})

export default router
