import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import LoginPage from "../../../src/Auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
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

describe("Pruebas en el <loginPage />", () => {
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("Boton de google debe de llamar el startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const googleBtn = screen.getByLabelText("google-btn");
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit debe de llamar startLoginWithEmailPassword", () => {
    const email = "williams.rm99@gmail.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    const form = screen.getByLabelText("form");
    fireEvent.submit(form);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
