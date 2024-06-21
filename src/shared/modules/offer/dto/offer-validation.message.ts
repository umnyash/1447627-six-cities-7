import {
  OFFER_TITLE_MIN_LENGTH, OFFER_TITLE_MAX_LENGTH,
  OFFER_DESCRIPTION_MIN_LENGTH, OFFER_DESCRIPTION_MAX_LENGTH,
  MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS,
  MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS,
  MIN_PRICE, MAX_PRICE,
} from '../../../constants/index.js';

import { CityName, HousingType, AmenityName } from '../../../types/index.js';

export const OfferValidationMessage = {
  title: {
    invalidFormat: 'Title must be a string',
    length: `Min length is ${OFFER_TITLE_MIN_LENGTH}, max is ${OFFER_TITLE_MAX_LENGTH}`,
  },
  description: {
    invalidFormat: 'Description must be a string',
    length: `Min length is ${OFFER_DESCRIPTION_MIN_LENGTH}, max is ${OFFER_DESCRIPTION_MAX_LENGTH}`,
  },
  city: {
    invalid: `City must be ${CityName.Amsterdam}, ${CityName.Brussels}, ${CityName.Cologne}, ${CityName.Dusseldorf}, ${CityName.Hamburg} or ${CityName.Paris}`,
  },
  photoPreview: {
    invalid: 'Photo preview must be an url',
  },
  photos: {
    invalidFormat: 'Photos must be an array',
    invalid: 'Each array element must be a valid URL',
    invalidLength: 'The array must contain exactly 6 elements',
  },
  isPremium: {
    invalidFormat: 'IsPremium must be a boolean',
  },
  housingType: {
    invalid: `Housing type must be ${HousingType.Apartment}, ${HousingType.Hotel}, ${HousingType.House} or ${HousingType.Room}`,
  },
  numberOfRooms: {
    invalidFormat: 'Number of rooms must be an integer',
    minValue: `Minimum price is ${MIN_NUMBER_OF_ROOMS}`,
    maxValue: `Maximum price is ${MAX_NUMBER_OF_ROOMS}`,
  },
  numberOfGuests: {
    invalidFormat: 'Number of guests must be an integer',
    minValue: `Minimum price is ${MIN_NUMBER_OF_GUESTS}`,
    maxValue: `Maximum price is ${MAX_NUMBER_OF_GUESTS}`,
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: `Minimum price is ${MIN_PRICE}`,
    maxValue: `Maximum price is ${MAX_PRICE}`,
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array',
    invalidLength: 'The array must contain at least one element.',
    invalid: `Amenities item must be ${AmenityName.AirConditioning}, ${AmenityName.BabySeat}, ${AmenityName.Breakfast}, ${AmenityName.Fridge}, ${AmenityName.LaptopFriendlyWorkspace}, ${AmenityName.Towels} or ${AmenityName.Washer}`,
  },
  author: {
    invalid: 'Author must be a valid id',
  },
  location: {
    invalidFormat: 'Location must be an object with latitude and longitude properties'
  },
} as const;
