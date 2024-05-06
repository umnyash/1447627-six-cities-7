import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  AmenityName, CityName, HousingType, UserType,
  Location, Offer, User,
  FileReaderEvent,
} from '../../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();
      nextLinePosition = remainingData.indexOf('\n');

      while (nextLinePosition >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit(FileReaderEvent.Line, parsedOffer);

        nextLinePosition = remainingData.indexOf('\n');
      }
    }

    this.emit(FileReaderEvent.End, importedRowCount);
  }
}
