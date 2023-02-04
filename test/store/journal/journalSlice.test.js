import {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  journalSlice,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  updateNote,
} from "../../../src/store/journal/journalSlice";
import {
  initialState,
  savingState,
  savingStateWithNotes,
  stateWithActiveNoteWithPhotos,
} from "../../fixtures/journalFixtures";

describe("Pruebas en journalSlice.js", () => {
  const newNote = {
    title: "",
    body: "",
    imageUrls: [],
    date: new Date().getTime(),
  };

  test("Debe de regresar el estado inicial y llamarse journal", () => {
    const state = journalSlice.reducer(initialState, {});

    expect(state).toStrictEqual(initialState);
    expect(journalSlice.name).toBe("journal");
  });

  test("savingNewNote debe cambiar isSaving a true", () => {
    const state = journalSlice.reducer(initialState, savingNewNote());

    expect(state.isSaving).toBeTruthy();
  });

  test("addNewEmptyNote debe agregar una nota y cambiar el isSaving a false", () => {
    const state = journalSlice.reducer(savingState, addNewEmptyNote(newNote));

    expect(state.notes).toHaveLength(1);
    expect(state.isSaving).toBeFalsy();
  });

  test("setActiveNote debe colocar la nota activa", () => {
    const state = journalSlice.reducer(savingState, setActiveNote(newNote));

    expect(state.active).toStrictEqual(newNote);
  });

  test("setNotes debe colocar todas las notas", () => {
    const notes = [{ name: "nota1" }, { name: "nota2" }, { name: "nota3" }];
    const state = journalSlice.reducer(initialState, setNotes(notes));

    expect(state.notes).toHaveLength(3);
    expect(state.notes).toStrictEqual(notes);
  });

  test("updateNote debe actualizar una nota creada con su id", () => {
    const editedNote = { id: 1, name: "nota con id 1 actualizada" };
    const state = journalSlice.reducer(
      savingStateWithNotes,
      updateNote(editedNote)
    );

    expect(state.notes[0]).toStrictEqual(editedNote);
    expect(state.isSaving).toBeFalsy();
  });

  test("setPhotosToActiveNote debe agregar nuevas fotos a la nota activa", () => {
    const newPhotoUrl = "https://photo2.jpg";

    const state = journalSlice.reducer(
      stateWithActiveNoteWithPhotos,
      setPhotosToActiveNote([newPhotoUrl])
    );

    expect(state.isSaving).toBeFalsy();
    expect(state.active.imageUrls).toHaveLength(2);
  });

  test("clearNotesLogout debe regresar al estado iniciar", () => {
    const state = journalSlice.reducer(
      stateWithActiveNoteWithPhotos,
      clearNotesLogout()
    );

    expect(state).toStrictEqual(initialState);
  });

  test("deleteNoteById debe eliminar una nota por su id y quitar nota activa", () => {
    const state = journalSlice.reducer(
      stateWithActiveNoteWithPhotos,
      deleteNoteById(2)
    );

    expect(state.notes).toHaveLength(1);
    expect(state.active).toBeFalsy();
  });
});
