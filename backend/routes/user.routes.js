const express = require('express')
const router = express.Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
 const authHeader = req.headers['authorization']
 const token = authHeader && authHeader.split(' ')[1]

 if (!token) {
  return res.status(401).json({ message: 'Access denied' })
 }

 try {
  const verified = jwt.verify(token, process.env.JWT_SECRET)
  req.user = verified
  next()
 } catch (error) {
  res.status(403).json({ message: 'Invalid token' })
 }
}

// Get all users
router.get('/', authenticateToken, async (req, res) => {
 try {
  const users = await User.findAll({
   attributes: ['id', 'username', 'email'],
  })
  res.json(users)
 } catch (error) {
  res
   .status(500)
   .json({ message: 'Error fetching users', error: error.message })
 }
})

// Get user by ID
router.get('/:id', authenticateToken, async (req, res) => {
 try {
  const user = await User.findByPk(req.params.id, {
   attributes: ['id', 'username', 'email'],
  })
  if (!user) {
   return res.status(404).json({ message: 'User not found' })
  }
  res.json(user)
 } catch (error) {
  res.status(500).json({ message: 'Error fetching user', error: error.message })
 }
})

// Update user
router.put('/:id', authenticateToken, async (req, res) => {
 try {
  const { username, email } = req.body
  const user = await User.findByPk(req.params.id)

  if (!user) {
   return res.status(404).json({ message: 'User not found' })
  }

  await user.update({
   username,
   email,
  })

  res.json({ message: 'User updated successfully' })
 } catch (error) {
  res.status(500).json({ message: 'Error updating user', error: error.message })
 }
})

// Delete user
router.delete('/:id', authenticateToken, async (req, res) => {
 try {
  const user = await User.findByPk(req.params.id)

  if (!user) {
   return res.status(404).json({ message: 'User not found' })
  }

  await user.destroy()
  res.json({ message: 'User deleted successfully' })
 } catch (error) {
  res.status(500).json({ message: 'Error deleting user', error: error.message })
 }
})

module.exports = router
