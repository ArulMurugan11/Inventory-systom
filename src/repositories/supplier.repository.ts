import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasOneRepositoryFactory,
  repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlconnectorDataSource} from '../datasources';
import {Location, Supplier, SupplierRelations, Products, SupplierProd} from '../models';
import {LocationRepository} from './location.repository';
import {SupplierProdRepository} from './supplier-prod.repository';
import {ProductsRepository} from './products.repository';

export class SupplierRepository extends DefaultCrudRepository<
  Supplier,
  typeof Supplier.prototype.supplier_id,
  SupplierRelations
> {
  public readonly location: HasOneRepositoryFactory<
    Location,
    typeof Supplier.prototype.supplier_id
  >;

  public readonly products: HasManyThroughRepositoryFactory<Products, typeof Products.prototype.product_id,
          SupplierProd,
          typeof Supplier.prototype.supplier_id
        >;
  //public readonly products: HasManyRepositoryFactory<Products, typeof Supplier.prototype.supplier_id>;

  constructor(
    @inject('datasources.mysqlconnector') dataSource: MysqlconnectorDataSource,
    @repository.getter('LocationRepository')
    protected locationRepositoryGetter: Getter<LocationRepository>, @repository.getter('SupplierProdRepository') protected supplierProdRepositoryGetter: Getter<SupplierProdRepository>, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,
  ) {
    super(Supplier, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productsRepositoryGetter, supplierProdRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.location = this.createHasOneRepositoryFactoryFor(
      'location',
      locationRepositoryGetter,
    );
    this.registerInclusionResolver('location', this.location.inclusionResolver);
  }
}
