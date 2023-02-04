export const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
};

export const savingState = {
  isSaving: true,
  messageSaved: "",
  notes: [],
  active: null,
};

export const savingStateWithNotes = {
  isSaving: true,
  messageSaved: "",
  notes: [
    { id: 1, name: "nota1" },
    { id: 2, name: "nota2" },
  ],
  active: null,
};

export const stateWithActiveNoteWithPhotos = {
  isSaving: true,
  messageSaved: "",
  notes: [
    { id: 1, name: "nota1" },
    { id: 2, name: "nota2", imageUrls: ["https://photo.jpg"] },
  ],
  active: { id: 2, name: "nota2", imageUrls: ["https://photo.jpg"] },
};
