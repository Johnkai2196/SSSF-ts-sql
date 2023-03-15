import promisePool from '../../database/db';
import {Category, GetCategory, PostCategory} from '../../interfaces/Category';
import {ResultSetHeader} from 'mysql2';
import CustomError from '../../classes/CustomError';
import {categoryListGet} from '../controllers/categoryController';

const getAllCategories = async () => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories'
  );
  if (rows.length === 0) {
    throw new CustomError('No categories found', 400);
  }
  return rows as Category[];
};

const getCategoryById = async (id: number) => {
  const [rows] = await promisePool.execute<GetCategory[]>(
    'SELECT * FROM categories WHERE category_id = ?',
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError('No category found', 500);
  }
  return rows[0] as Category;
};

const addCategory = async (category: PostCategory) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO categories (category_name) VALUES (?)',
    [category.category_name]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Could not add category', 500);
  }
  return headers.insertId;
};

const updateCategory = async (
  id: number,
  category: PostCategory
): Promise<boolean> => {
  console.log(category);
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE categories SET category_name = ? WHERE category_id = ?',
    [category.category_name, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not found', 404);
  }
  return true;
};

const deleteCategory = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM categories WHERE category_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Category not found', 404);
  }
  return true;
};

export {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
