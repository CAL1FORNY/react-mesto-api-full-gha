const mainRouter = require('express').Router();

const { validateUserAuth, validateUserRegister } = require('../utils/data-validation');
const { createUser, login } = require('../controllers/users');
const authGuard = require('../middlewares/auth');
const cardRouter = require('./cards');
const userRouter = require('./users');
const NotFound = require('../utils/response-errors/NotFound');

mainRouter.post('/signup', validateUserRegister, createUser);
mainRouter.post('/signin', validateUserAuth, login);

mainRouter.use('/cards', authGuard, cardRouter);
mainRouter.use('/users', authGuard, userRouter);

mainRouter.use('*', authGuard, (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
