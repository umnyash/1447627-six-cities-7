import { Type } from 'class-transformer';

import {
  IsString,
  IsBoolean,
  IsInt,
  IsUrl,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  Max,
  Min,
  Length,
  ValidateNested
} from 'class-validator';

import { OfferValidationMessage } from './offer-validation.message.js';

import {
  OFFER_TITLE_MIN_LENGTH, OFFER_TITLE_MAX_LENGTH,
  OFFER_DESCRIPTION_MIN_LENGTH, OFFER_DESCRIPTION_MAX_LENGTH,
  MIN_PRICE, MAX_PRICE,
  MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS,
  MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS,
  NUMBER_OF_PHOTOS, MIN_NUMBER_OF_AMENITIES,
} from '../../../constants/index.js';

import { CityName, HousingType, AmenityName } from '../../../types/index.js';

import { LocationDto } from './location.dto.js';

export class CreateOfferDto {
  @IsString({ message: OfferValidationMessage.title.invalidFormat })
  @Length(OFFER_TITLE_MIN_LENGTH, OFFER_TITLE_MAX_LENGTH, { message: OfferValidationMessage.title.length })
  public title: string;

  @IsString({ message: OfferValidationMessage.description.invalidFormat })
  @Length(OFFER_DESCRIPTION_MIN_LENGTH, OFFER_DESCRIPTION_MAX_LENGTH, { message: OfferValidationMessage.description.length })
  public description: string;

  @IsEnum(CityName, { message: OfferValidationMessage.city.invalid })
  public city: CityName;

  @IsUrl({}, { message: OfferValidationMessage.photoPreview.invalid })
  public previewPhoto: string;

  @IsArray({ message: OfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(NUMBER_OF_PHOTOS, { message: OfferValidationMessage.photos.invalidLength })
  @ArrayMaxSize(NUMBER_OF_PHOTOS, { message: OfferValidationMessage.photos.invalidLength })
  @IsUrl({}, { each: true, message: OfferValidationMessage.photos.invalid })
  public photos: string[];

  @IsBoolean({ message: OfferValidationMessage.isPremium.invalidFormat })
  public isPremium: boolean;

  @IsEnum(HousingType, { message: OfferValidationMessage.housingType.invalid })
  public housingType: HousingType;

  @IsInt({ message: OfferValidationMessage.numberOfRooms.invalidFormat })
  @Min(MIN_NUMBER_OF_ROOMS, { message: OfferValidationMessage.numberOfRooms.minValue })
  @Max(MAX_NUMBER_OF_ROOMS, { message: OfferValidationMessage.numberOfRooms.maxValue })
  public numberOfRooms: number;

  @IsInt({ message: OfferValidationMessage.numberOfGuests.invalidFormat })
  @Min(MIN_NUMBER_OF_GUESTS, { message: OfferValidationMessage.numberOfGuests.minValue })
  @Max(MAX_NUMBER_OF_GUESTS, { message: OfferValidationMessage.numberOfGuests.maxValue })
  public numberOfGuests: number;

  @IsInt({ message: OfferValidationMessage.numberOfGuests.invalidFormat })
  @Min(MIN_PRICE, { message: OfferValidationMessage.numberOfGuests.minValue })
  @Max(MAX_PRICE, { message: OfferValidationMessage.numberOfGuests.maxValue })
  public price: number;

  @IsArray({ message: OfferValidationMessage.amenities.invalidFormat })
  @ArrayMinSize(MIN_NUMBER_OF_AMENITIES, { message: OfferValidationMessage.amenities.invalidLength })
  @IsEnum(AmenityName, { each: true, message: OfferValidationMessage.amenities.invalid })
  public amenities: AmenityName[];

  public author: string;

  @ValidateNested({ message: OfferValidationMessage.location.invalidFormat })
  @Type(() => LocationDto)
  public location: LocationDto;
}
