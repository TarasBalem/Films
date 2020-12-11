import React from "react";
import {MemoryRouter as Router} from "react-router-dom";
import {
  render,
  screen,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import {axe, toHaveNoViolations} from "jest-axe";

import LoginForm from "pages/LoginPage/components/LoginForm";

expect.extend(toHaveNoViolations);

const buildFormData = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

const promise = Promise.resolve();
const submit = jest.fn(() => promise);

test("LoginForm should render correct", async () => {
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>,
  );
  const {email, password} = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, email);
  userEvent.type(passwordEl, password);

  expect(emailEl).toHaveValue(email);
  expect(passwordEl).toHaveValue(password);

  userEvent.click(btnEl);
  expect(submit).toHaveBeenCalledTimes(1);
  expect(submit).toHaveBeenCalledWith({email, password});

  const formMsg = screen.queryByRole("alert");
  expect(formMsg).toBeNull();

  expect(screen.queryByText(/loading/i)).toBeInTheDocument();
  // await act(() => promise);
  // expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
});

test("should show FormMessage", async () => {
  render(
    <Router>
      <LoginForm submit={submit} />
    </Router>,
  );
  const {email, password} = buildFormData();
  const emailEl = screen.getByLabelText(/email/i);
  const passwordEl = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, "no correct email");
  userEvent.type(passwordEl, password);

  userEvent.click(btnEl);
  await act(() => promise);
  const formMsg = screen.getByRole("alert");
  expect(formMsg).not.toBeEmptyDOMElement();
});

test("LoginForm should must be accessability", async () => {
  const {container} = render(
    <Router>
      <LoginForm submit={submit} />
    </Router>,
  );

  const result = await axe(container);
  expect(result).toHaveNoViolations();
});
