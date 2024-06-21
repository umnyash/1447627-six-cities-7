import {
  COMMENT_MIN_LENGTH, COMMENT_MAX_LENGTH,
  MIN_RATING, MAX_RATING,
} from '../../../constants/index.js';

export const CommentValidationMessage = {
  text: {
    invalidFormat: 'Description must be a string',
    length: `Min length is ${COMMENT_MIN_LENGTH}, max is ${COMMENT_MAX_LENGTH}`,
  },
  offer: {
    invalid: 'Offer must be a valid id',
  },
  author: {
    invalid: 'Author must be a valid id',
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: `Minimum rating is ${MIN_RATING}`,
    maxValue: `Maximum rating is ${MAX_RATING}`,
  },
} as const;
