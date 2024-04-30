import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  AmenityName, CityName, HousingType, UserType,
  Location, Offer, User,
} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }
  }

  private parseRawDataToOffers(): Offer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): Offer {
    const [
      title,
      description,
      postDate,
      city,
      locationLatitude,
      locationLongitude,
      previewPhoto,
      photos,
      isPremium,
      isFavorite,
      rating,
      housingType,
      numberOfRooms,
      numberOfGuests,
      price,
      amenities,
      userName,
      userEmail,
      userPassword,
      userType,
      userAvatar,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as CityName,
      previewPhoto,
      photos: this.parsePhotos(photos),
      isPremium: isPremium === 'true',
      isFavorite: isFavorite === 'true',
      rating: this.parseRating(rating),
      housingType: housingType as HousingType,
      numberOfRooms: this.parseNumberOfRooms(numberOfRooms),
      numberOfGuests: this.parseNumberOfGuests(numberOfGuests),
      price: this.parsePrice(price),
      amenities: this.parseAmenities(amenities),
      author: this.parseUser(userName, userEmail, userPassword, userType as UserType, userAvatar),
      location: this.parseLocation(locationLatitude, locationLongitude),
    };
  }

  private parsePhotos(photosString: string): string[] {
    return photosString.split(';').map((photo) => photo);
  }

  private parseAmenities(amenitiesString: string): AmenityName[] {
    return amenitiesString.split(';').map((amenity) => amenity as AmenityName);
  }

  private parseUser(
    name: string,
    email: string,
    password: string,
    type: UserType,
    avatar: string = 'default-avatar.png'
  ): User {
    return {
      name,
      email,
      password,
      type,
      avatar,
    };
  }

  private parseNumberOfRooms(numberString: string): number {
    return parseInt(numberString, 10);
  }

  private parseNumberOfGuests(numberString: string): number {
    return parseInt(numberString, 10);
  }

  private parsePrice(priceString: string): number {
    return parseInt(priceString, 10);
  }

  private parseRating(ratingString: string): number {
    return parseFloat(ratingString);
  }

  private parseLocation(latitude: string, longitude: string): Location {
    return {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
