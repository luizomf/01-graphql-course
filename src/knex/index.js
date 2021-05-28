import knexFn from 'knex';
import knexfile from './knexfile';

export const knex = knexFn(knexfile[process.env.NODE_ENV]);
