import React from "react";
import {MemoryRouter as Router, Route} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginPage from "pages/LoginPage";
import UserContext, * as usersFuncs from "contexts/UserContext";
import mockApi from "api";

const fakeData = {email: "u1@com.ua", password: "secret"};
const mockToken = "12345";
const mockUser = jest.fn();
const mockDispatch = jest.fn();
const mockContext = [mockUser, mockDispatch];

// jest.mock("api", () => ({
//   users: {
//     login: jest.fn(data => new Promise(resolve => resolve(mockToken))),
//   },
// }));

// ========mokc api.users.login
jest.mock("api");
const {
  users: {login},
} = mockApi;

// =======mock login from UserContext
jest.spyOn(usersFuncs, "login");
usersFuncs.login.mockImplementation(() => jest.fn());

function RenderComponent() {
  return (
    <Router>
      <UserContext.Provider value={mockContext}>
        <LoginPage />
      </UserContext.Provider>
    </Router>
  );
}

function Wrapper({children}) {
  return (
    <Router>
      <UserContext.Provider value={mockContext}>
        {children}
      </UserContext.Provider>
    </Router>
  );
}

// ===== mockRouters
const mockHistory = {push: jest.fn()};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => mockHistory,
}));

test("should render correct", async () => {
  login.mockResolvedValueOnce(mockToken);

  // render(<RenderComponent />);
  render(<LoginPage />, {wrapper: Wrapper});

  const emailEl = screen.getByLabelText(/email/i);
  const passwordEL = screen.getByLabelText(/password/i);
  const btnEl = screen.getByText(/login/i);

  userEvent.type(emailEl, fakeData.email);
  userEvent.type(passwordEL, fakeData.password);

  expect(emailEl).toHaveValue(fakeData.email);
  expect(passwordEL).toHaveValue(fakeData.password);

  // await waitFor(() => userEvent.click(btnEl));
  await userEvent.click(btnEl);

  expect(mockApi.users.login).toHaveBeenCalledTimes(1);
  expect(mockApi.users.login).toHaveBeenCalledWith(fakeData);

  expect(usersFuncs.login).toHaveBeenCalledTimes(1);
  expect(usersFuncs.login).toHaveBeenCalledWith(mockDispatch, mockToken);

  expect(mockHistory.push).toHaveBeenCalledTimes(1);
  expect(mockHistory.push).toHaveBeenCalledWith("/films");
});
