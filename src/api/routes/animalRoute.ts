// animalRoute.ts
import express from 'express';
import {param, body} from 'express-validator';
import {
  animalDelete,
  animalGet,
  animalListGet,
  animalPost,
  animalPut,
} from '../controllers/animalController';

const router = express.Router();

router
  .route('/')
  .get(animalListGet)
  .post(
    body('animal_name').notEmpty().isString().escape(),
    body('species').notEmpty().isNumeric(),
    body('birthdate').notEmpty().isString().escape(),
    animalPost
  );

router
  .route('/:id')
  .get(param('id').isNumeric(), animalGet)
  .put(
    param('id').isNumeric(),
    body('animal_name').notEmpty().isString().escape(),
    body('species').notEmpty().isNumeric(),
    body('birthdate').notEmpty().isString().escape(),
    animalPut
  )
  .delete(param('id').isNumeric(), animalDelete);

export default router;
