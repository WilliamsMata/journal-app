import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
} from "../../fixtures/authFixtures";

describe("Pruebas en authSlice.js", () => {
  test("Debe de regresar el estado inicial y llamarse 'auth'", () => {
    const state = authSlice.reducer(initialState, {});

    expect(state).toStrictEqual(initialState);
    expect(authSlice.name).toBe("auth");
  });

  test("Debe de realizar la autenticación", () => {
    const state = authSlice.reducer(initialState, login(demoUser));

    expect(state).toStrictEqual(authenticatedState);
  });

  test("Debe de realizar el logout sin argumentos", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toStrictEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: undefined,
    });
  });

  test("Debe de realizar el logout y mostrar un mensaje de error", () => {
    const errorMessage = "Credenciales no son correctas";
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toStrictEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage,
    });
  });

  test("Debe de cambiar el estado a checking", () => {
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    expect(state.status).toBe("checking");
  });
});
