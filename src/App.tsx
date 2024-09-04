import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Create from "./Pages/Create";
import Detail from "./Pages/Detail";
import Edit from "./Pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import {v4} from "uuid";
import Layout from "./Components/Layout";
import Undefined from "./Pages/Undefined";

const App = () => {
  // useLocalStorage: hem state'i tutar hem locale kaydeder
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  // Tag olusturma fonksiyonu
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  //Note olusturma fonksiyonu
  const createNote = (noteData: NoteData): void => {
    //formdan gelen veriye id ekle
    const newNote: Note = { id: v4(), ...noteData };

    // state'i guncelle
    setNotes([...notes, newNote]);
  };
  console.log(notes);

  //note silme fonksiyonu
  const deleteNotes = (id: string): void => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Note duzenleme fonksiyonu
  const updateNote = (id: string, updatedData: NoteData): void => {
    const updatedArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );

    setNotes(updatedArr);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Main notes={notes} availableTags={tags} />}
          />
          <Route
            path="/new"
            element={
              <Create
                handleSubmit={createNote}
                createTag={createTag}
                availableTags={tags} // state'te tutulan tag'ler
              />
            }
          />

          <Route path="/note/:id" element={<Layout notes={notes} />}>
            <Route index element={<Detail deleteNotes={deleteNotes} />} />
            <Route
              path="edit"
              element={
                <Edit
                  handleSubmit={updateNote}
                  createTag={createTag}
                  availableTags={tags}
                />
              }
            />
          </Route>
          <Route path="/undefined" element={<Undefined/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;