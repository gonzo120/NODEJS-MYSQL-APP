const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');
const { check, validationResult } = require('express-validator');

router.get('/signup', isNotLoggedIn, (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));




// SINGIN
router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    // Utiliza check() para validar los campos
    check('username').notEmpty().withMessage('Username is Required'),
    check('password').notEmpty().withMessage('Password is Required');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash('message', errors.array()[0].msg);
        return res.redirect('/signin');
    }
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
});


// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    // Asegúrate de pasar una función de callback aquí
    req.logout(() => {
      // La función de callback puede incluir redirecciones o respuestas adicionales
      res.redirect('/signin'); // Por ejemplo, redirigir al usuario a la página de inicio
    });
  });
module.exports = router;