import {Entity, model, property} from '@loopback/repository';
// import {Products} from './products.model';

@model()
export class Stock extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  stock_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  stock_name: string;

  @property({
    type: 'number',
    required: true,
  })
  stock_sold: number;

  @property({
    type: 'number',
    required: true,
  })
  stock_remain: number;

  @property({
    type: 'number',
  })
  productsId?: number;
  constructor(data?: Partial<Stock>) {
    super(data);
  }
}

export interface StockRelations {
  // describe navigational properties here
}

export type StockWithRelations = Stock & StockRelations;
