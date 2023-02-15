import express from 'express'
import pkg from 'express-openid-connect'
const { requiresAuth: requiresAuth} = pkg;

export const router = express.Router();

router.get('/', (req, res, next) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  
})

router.get('/profile', (req, res, next) => {
  res.send(JSON.stringify(req.oidc.user));
})

router.get('/testing', (req, res, next) => {
  res.sendFile('/Users/sagepages/Desktop/Projects/Galactus/backend/src/routes/v1/test.html')
})


