import {Entity, hasOne, model, property} from '@loopback/repository';
import {Stock} from './stock.model';
@model()
export class Products extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  product_id?: number; 

  @property({
    type: 'string',
    required: true,
  })
  product_name: string;

  @property({
    type: 'number',
    required: true,
  })
  stock_quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  product_price: number;

  @hasOne(() => Stock)
  stock: Stock;
  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}
export type ProductsWithRelations = Products & ProductsRelations;
