const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');
const { SUCCESS_CREATED } = require('../utils/response-status');

const NotFound = require('../utils/response-errors/NotFound');
const BadRequests = require('../utils/response-errors/BadRequest');
const Forbidden = require('../utils/response-errors/Forbidden');

const getCardList = (req, res, next) => {
  Card.find({})
    .then((cardList) => res.send(cardList))
    .catch((error) => next(error));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardObject) => res.status(SUCCESS_CREATED).send(cardObject))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequests('Некорректные данные при создании карточки'));
      } else { next(error); }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((selectedCard) => {
      if (!selectedCard) { return next(new NotFound('Карточка по указанному _id не найдена')); }
      if (!selectedCard.owner.equals(req.user._id)) { return next(new Forbidden('Удаление карточки невозможно')); }
      return Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => new NotFound('Карточка по указанному _id не найдена'))
        .then(() => { res.send({ message: 'Карточка удалена с сервера' }); });
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные карточки'));
      } else { next(error); }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send(selectedCard);
      } else { next(new NotFound('Карточка по указанному _id не найдена')); }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные для постановки лайка'));
      } else { next(error); }
    });
};

const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send(selectedCard);
      } else { next(new NotFound('Карточка по указанному _id не найдена')); }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные для снятия лайка'));
      } else { next(error); }
    });
};

module.exports = {
  getCardList, createCard, deleteCard, likeCard, removeLikeCard,
};
