import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import {
  getAllCategories,
  getCategoryById,
  addCategory,
} from '../models/categoryModel';
import CustomError from '../../classes/CustomError';
import MessageResponse from '../../interfaces/MessageResponse';
import {Category, PostCategory} from '../../interfaces/Category';
const categoryListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};
const categoryGet = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(message, 400);
    }
    const category = await getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const categoryPost = async (
  req: Request<{}, {}, PostCategory>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      const message = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(message, 400);
    }
    const category = await addCategory(req.body);
    const message: MessageResponse = {
      message: `Category ${category} added`,
      id: category,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};
export {categoryListGet, categoryGet, categoryPost};
