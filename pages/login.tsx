import { useState } from 'react';
import { NextPage } from 'next';
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
  setError: Function,
  setMessage: Function,
) {
  setFetching(true);
  setError({ message: '' });

  fetch(`http://localhost:3000/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
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
      return response.json().then(({ token, err }) => {
        if (err) {
          return setError(err);
        }
        cookies.set('token', token);
        setMessage('Login successful!');
      });
    },
    err => {
      // Rejected: Error!
      setFetching(false);
      setError(err);
    },
  );
}

const WithInitialProps: NextPage<Props> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fetching, setFetching] = useState('');
  const [error, setError] = useState({ message: '' });
  const [message, setMessage] = useState('');

  return (
    <Layout title="Login">
      <h1>Login</h1>
      {fetching ? (
        'Loading...'
      ) : (
        <>
          {error.message && (
            <div style={{ color: 'red' }}>Error: {error.message}</div>
          )}
          {message}
          <form
            onSubmit={() =>
              onSubmit(
                username,
                password,
                setFetching,
                setUsername,
                setPassword,
                setError,
                setMessage,
              )
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
            <button>Login</button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default WithInitialProps;
