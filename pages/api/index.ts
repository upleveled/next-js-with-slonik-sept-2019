import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import config from '../../config.js';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const pool = createPool(config.POSTGRES_CONNECTION_STRING);
  await pool.connect(async connection => {
    let result = await connection.query(
      sql`SELECT * FROM userAccount WHERE username = 'karlhorky'`,
    );

    if (result.rowCount < 1) {
      await connection.query(
        sql`INSERT INTO userAccount (username) VALUES ('karlhorky')`,
      );
      result = await connection.query(sql`SELECT * FROM userAccount`);
    }

    res.status(200).json(result);
  });
};
