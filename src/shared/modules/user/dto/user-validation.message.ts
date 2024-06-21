import {
  USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH
} from '../../../constants/index.js';

import { UserAvatarFormatType, UserType } from '../../../types/index.js';

export const UserValidationMessage = {
  name: {
    invalidFormat: 'Name must be a string',
    length: `Min length is ${USER_NAME_MIN_LENGTH}, max is ${USER_NAME_MAX_LENGTH}`,
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  password: {
    invalidFormat: 'Password must be a string',
    length: `Min length is ${USER_PASSWORD_MIN_LENGTH}, max is ${USER_PASSWORD_MAX_LENGTH}`,
  },
  type: {
    invalid: `Housing type must be ${UserType.Basic} or ${UserType.Pro}`,
  },
  avatar: {
    invalid: 'avatar must be an url',
    invalidFormat: `The image format must be ${UserAvatarFormatType.Png} or ${UserAvatarFormatType.Jpg}.`,
  }

} as const;
