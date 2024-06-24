import { OfferValidationMessage } from './offer-validation.message.js';
import { IsLatitude, IsLongitude } from 'class-validator';

export class LocationDto {
  @IsLatitude({ message: OfferValidationMessage.location.invalidLatitude })
  public latitude: number;

  @IsLongitude({ message: OfferValidationMessage.location.invalidLongitude })
  public longitude: number;
}
