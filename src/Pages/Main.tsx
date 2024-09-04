import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import Card from "../Components/Card";
import { useState } from "react";

type Props = {
  notes: Note[];
  availableTags: Tag[];
};

const Main = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("")
  const [ selectedTags, setSelectedTags] = useState<Tag[]>([])
  
  const filtredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(title.toLowerCase())
    &&
    selectedTags.every((s_tag)=>
     note.tags.some((note_tag)=> note_tag.value === s_tag.value) 
     ))
      
  return (
    <div className="container mx-auto py-5">
      {/* ust kisim */}
      <Stack direction="horizontal" className="justify-content-between">
        <div className="d-flex gap-3 align-items-center">
          <img src="./src/assets/note_logo.png" width={45} alt="white notebook on red background"/>
          <h1>Notlar</h1>
        </div>

        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* Form alani */}
      <Form className="mt-5">
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="select">
              <Form.Label >Etikete Göre Ara</Form.Label>
              <ReactSelect 
              onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                className="text-black"
                isMulti
                options={availableTags}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* Not Listesi  */}
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filtredNotes.map((note) => (
         <div  key={note.id} >
           <Col>
            <Card note={note} />
          </Col>
         </div>
        ))}
      </Row>
    </div>
  );
};

export default Main;