import { Router } from 'express'
import authController from '../controllers/auth.controller.mjs'

const router = Router()

router.post('/createUser', (req, res) => authController.createUser(req, res))

router.delete('/deleteUser', (req, res) => authController.deleteUser(req, res))

router.get('/user', (req, res) => authController.getUser(req, res))

router.post('/login', (req, res) => authController.login(req, res))

router.get('/logout', (req, res) => authController.logout(req, res))

export default router
