import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { CreateProps } from "../../Pages/Create";
import { Tag } from "../../types";
import { v4 } from "uuid";


const CustomForm = ({
  handleSubmit,
  createTag,
  availableTags,
  markdown="",
  tags=[],
  title="",
}: CreateProps) => {
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const handleSend = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit({
      title:inputRef.current?.value as string,
      markdown:textareaRef.current?.value as string,
      tags:selectedTags,
    })

    navigate("/")
    
  };
  console.log(inputRef);
  console.log(selectedTags);

  return (
    <Form onSubmit={handleSend} className="mt-4">
      {/* baslik -etiket inputu */}
      <Row>
        <Col>
          <Form.Group controlId="title">
            <Form.Label>Başlık</Form.Label>
            <Form.Control ref={inputRef} defaultValue={title}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tags">
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              className="text-black"
              isMulti
              options={availableTags}  
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}  
              
              onCreateOption={(text: string) => {
                const newTag: Tag = { label: text, value: v4() };
                createTag(newTag);
                setSelectedTags([...selectedTags, newTag]);
              }}
              value={selectedTags}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* icerik alanı  */}
      <Form.Group controlId="markdown" className="mt-4">
        <Form.Label>İçerik (markdown destekler)</Form.Label>
        <Form.Control
        defaultValue={markdown}
          as={"textarea"}
          ref={textareaRef}
          style={{
            minHeight: "300px",
            maxHeight: "500px",
          }}
        />
      </Form.Group>

      {/* Butonlar */}
      <Stack
        direction="horizontal"
        className="justify-content-end mt-5"
        gap={4}
      >
        <Link to="..">
          <Button type="button" className="btn btn-secondary">
            Geri
          </Button>
        </Link>

        <Button type="submit">Kaydet</Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;