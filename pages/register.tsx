import { useState } from 'react';
import { NextPage } from 'next';
// import Link from 'next/link';
import Layout from '../components/Layout';
import cookies from 'js-cookie';
import fetch from 'cross-fetch';

type Props = {
  data: Object;
};

// eslint-disable-next-line
function onSubmit(
  username: string,
  password: string,
  setFetching: Function,
  setUsername: Function,
  setPassword: Function,
) {
  setFetching(true);

  fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      register: true,
      username: username,
      password: password,
    }),
  }).then(
    response => {
      // Resolved: Success!
      // console.log(response);
      setFetching(false);
      setUsername('');
      setPassword('');
      return response.json().then(({ token }) => {
        cookies.set('token', token);
      });
    },
    () => {
      // Rejected: Error!
      setFetching(false);
    },
  );
}

const WithInitialProps: NextPage<Props> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState(false);

  return (
    <Layout title="Register">
      <h1>Register</h1>
      {fetching ? (
        'Loading...'
      ) : (
        <form
          onSubmit={() =>
            onSubmit(username, password, setFetching, setUsername, setPassword)
          }
        >
          <input
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
          />
          <button>Register</button>
        </form>
      )}
    </Layout>
  );
};

export default WithInitialProps;
