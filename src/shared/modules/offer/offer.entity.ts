import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
  Ref
} from '@typegoose/typegoose';

import { CityName, HousingType, AmenityName, Location } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title: string;

  @prop({ trim: true, required: true })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({ enum: CityName, required: true })
  public city: CityName;

  @prop({ required: true })
  public previewPhoto: string;

  @prop({ type: () => [String], required: true })
  public photos: string[];

  @prop({ required: true })
  public isPremium: boolean;

  @prop({ required: true })
  public isFavorite: boolean;

  @prop({ required: true })
  public rating: number;

  @prop({ enum: HousingType, required: true })
  public housingType: HousingType;

  @prop({ required: true })
  public numberOfRooms: number;

  @prop({ required: true })
  public numberOfGuests: number;

  @prop({ required: true })
  public price: number;

  @prop({ type: () => [String], default: [] })
  public amenities: AmenityName[];

  @prop({ default: 0 })
  public commentCount: number;

  @prop({ ref: UserEntity, required: true })
  public author: Ref<UserEntity>;

  @prop({ required: true })
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
