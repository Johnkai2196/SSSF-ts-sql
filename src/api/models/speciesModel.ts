// speciesModel.ts
import promisePool from '../../database/db';
import {
  GetSpecies,
  PostSpecies,
  PutSpecies,
  Species,
} from '../../interfaces/Species';
import CustomError from '../../classes/CustomError';
import {ResultSetHeader} from 'mysql2';

const getAllSpecies = async () => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    `SELECT species_id, species_name, image,
    JSON_OBJECT('category_id', categories.category_id, 'category_name', categories.category_name) AS category
    FROM species
    JOIN categories ON species.category = categories.category_id`
  );
  if (rows.length === 0) {
    throw new CustomError('No species found', 400);
  }
  const species: Species[] = rows.map((row) => ({
    ...row,
    category: JSON.parse(row.category),
  }));
  return species;
};
const getSpeciesById = async (id: number) => {
  const [rows] = await promisePool.execute<GetSpecies[]>(
    `SELECT species_id, species_name, image,
    JSON_OBJECT('category_id', categories.category_id, 'category_name', categories.category_name) AS category
    FROM species
    JOIN categories ON species.category = categories.category_id
    WHERE species_id = ?`,
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError('No species found', 500);
  }
  const species: Species = {
    ...rows[0],
    category: JSON.parse(rows[0].category),
  };
  return species;
};
const addSpecies = async (species: Species) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO species (species_name, category, image) VALUES (?, ?, ?)',
    [species.species_name, species.category, species.image]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Could not add species', 500);
  }
  return headers.insertId;
};
const updateSpecies = async (
  id: number,
  species: PostSpecies
): Promise<boolean> => {
  console.log(species);
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE species SET species_name = ?, category = ? WHERE species_id = ?',
    [species.species_name, species.category, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not found', 404);
  }
  return true;
};
const deleteSpecies = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM species WHERE species_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Species not found', 404);
  }
  return true;
};
export {
  getAllSpecies,
  getSpeciesById,
  addSpecies,
  updateSpecies,
  deleteSpecies,
};
