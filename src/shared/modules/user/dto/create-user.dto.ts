import {
  IsString,
  IsEmail,
  IsUrl,
  IsEnum,
  Length,
  IsOptional,
} from 'class-validator';

import { UserValidationMessage } from './user-validation.message.js';

import {
  USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH,
  USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH,
} from '../../../constants/index.js';

import { UserType } from '../../../types/index.js';

export class CreateUserDto {
  @IsString({ message: UserValidationMessage.name.invalidFormat })
  @Length(USER_NAME_MIN_LENGTH, USER_NAME_MAX_LENGTH, { message: UserValidationMessage.name.length })
  public name: string;

  @IsEmail({}, { message: UserValidationMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: UserValidationMessage.password.invalidFormat })
  @Length(USER_PASSWORD_MIN_LENGTH, USER_PASSWORD_MAX_LENGTH, { message: UserValidationMessage.password.length })
  public password: string;

  @IsEnum(UserType, { message: UserValidationMessage.type.invalid })
  public type: UserType;

  @IsOptional()
  @IsUrl({}, { message: UserValidationMessage.avatar.invalid })
  public avatar?: string;
}
