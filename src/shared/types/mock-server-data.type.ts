import { AmenityName, CityName, HousingType, UserType, Location } from './index.js';

export type MockServerData = {
  titles: string[],
  descriptions: string[],
  cities: CityName[],
  locations: Location[],
  photos: string[],
  housingTypes: HousingType[],
  amenities: AmenityName[],
  userNames: string[],
  userEmails: string[],
  userTypes: UserType[],
  avatars: string[],
}
