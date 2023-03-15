/* eslint-disable @typescript-eslint/no-loss-of-precision */
import {
  deleteCategory,
  getApiRoot,
  getCategories,
  getCategory,
  postCategory,
  putCategory,
} from './testCategory';
import {Category} from '../src/interfaces/Category';
import MessageResponse from '../src/interfaces/MessageResponse';

// import app from '../src/app';
const app = 'http://localhost:3000';

describe('GET /api/v1', () => {
  // test api root
  it('API root responds with a json message', async () => {
    await getApiRoot(app);
  });

  // test successful category routes

  // TODO:  add test for get all categories
  let categories: Category[];
  it('Should get array of categories', async () => {
    categories = await getCategories(app);
  });

  // TODO: add test for get category by id
  it('Should get a category by id', async () => {
    await getCategory(app, categories[0].category_id);
  });
  // TODO: add test for post category
  let newCategory: MessageResponse;
  it('should post a category', async () => {
    const category_name = 'test category';
    newCategory = await postCategory(app, category_name);
  });
  // TODO: add test for put category
  it('should put a category', async () => {
    const category_name = 'i have change';
    await putCategory(app, newCategory.id || 0, category_name);
  });
  // TODO: add test for delete category
  it('should delete a category', async () => {
    await deleteCategory(app, newCategory.id || 0);
  });

  // test successful species routes
  // TODO: add test for get all species
  // TODO: add test for get species by id
  // TODO: add test for post species
  // TODO: add test for put species
  // TODO: add test for delete species

  // test succesful animal routes
  // TODO: add test for get all animals
  // TODO: add test for get animal by id
  // TODO: add test for post animal
  // TODO: add test for put animal
  // TODO: add test for delete animal

  // test 404 error category routes
  // TODO: add test for get category by id
  // TODO: add test for put category
  // TODO: add test for delete category

  // test 400 error category routes with invalid data
  // TODO: add test for post category
  // TODO: add test for put category
  // TODO: add test for delete category
  // TODO: add test for get category by id

  // test 404 error species routes
  // TODO: add test for get species by id
  // TODO: add test for put species
  // TODO: add test for delete species

  // test 400 error species routes with invalid data
  // TODO: add test for post species
  // TODO: add test for put species
  // TODO: add test for delete species

  // test 404 error animal routes
  // TODO: add test for get animal by id
  // TODO: add test for put animal
  // TODO: add test for delete animal

  // test 400 error animal routes with invalid data
  // TODO: add test for post animal
  // TODO: add test for put animal
  // TODO: add test for delete animal
  // TODO: add test for get animal by id
});
