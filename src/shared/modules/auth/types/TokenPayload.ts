import { UserType } from '../../../types/index.js';

export type TokenPayload = {
  id: string;
  name: string;
  email: string;
  type: UserType;
};
