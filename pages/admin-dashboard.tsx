import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import jwt from 'jsonwebtoken';
import fetch from 'cross-fetch';
import nextCookies from 'next-cookies';

type Props = {
  userInTokenExists: boolean;
};

const AdminDashboard: NextPage<Props> = ({ userInTokenExists }) => (
  <Layout title="Admin Dashboard">
    {userInTokenExists ? (
      'Showing dashboard content to verified user.'
    ) : (
      <>
        Please <Link href="/login">login</Link>.
      </>
    )}
  </Layout>
);

AdminDashboard.getInitialProps = async ctx => {
  const { token } = nextCookies(ctx);

  if (!token) {
    return { userInTokenExists: false };
  }

  const decoded: { username: string } = (await jwt.verify(
    token,
    'super-secret-jwt-secret',
  )) as any;

  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      username: decoded.username,
    }),
  });

  const data = await response.json();

  // verify that the token in the cookie is verified as a jwt
  return { userInTokenExists: data.rowCount > 0 };
};

export default AdminDashboard;
