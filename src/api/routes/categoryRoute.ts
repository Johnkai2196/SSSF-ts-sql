import express from 'express';
import {param, body} from 'express-validator';
import {
  categoryGet,
  categoryListGet,
  categoryPost,
} from '../controllers/categoryController';

const router = express.Router();

router
  .route('/')
  .get(categoryListGet)
  .post(body('category_name').notEmpty().isString().escape(), categoryPost);

router.route('/:id').get(param('id').isNumeric(), categoryGet);

export default router;
