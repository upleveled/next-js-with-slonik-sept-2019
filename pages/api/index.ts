import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import config from '../../config.js';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.body;
  const pool = createPool(config.POSTGRES_CONNECTION_STRING);

  await pool.connect(async connection => {
    let result;

    if (!username) {
      result = await connection.query(sql`SELECT * FROM userAccount`);
    } else {
      result = await connection.query(
        sql`SELECT * FROM userAccount WHERE username = ${username}`,
      );

      if (result.rowCount < 1) {
        await connection.query(
          sql`INSERT INTO userAccount (username) VALUES (${username})`,
        );
        result = await connection.query(
          sql`SELECT * FROM userAccount WHERE username = ${username}`,
        );
      }
    }

    res.status(200).json(result);
  });
};
