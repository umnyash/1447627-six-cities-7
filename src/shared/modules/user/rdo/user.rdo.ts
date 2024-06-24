import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public type: string;

  @Expose()
  @Transform(({ value }) => value ?? 'D:\\Projects\\1447627-six-cities-7\\src\\img\\unknown-raccoon.svg')
  public avatar: string;
}
