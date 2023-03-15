// speciesController.ts
import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import CustomError from '../../classes/CustomError';
import MessageResponse from '../../interfaces/MessageResponse';
import {
  addSpecies,
  deleteSpecies,
  getAllSpecies,
  getSpeciesById,
  updateSpecies,
} from '../models/speciesModel';
import {Species, PostSpecies} from '../../interfaces/Species';

const speciesListGet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const species = await getAllSpecies();
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesGet = async (
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

    const species = await getSpeciesById(req.params.id);
    res.json(species);
  } catch (error) {
    next(error);
  }
};

const speciesPost = async (
  req: Request<{}, {}, Species>,
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

    const id = await addSpecies(req.body);
    const message: MessageResponse = {
      message: `Species with id ${id} added`,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const speciesPut = async (
  req: Request<{id: number}, {}, PostSpecies>,
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

    const id = await updateSpecies(req.params.id, req.body);
    const message: MessageResponse = {
      message: `Species with id ${id} updated`,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

const speciesDelete = async (
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

    const id = await deleteSpecies(req.params.id);
    const message: MessageResponse = {
      message: `Species with id ${id} deleted`,
    };
    res.json(message);
  } catch (error) {
    next(error);
  }
};

export {speciesListGet, speciesGet, speciesPost, speciesPut, speciesDelete};
