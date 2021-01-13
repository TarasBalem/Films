import React from "react";
import {MemoryRouter as Router} from "react-router-dom";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "pages/LoginPage";
import UserContext, * as usersFuncs from "contexts/UserContext";
import {rest} from "msw";
import {setupServer} from "msw/node";

const fakeData = {email: "u1@com.ua", password: "secret"};
const mockToken = "12345";
const mockUser = jest.fn();
const mockDispatch = jest.fn();
const mockContext = [mockUser, mockDispatch];
const mockHistory = {push: jest.fn()};

const server = setupServer(
  rest.post("/api/auth", async (req, res, ctx) => {
    return res(ctx.json({token: mockToken}));
  }),
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
  jest.restoreAllMocks();
});

// =======mock login from UserContext
jest.spyOn(usersFuncs, "login");
usersFuncs.login.mockImplementation(() => jest.fn());

// ===== mockRouters
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

function RenderComponent() {
  return (
    <Router>
      <UserContext.Provider value={mockContext}>
        <LoginPage />
      </UserContext.Provider>
    </Router>
  );
}

test("should render correct", async () => {
  render(<RenderComponent />);

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEL = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, fakeData.email);
  userEvent.type(passwordEL, fakeData.password);

  expect(emailEl).toHaveValue(fakeData.email);
  expect(passwordEL).toHaveValue(fakeData.password);

  // await waitFor(() => userEvent.click(btnEl));
  userEvent.click(btnEl);

  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

  expect(usersFuncs.login).toHaveBeenCalledTimes(1);
  expect(usersFuncs.login).toHaveBeenCalledWith(mockDispatch, mockToken);

  expect(mockHistory.push).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledWith("/films");
});
