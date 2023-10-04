import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlconnectorDataSource} from '../datasources';
import {SupplierProd, SupplierProdRelations} from '../models';

export class SupplierProdRepository extends DefaultCrudRepository<
  SupplierProd,
  typeof SupplierProd.prototype.supprod_id,
  SupplierProdRelations
> {
  constructor(
    @inject('datasources.mysqlconnector') dataSource: MysqlconnectorDataSource,
  ) {
    super(SupplierProd, dataSource);
  }
}
