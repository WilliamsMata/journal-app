import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startCreatingUserWithEmailPassword,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixtures/authFixtures";

// se crea el mock por error en firebase
jest.mock("../../../src/firebase/providers");

describe("Pruebas en auth/thunks", () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  test("Debe de invocar el checkingCredential", async () => {
    await checkingAuthentication()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCredential y login - Éxito", async () => {
    // mock
    const googleData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue(googleData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(googleData));
  });

  test("startGoogleSignIn debe de llamar checkingCredential y logout con mensaje de error - Error", async () => {
    // mock
    const googleData = { ok: false, errorMessage: "Un error en Google" };
    await signInWithGoogle.mockResolvedValue(googleData);

    // thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: googleData.errorMessage })
    );
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredential y login - Éxito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: "Demo User",
    };
    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test("startCreatingUserWithEmailPassword debe de llamar checkingCredential y logout con mensaje de error - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Ocurrio un error al crear usuario",
    };
    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: "Demo User",
    };
    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredential y login - Éxito", async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
  });

  test("startLoginWithEmailPassword debe de llamar checkingCredential y logout con el mensaje de error - Error", async () => {
    const loginData = { ok: false, errorMessage: "Error al hacer login" };
    const formData = { email: demoUser.email, password: "123456" };

    await loginWithEmailPassword.mockResolvedValue(loginData);

    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: loginData.errorMessage })
    );
  });

  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
