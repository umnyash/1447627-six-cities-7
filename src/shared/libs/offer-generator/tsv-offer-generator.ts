import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import {
  MIN_PRICE, MAX_PRICE,
  MIN_RATING, MAX_RATING, RATING_ACCURACY,
  MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS,
  MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS,
  FIRST_WEEK_DAY, LAST_WEEK_DAY,
} from './tsv-offer-generator.const.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const city = getRandomItem(this.mockData.cities);
    const previewPhoto = getRandomItem(this.mockData.photos);
    const photos = this.mockData.photos.join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_ACCURACY);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const numberOfRooms = generateRandomValue(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS);
    const numberOfGuests = generateRandomValue(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const userName = getRandomItem(this.mockData.userNames);
    const userEmail = getRandomItem(this.mockData.userEmails);
    const userPassword = crypto.randomUUID();
    const userType = getRandomItem(this.mockData.userTypes);
    const userAvatar = getRandomItem(this.mockData.avatars);

    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    const {
      latitude: locationLatitude,
      longitude: locationLongitude,
    } = getRandomItem(this.mockData.locations);

    return [
      title, description, postDate,
      city, locationLatitude, locationLongitude,
      previewPhoto, photos,
      isPremium, isFavorite, rating,
      housingType, numberOfRooms, numberOfGuests, price, amenities,
      userName, userEmail, userPassword, userType, userAvatar,
    ].join('\t');
  }
}
