import {Entity, model, property} from '@loopback/repository';

@model()
export class SupplierProd extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  supprod_id?: number;

  @property({
    type: 'number',
  })
  supplierId?: number;

  @property({
    type: 'number',
  })
  productsId?: number;

  constructor(data?: Partial<SupplierProd>) {
    super(data);
  }
}

export interface SupplierProdRelations {
  // describe navigational properties here
}

export type SupplierProdWithRelations = SupplierProd & SupplierProdRelations;
