import express from 'express';
import {param, body} from 'express-validator';
import {
  categoryDelete,
  categoryGet,
  categoryListGet,
  categoryPost,
  categoryPut,
} from '../controllers/categoryController';

const router = express.Router();

router
  .route('/')
  .get(categoryListGet)
  .post(body('category_name').notEmpty().isString().escape(), categoryPost);

router
  .route('/:id')
  .get(param('id').isNumeric(), categoryGet)
  .put(
    param('id').isNumeric(),
    body('category_name').notEmpty().isString().escape(),
    categoryPut
  )
  .delete(param('id').isNumeric(), categoryDelete);

export default router;
