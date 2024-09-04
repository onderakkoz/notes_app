import Form from "../Components/Form";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  handleSubmit: (noteData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData> 

const Create = ({ handleSubmit, createTag, availableTags }: CreateProps) => {
  return (
    <div className="container py-5">
      <h2>Yeni Not Oluştur</h2>
      <Form
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags}
       />
    </div>
  );
};

export default Create;