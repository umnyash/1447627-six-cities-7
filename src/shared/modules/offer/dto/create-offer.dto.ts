import { CityName, HousingType, AmenityName, Location } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: CityName;
  public previewPhoto: string;
  public photos: string[];
  public isPremium: boolean;
  public housingType: HousingType;
  public numberOfRooms: number;
  public numberOfGuests: number;
  public price: number;
  public amenities: AmenityName[];
  public author: string;
  public location: Location;
}
