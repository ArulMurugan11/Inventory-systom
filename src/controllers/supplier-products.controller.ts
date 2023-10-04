import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Supplier,
SupplierProd,
Products,
} from '../models';
import {SupplierRepository} from '../repositories';

export class SupplierProductsController {
  constructor(
    @repository(SupplierRepository) protected supplierRepository: SupplierRepository,
  ) { }

  @get('/suppliers/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Supplier has many Products through SupplierProd',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Products)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.supplierRepository.products(id).find(filter);
  }

  @post('/suppliers/{id}/products', {
    responses: {
      '200': {
        description: 'create a Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Products)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Supplier.prototype.supplier_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {
            title: 'NewProductsInSupplier',
            exclude: ['product_id'],
          }),
        },
      },
    }) products: Omit<Products, 'product_id'>,
  ): Promise<Products> {
    return this.supplierRepository.products(id).create(products);
  }

  @patch('/suppliers/{id}/products', {
    responses: {
      '200': {
        description: 'Supplier.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.supplierRepository.products(id).patch(products, where);
  }

  @del('/suppliers/{id}/products', {
    responses: {
      '200': {
        description: 'Supplier.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.supplierRepository.products(id).delete(where);
  }
}
