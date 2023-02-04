import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";
import {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from "../../../src/store/journal/journalSlice";
import {
  startDeletingNote,
  startLoadingNotes,
  startNewNote,
  startSavingNote,
  startUploadingFiles,
} from "../../../src/store/journal/thunks";

describe("Pruebas en journal/thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  const uid = "TEST-UID";

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNewNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewEmptyNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );
    expect(dispatch).toHaveBeenCalledWith(
      setActiveNote({
        body: "",
        title: "",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: [],
      })
    );

    // Borrar de firebase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
    await Promise.all(deletePromises);
  });

  test("startLoadingNotes debe cargar todas las notas", async () => {
    getState.mockReturnValue({ auth: { uid: uid } });

    await startLoadingNotes()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setNotes(expect.any(Array)));
  });

  test("startSavingNote debe guardar una nota en firebase", async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: {
        active: {
          title: "Nueva Nota",
          body: "Body de la nota",
          id: "NOTA-ID",
          date: new Date().getTime(),
          imageUrls: [],
        },
      },
    });

    // await startNewNote()(dispatch, getState);
    await startSavingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      updateNote({
        title: "Nueva Nota",
        body: "Body de la nota",
        id: "NOTA-ID",
        date: expect.any(Number),
        imageUrls: [],
      })
    );
  });

  test("startUploadingFiles debe subir fotos y agregar los urls a la nota", async () => {
    getState.mockReturnValue({
      journal: {
        active: {
          title: "Nueva Nota",
          body: "Body de la nota",
          id: "NOTA-ID",
          date: new Date().getTime(),
          imageUrls: ["https://nuevafoto.jpg"],
        },
      },
    });

    await startUploadingFiles([])(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(setSaving());
    expect(dispatch).toHaveBeenCalledWith(
      setPhotosToActiveNote(expect.any(Array))
    );
    expect(dispatch).toHaveBeenCalledWith(
      updateNote({
        title: "Nueva Nota",
        body: "Body de la nota",
        id: expect.any(String),
        date: expect.any(Number),
        imageUrls: expect.any(Array),
      })
    );
  });

  test("startDeletingNote debe eliminar la nota activa", async () => {
    getState.mockReturnValue({
      auth: { uid: uid },
      journal: {
        active: {
          title: "Nueva Nota",
          body: "Body de la nota",
          id: "NOTA-ID",
          date: new Date().getTime(),
          imageUrls: [],
        },
      },
    });

    await startDeletingNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(deleteNoteById("NOTA-ID"));
  });
});
