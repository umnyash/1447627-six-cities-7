export const Component = {
  Config: Symbol.for('Config'),
  CommentController: Symbol.for('CommentController'),
  CommentModel: Symbol.for('CommentModel'),
  CommentService: Symbol.for('CommentService'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  Logger: Symbol.for('Logger'),
  OfferController: Symbol.for('OfferController'),
  OfferModel: Symbol.for('OfferModel'),
  OfferService: Symbol.for('OfferService'),
  RestApplication: Symbol.for('RestApplication'),
  UserController: Symbol.for('UserController'),
  UserModel: Symbol.for('UserModel'),
  UserService: Symbol.for('UserService'),
} as const;
