import {Request, Response, NextFunction} from 'express';
import {getAllCategories, getCategoryById} from '../models/categoryModel';

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
    const category = await getCategoryById(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};
export {categoryListGet, categoryGet};
