// interfaces for Species
import {Category} from './Category';
import {RowDataPacket} from 'mysql2';

interface Species {
  species_id: number;
  species_name: string;
  category: Category;
  image: string;
}

interface JsonSpecies {
  species_id: number;
  species_name: string;
  category: string;
  image: string;
}

interface GetSpecies extends RowDataPacket, JsonSpecies {}
type PostSpecies = Omit<Species, 'species_id' | 'image'>;

type PutSpecies = Partial<PostSpecies>;
export {Species, PostSpecies, PutSpecies, GetSpecies};
