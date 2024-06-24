import {
  IsString,
  IsInt,
  Max,
  Min,
  Length,
  IsMongoId,
} from 'class-validator';

import { CommentValidationMessage } from './comment-validation.message.js';

import {
  COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH,
  MIN_RATING, MAX_RATING,
} from '../../../constants/index.js';


export class CreateCommentDto {
  @IsString({ message: CommentValidationMessage.text.invalidFormat })
  @Length(COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH, { message: CommentValidationMessage.text.length })
  public text: string;

  @IsMongoId({ message: CommentValidationMessage.offer.invalid })
  public offer: string;

  public author: string;

  @IsInt({ message: CommentValidationMessage.rating.invalidFormat })
  @Min(MIN_RATING, { message: CommentValidationMessage.rating.minValue })
  @Max(MAX_RATING, { message: CommentValidationMessage.rating.maxValue })
  public rating: number;
}
