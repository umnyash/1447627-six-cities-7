import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { parseArray, parseBoolean, parseNumber } from '../../helpers/index.js';

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
      photos: parseArray(photos),
      isPremium: parseBoolean(isPremium),
      isFavorite: parseBoolean(isFavorite),
      rating: parseNumber(rating, 1),
      housingType: housingType as HousingType,
      numberOfRooms: parseNumber(numberOfRooms),
      numberOfGuests: parseNumber(numberOfGuests),
      price: parseNumber(price),
      amenities: parseArray(amenities) as AmenityName[],
      author: this.parseUser(userName, userEmail, userPassword, userType as UserType, userAvatar),
      location: this.parseLocation(locationLatitude, locationLongitude),
    };
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
