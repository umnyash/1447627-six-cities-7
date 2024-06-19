import { Expose, Type } from 'class-transformer';
import { CityName, HousingType, AmenityName, Location } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose({ name: 'createdAt' })
  public postDate: string;

  @Expose()
  public city: CityName;

  @Expose()
  public previewPhoto: string;

  @Expose()
  public photos: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: HousingType;

  @Expose()
  public numberOfRooms: number;

  @Expose()
  public numberOfGuests: number;

  @Expose()
  public price: number;

  @Expose()
  public amenities: AmenityName[];

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public location: Location;
}
