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
  Products,
  Stock,
} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsStockController {
  constructor(
    @repository(ProductsRepository) protected productsRepository: ProductsRepository,
  ) { }

  @get('/products/{id}/stock', {
    responses: {
      '200': {
        description: 'Products has one Stock',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Stock),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stock>,
  ): Promise<Stock> {
    return this.productsRepository.stock(id).get(filter);
  }

  @post('/products/{id}/stock', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: getModelSchemaRef(Stock)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Products.prototype.product_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {
            title: 'NewStockInProducts',
            exclude: ['stock_id'],
            optional: ['productsId']
          }),
        },
      },
    }) stock: Omit<Stock, 'stock_id'>,
  ): Promise<Stock> {
    return this.productsRepository.stock(id).create(stock);
  }

  @patch('/products/{id}/stock', {
    responses: {
      '200': {
        description: 'Products.Stock PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stock, {partial: true}),
        },
      },
    })
    stock: Partial<Stock>,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    
    return this.productsRepository.stock(id).patch(stock, where);
  }

  @del('/products/{id}/stock', {
    responses: {
      '200': {
        description: 'Products.Stock DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stock)) where?: Where<Stock>,
  ): Promise<Count> {
    return this.productsRepository.stock(id).delete(where);
  }
}
