import { Router } from 'express'
import authController from '../controllers/auth.controller.mjs'

const router = Router()

router.post('/signup', (req, res) => authController.signup_post(req, res))

router.post('/login', (req, res) => authController.login_post(req, res))

export default router
