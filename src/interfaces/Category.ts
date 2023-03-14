import {RowDataPacket} from 'mysql2';

interface Category {
  category_id: number;
  category_name: string;
}

interface GetCategory extends RowDataPacket, Category {}

type PostCategory = Omit<Category, 'category_id'>;

export {Category, GetCategory, PostCategory};
