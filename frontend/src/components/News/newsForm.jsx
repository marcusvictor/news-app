import React, { Fragment, useState, useEffect } from "react";
import Spinner from "../common/spinner";
import Input from "../common/input";
import TextArea from "../common/textArea";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { getNewsById, saveNews } from "../../services/newsService";

const NewsForm = (props) => {
  const [loading, setloading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const joiOptions = {
    abortEarly: false,
    language: {
      any: {
        empty: "é um campo obrigatório",
      },
      string: {
        regex: {
          base:
            ",precisa ter no mínimo 8 caracteres e conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial",
        },
        max: "precisa ter {{limit}} caracteres ou menos",
      },
    },
  };

  const validationSchema = {
    title: Joi.string().max(300).required().label("Título"),
    content: Joi.string().max(4000).required().label("Conteúdo"),
  };

  const validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: validationSchema[id] };
    const { error } = Joi.validate(obj, schema, joiOptions);
    return error ? error.details[0].message : null;
  };

  useEffect(() => {
    const id = props.match.params.id;

    const fetchData = async () => {
      try {
        const { data: news } = await getNewsById(id);
        setTitle(news.title);
        setContent(news.content);
        setloading(false);
      } catch (ex) {
        props.history.replace("/not-found");
      }
    };
    id !== "nova" ? fetchData() : setloading(false);
  }, [props.match.params.id, props.history]);

  const hadleTitleChange = ({ currentTarget: input }) => {
    setTitleError(validateProperty(input));
    setTitle(input.value);
  };

  const hadleContentChange = ({ currentTarget: input }) => {
    setContentError(validateProperty(input));
    setContent(input.value);
  };

  const doSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      content: content,
    };
    if (props.match.params.id !== "nova") data._id = props.match.params.id;

    try {
      await saveNews(data);

      props.history.push("/news");
    } catch (ex) {
      /* if (ex.response && ex.response.status === 400) {
        if (ex.response.data.column) {
          const errors = { ...this.errors };
          errors[ex.response.data.column] = ex.response.data.what;
          //console.log(errors);
          this.setState({ errors });
        } else toast.error(ex.response.data.what);
      } */
      toast.error(ex.message);
    }
  };

  return loading ? (
    <Spinner color="#002c6f" loading={true} />
  ) : (
    <Fragment>
      <h3 className="mb-4">Cadastro de Notícias</h3>

      <form>
        <Input
          id="title"
          label="Título"
          value={title}
          error={titleError}
          onChange={hadleTitleChange}
        ></Input>
        <TextArea
          id="content"
          label="Conteúdo"
          rows="17"
          value={content}
          error={contentError}
          onChange={hadleContentChange}
        ></TextArea>
        <button
          className="btn btn-blue mt-2"
          disabled={
            !titleError && !contentError && title && content ? "" : "disabled"
          }
          onClick={(event) => {
            doSubmit(event);
          }}
        >
          Confirma
        </button>
      </form>
    </Fragment>
  );
};

export default NewsForm;
