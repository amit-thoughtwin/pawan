/* eslint-disable no-undef */
import React from 'react';
import {
  logRoles, render, screen, waitFor,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './component/login/login';

it('renders personalized greeting', async () => {
  // Render new instance in every test to prevent leaking state
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
});
test('button available in the page or not', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const buttongogleregisterlem = screen.getByRole('button', { name: 'Sign in with Google', exact: false });
  expect(buttongogleregisterlem).toBeInTheDocument();

  const buttonelem = screen.getByRole('button', { name: 'Register', exact: false });
  expect(buttonelem).toBeInTheDocument();
});
test('role available button', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  logRoles(screen.getByTestId('myrootdiv'));
  const buttongogleregisterlem = screen.getByRole('button', { name: 'Sign in with Google', exact: false });
  expect(buttongogleregisterlem).toBeInTheDocument();
});
test('It should keep a $ in front of the input', () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
  );
  const inputNode = screen.getByPlaceholderText('Email');
  expect(inputNode).toBeInTheDocument();
});
test('rendering and submitting a basic Formik form', async () => {
  const handleSubmit = jest.fn();
  render(
    <BrowserRouter>
      <Login onSubmit={handleSubmit} />
    </BrowserRouter>,
  );

  userEvent.click(screen.getByRole('button', { name: 'Sign in with Google', exact: false }));

  await waitFor(() => expect(handleSubmit).toHaveBeenCalledWith({
    email: 'john.dee@someemail.com',
    password: 'password',
  }));
});
