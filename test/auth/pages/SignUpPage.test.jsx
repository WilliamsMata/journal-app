import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import SignUpPage from "../../../src/Auth/pages/SignUpPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartCreatingUserWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startCreatingUserWithEmailPassword: ({ displayName, email, password }) => {
    return () =>
      mockStartCreatingUserWithEmailPassword({
        displayName,
        email,
        password,
      });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en <SignUpPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el componente correctamente", () => {
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  test("Submit debe de llamar startCreatingUserWithEmailPassword", () => {
    const displayName = "User Test";
    const email = "usertest@mail.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SignUpPage />
        </MemoryRouter>
      </Provider>
    );

    const displayNameField = screen.getByRole("textbox", { name: "Name" });
    fireEvent.change(displayNameField, {
      target: { name: "displayName", value: displayName },
    });

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByLabelText("Password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const form = screen.getByLabelText("form");
    fireEvent.submit(form);

    expect(mockStartCreatingUserWithEmailPassword).toHaveBeenCalledWith({
      displayName: displayName,
      email: email,
      password: password,
    });
  });
});
