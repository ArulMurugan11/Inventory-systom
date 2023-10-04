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
  Location,
} from '../models';
import {SupplierRepository} from '../repositories';

export class SupplierLocationController {
  constructor(
    @repository(SupplierRepository) protected supplierRepository: SupplierRepository,
  ) { }

  @get('/suppliers/{id}/location', {
    responses: {
      '200': {
        description: 'Supplier has one Location',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Location),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Location>,
  ): Promise<Location> {
    return this.supplierRepository.location(id).get(filter);
  }

  @post('/suppliers/{id}/location', {
    responses: {
      '200': {
        description: 'Supplier model instance',
        content: {'application/json': {schema: getModelSchemaRef(Location)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Supplier.prototype.supplier_id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {
            title: 'NewLocationInSupplier',
            exclude: ['location_id'],
            optional: ['supplierId']
          }),
        },
      },
    }) location: Omit<Location, 'location_id'>,
  ): Promise<Location> {
    return this.supplierRepository.location(id).create(location);
  }

  @patch('/suppliers/{id}/location', {
    responses: {
      '200': {
        description: 'Supplier.Location PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Location, {partial: true}),
        },
      },
    })
    location: Partial<Location>,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.supplierRepository.location(id).patch(location, where);
  }

  @del('/suppliers/{id}/location', {
    responses: {
      '200': {
        description: 'Supplier.Location DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Location)) where?: Where<Location>,
  ): Promise<Count> {
    return this.supplierRepository.location(id).delete(where);
  }
}
