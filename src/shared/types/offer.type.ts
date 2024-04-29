import { AmenityName } from './amenity-name.enum.js';
import { CityName } from './city-name.enum.js';
import { HousingType } from './housing-type.enum.js';
import { Location } from './location.type.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: CityName;
  previewPhoto: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  numberOfRooms: number;
  numberOfGuests: number;
  price: number;
  amenities: AmenityName[];
  author: User;
  location: Location;
}
