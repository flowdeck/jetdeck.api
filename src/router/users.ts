import express from 'express'
import { getAllUsers, deleteUser } from '../controllers/users'
import { isAuthenticated } from '../middleware'

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers)
  router.delete('/user/:id', isAuthenticated, deleteUser)
}
