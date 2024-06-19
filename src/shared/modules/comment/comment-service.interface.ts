import { DocumentType } from '@typegoose/typegoose';

import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentEntity } from './comment.entity.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offer: string): Promise<DocumentType<CommentEntity>[]>;
  deleteByOfferId(offer: string): Promise<number | null>;
}
