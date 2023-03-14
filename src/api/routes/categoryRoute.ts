import express from 'express';
import {param} from 'express-validator';
import {categoryGet, categoryListGet} from '../controllers/categoryController';

const router = express.Router();

router.route('/').get(categoryListGet);

router.route('/:id').get(param('id').isNumeric(), categoryGet);

export default router;
