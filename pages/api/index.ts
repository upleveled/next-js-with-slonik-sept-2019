require('dotenv').config();

import { NextApiRequest, NextApiResponse } from 'next';
import { createPool, sql } from 'slonik';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { register, username, password } = req.body;
  const pool = createPool('postgres://');

  await pool.connect(async (connection) => {
    let result;

    if (!username) {
      result = await connection.query(sql`SELECT * FROM user_account`);
    } else if (username && !password) {
      result = await connection.query(
        sql`SELECT * FROM user_account WHERE username = ${username}`,
      );
    } else if (!register && username && password) {
      const users = await connection.query(
        sql`SELECT password_hash FROM user_account WHERE username = ${username}`,
      );
      // console.log(users);
      const user = users.rows[0] || { password_hash: '' };
      const passwordHash: string = user.password_hash as any;
      const compared = await bcrypt.compare(password, passwordHash);
      // console.log('username', username);
      // console.log('password', password);
      // console.log('compared', compared);

      if (compared) {
        // console.log('true');
        const token = jwt.sign(
          {
            username: username,
          },
          'super-secret-jwt-secret',
          { expiresIn: '7d' },
        );
        result = { token: token };
      } else {
        result = { err: { message: 'User not found' } };
      }
    } else if (register && username && password) {
      const hash = await bcrypt.hash(password, 10);
      // console.log('username', username);
      // console.log('password', password);
      // console.log('hash', hash);
      await connection.query(
        sql`INSERT INTO user_account (username, password_hash) VALUES (${username}, ${hash})`,
      );
      const token = jwt.sign(
        {
          username: username,
        },
        'super-secret-jwt-secret',
        { expiresIn: '7d' },
      );
      result = { token: token };
    }

    res.status(200).json(result);
  });
};
