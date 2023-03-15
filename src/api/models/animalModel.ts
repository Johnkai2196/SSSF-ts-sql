// animalModel.ts
import {ResultSetHeader} from 'mysql2';
import CustomError from '../../classes/CustomError';
import promisePool from '../../database/db';
import {Animal, GetAnimal, PostAnimal} from '../../interfaces/Animal';

const getAllAnimals = async () => {
  const [rows] = await promisePool.execute<GetAnimal[]>(
    `SELECT animal_id, animal_name, birthdate,
    JSON_OBJECT(
      'species_id', species.species_id, 'species_name', species.species_name, 'image', species.image,
      'category', JSON_OBJECT('category_id', categories.category_id, 'category_name', categories.category_name)
    ) AS species
    FROM animals
    JOIN species ON animals.species = species.species_id
    JOIN categories ON species.category = categories.category_id`
  );
  if (rows.length === 0) {
    throw new CustomError('No animals found', 400);
  }
  const animals: Animal[] = rows.map((row) => ({
    ...row,
    species: JSON.parse(row.species),
  }));

  return animals;
};

const getAnimalById = async (id: number) => {
  const [rows] = await promisePool.execute<GetAnimal[]>(
    `SELECT animal_id, animal_name, birthdate,
    JSON_OBJECT(
      'species_id', species.species_id, 'species_name', species.species_name, 'image', species.image,
      'category', JSON_OBJECT('category_id', categories.category_id, 'category_name', categories.category_name)
    ) AS species
    FROM animals
    JOIN species ON animals.species = species.species_id
    JOIN categories ON species.category = categories.category_id
    WHERE animal_id = ?`,
    [id]
  );
  if (rows.length === 0) {
    throw new CustomError('No animal found', 500);
  }
  const animal: Animal = {
    ...rows[0],
    species: JSON.parse(rows[0].species),
  };

  return animal;
};

const addAnimal = async (animal: PostAnimal) => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'INSERT INTO animals (animal_name, species, birthdate) VALUES (?, ?, ?)',
    [animal.animal_name, animal.species, animal.birthdate]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Could not add animal', 500);
  }
  return headers.insertId;
};

const updateAnimal = async (
  id: number,
  animal: PostAnimal
): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'UPDATE animals SET animal_name = ?, species = ? WHERE animal_id = ?',
    [animal.animal_name, animal.species, id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not found', 404);
  }
  return true;
};

const deleteAnimal = async (id: number): Promise<boolean> => {
  const [headers] = await promisePool.execute<ResultSetHeader>(
    'DELETE FROM animals WHERE animal_id = ?',
    [id]
  );
  if (headers.affectedRows === 0) {
    throw new CustomError('Animal not found', 404);
  }
  return true;
};

export {getAllAnimals, getAnimalById, addAnimal, updateAnimal, deleteAnimal};
