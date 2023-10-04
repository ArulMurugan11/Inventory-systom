import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import {Location} from './location.model';
import {Products} from './products.model';
import {SupplierProd} from './supplier-prod.model';

@model()
export class Supplier extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  supplier_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  comp_name: string;

  @property({
    type: 'number',
    required: true,
  })
  location_id: number;

  @property({
    type: 'string',
    required: true,
  })
  mobile_num: string;

  @hasOne(() => Location)
  location: Location;

  @hasMany(() => Products, {through: {model: () => SupplierProd}})
  products: Products[];
  // products: Products[];

  constructor(data?: Partial<Supplier>) {
    super(data);
  }
}

export interface SupplierRelations {
  // describe navigational properties here
}

export type SupplierWithRelations = Supplier & SupplierRelations;
