import {Entity, model, property} from '@loopback/repository';

@model()
export class Wallet extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  walletId?: number;

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'number',
    required: true,
  })
  userid: number;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: string;

  @property({
    type: 'date',
    required: true,
  })
  updatedAt: string;


  constructor(data?: Partial<Wallet>) {
    super(data);
  }
}

export interface WalletRelations {
  // describe navigational properties here
}

export type WalletWithRelations = Wallet & WalletRelations;
