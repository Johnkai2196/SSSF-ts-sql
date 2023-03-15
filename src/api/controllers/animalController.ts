// animalController.ts
import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import MessageResponse from '../../interfaces/MessageResponse';
import {
  addAnimal,
  deleteAnimal,
  getAllAnimals,
  getAnimalById,
  updateAnimal,
} from '../models/animalModel';
import {Animal, PostAnimal} from '../../interfaces/Animal';

const animalListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const animals = await getAllAnimals();
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

const animalGet = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const animal = await getAnimalById(req.params.id);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

const animalPost = async (
  req: Request<{}, {}, PostAnimal>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const animal = await addAnimal(req.body);
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

const animalPut = async (
  req: Request<{id: number}, {}, PostAnimal>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const id = await updateAnimal(req.params.id, req.body);
    const message: MessageResponse = {
      message: `Animal with id ${id} updated`,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const animalDelete = async (
  req: Request<{id: number}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors
        .array()
        .map((error) => `${error.msg}: ${error.param}`)
        .join(', ');
      throw new CustomError(messages, 400);
    }

    const id = await deleteAnimal(req.params.id);
    const message: MessageResponse = {
      message: `Animal with id ${id} deleted`,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export {animalListGet, animalGet, animalPost, animalPut, animalDelete};
