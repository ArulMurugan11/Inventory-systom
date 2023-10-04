import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MysqlconnectorDataSource} from '../datasources';
import {Products, ProductsRelations, Stock} from '../models';
import {StockRepository} from './stock.repository';
// import {SupplierRepository} from './supplier.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.product_id,
  ProductsRelations
> {
  public readonly stock: HasOneRepositoryFactory<
    Stock,
    typeof Products.prototype.product_id
  >;

  // public readonly supplier: BelongsToAccessor<Supplier, typeof Products.prototype.product_id>;

  constructor(
    @inject('datasources.mysqlconnector') dataSource: MysqlconnectorDataSource,
    @repository.getter('StockRepository')
    protected stockRepositoryGetter: Getter<StockRepository>,
  ) {
    super(Products, dataSource);

    this.stock = this.createHasOneRepositoryFactoryFor(
      'stock',
      stockRepositoryGetter,
    );
    this.registerInclusionResolver('stock', this.stock.inclusionResolver);
  }
}
