import {
  IsString,
  IsEmail,
  Length,
} from 'class-validator';

import { UserValidationMessage } from './user-validation.message.js';

import {
  USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH,
} from '../../../constants/index.js';


export class LoginUserDto {
  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH, { message: UserValidationMessage.password.length })
  public password: string;
}
