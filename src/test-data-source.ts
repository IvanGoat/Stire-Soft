import { DataSource, EntitySchema } from 'typeorm';

export function createTestDataSource(
  entities: (Function | string | EntitySchema)[],
) {
  return new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities,
  });
}
