import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;
const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_ACCURACY = 1;
const MIN_NUMBERS_OF_ROOMS = 1;
const MAX_NUMBER_OF_ROOMS = 8;
const MIN_NUMBERS_OF_GUESTS = 1;
const MAX_NUMBER_OF_GUESTS = 10;
const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewPhoto = getRandomItem<string>(this.mockData.photos);
    const photos = this.mockData.photos.join(';');
    const isPremium = Boolean(generateRandomValue(0, 1));
    const isFavorite = Boolean(generateRandomValue(0, 1));
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_ACCURACY);
    const housingType = getRandomItem<string>(this.mockData.housingTypes);
    const numberOfRooms = generateRandomValue(MIN_NUMBERS_OF_ROOMS, MAX_NUMBER_OF_ROOMS);
    const numberOfGuests = generateRandomValue(MIN_NUMBERS_OF_GUESTS, MAX_NUMBER_OF_GUESTS);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems<string>(this.mockData.amenities).join(';');
    const userName = getRandomItem<string>(this.mockData.userNames);
    const userEmail = getRandomItem<string>(this.mockData.userEmails);
    const userPassword = crypto.randomUUID();
    const userType = getRandomItem<string>(this.mockData.userTypes);
    const userAvatar = getRandomItem<string>(this.mockData.avatars);

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
