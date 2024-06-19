import {
  OFFER_TITLE_MIN_LENGTH, OFFER_TITLE_MAX_LENGTH,
  OFFER_DESCRIPTION_MIN_LENGTH, OFFER_DESCRIPTION_MAX_LENGTH,
  MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS,
  MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS,
  MIN_PRICE, MAX_PRICE,
} from '../../../constants/index.js';

import { CityName, HousingType, AmenityName } from '../../../types/index.js';

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'Title must be a string',
    minLength: `Minimum title length must be ${OFFER_TITLE_MIN_LENGTH}`,
    maxLength: `Maximum title length must be ${OFFER_TITLE_MAX_LENGTH}`,
  },
  description: {
    invalidFormat: 'Description must be a string',
    minLength: `Minimum description length must be ${OFFER_DESCRIPTION_MIN_LENGTH}`,
    maxLength: `Maximum description length must be ${OFFER_DESCRIPTION_MAX_LENGTH}`,
  },
  city: {
    invalid: `City must be ${CityName.Amsterdam}, ${CityName.Brussels}, ${CityName.Cologne}, ${CityName.Dusseldorf}, ${CityName.Hamburg} or ${CityName.Paris}`,
  },
  photoPreview: {
    invalidFormat: 'Photo preview must be an string',
  },
  photos: {
    invalidFormat: 'Photos must be an array',
    itemInvalidFormat: 'Photos must be an array of string',
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
    itemInvalid: `Amenities item must be ${AmenityName.AirConditioning}, ${AmenityName.BabySeat}, ${AmenityName.Breakfast}, ${AmenityName.Fridge}, ${AmenityName.LaptopFriendlyWorkspace}, ${AmenityName.Towels} or ${AmenityName.Washer}`,
  },
  author: {
    invalid: 'Author must be a valid id',
  },
  location: {
    latitude: {
      invalid: 'Latitude must be a valid latitude coordinate',
    },
    longitude: {
      invalid: 'Longitude must be a valid longitude coordinate',
    }
  },
} as const;
