import { NextPage } from 'next';
import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

type Props = {
  data: Object;
};

const WithInitialProps: NextPage<Props> = ({ data }) => (
  <Layout title="List Example (as Functional Component) | Next.js + TypeScript Example">
    <h1>List Example (as Function Component)</h1>

    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(data)}</div>
  </Layout>
);

WithInitialProps.getInitialProps = async ({ query }) => {
  const response = await fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      username: query.username,
    }),
  });

  const data = await response.json();

  return { data };
};

export default WithInitialProps;
