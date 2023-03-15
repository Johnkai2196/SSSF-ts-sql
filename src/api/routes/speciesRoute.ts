// speciesRoute.ts
import express from 'express';
import {param, body} from 'express-validator';
import {
  speciesDelete,
  speciesGet,
  speciesListGet,
  speciesPost,
  speciesPut,
} from '../controllers/speciesController';

const router = express.Router();

router
  .route('/')
  .get(speciesListGet)
  .post(body('species_name').notEmpty().isString().escape(), speciesPost);

router
  .route('/:id')
  .get(param('id').isNumeric(), speciesGet)
  .put(
    param('id').isNumeric(),
    body('species_name').notEmpty().isString().escape(),
    speciesPut
  )
  .delete(param('id').isNumeric(), speciesDelete);

export default router;
