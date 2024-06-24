import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
// import { StatusCodes } from 'http-status-codes';

import { OfferService } from './offer-service.interface.js';
import { Component, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_NUMBER_OF_OFFERS, DEFAULT_NUMBER_OF_PREMIUM_OFFERS } from '../../constants/index.js';
// import { HttpError } from '../../libs/rest/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) { }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, { new: true })
      .populate(['author'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(limit = DEFAULT_NUMBER_OF_OFFERS): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offer',
          as: 'comments',
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'author',
          foreignField: '_id',
          as: 'author'
        }
      },
      {
        $addFields: {
          numberOfComments: { $size: '$comments' },
          rating: { $round: [{ $avg: 'comments.rating' }, 1] },
          user: { ArrayElemAt: ['$author', 0] }
        }
      },
      { $unset: ['comments'] },
      { $sort: { createdAt: SortType.DESC } },
      { $limit: +limit }
    ]).exec();
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isFavorite: true })
      .populate(['author'])
      .exec();
  }

  public async findPremium(city: string, limit = DEFAULT_NUMBER_OF_PREMIUM_OFFERS): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ isPremium: true, city })
      .sort({ createdAt: SortType.DESC })
      .limit(limit)
      .populate(['author'])
      .exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['author'])
      .exec();
  }

  public async incCommentNumber(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          numberOfComments: 1,
        }
      }).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({ _id: offerId })) !== null;
  }
}
