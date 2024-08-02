export const connection: Connection = {
  CONNECTION_STRING: 'mongodb://localhost:27017/nest',
  DB: 'nest',
  DBNAME: 'nest',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};
