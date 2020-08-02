import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import Modal from "../common/modal";
import Spinner from "../common/spinner";
import { getCurrentDateAsString } from "../../utils/date";
import { getNews, deleteNews } from "../../services/newsService";

const News = () => {
  const [loading, setloading] = useState(true);
  const [newsArray, setNewsArray] = useState([]);
  const [newsIdToBeDeleted, setNewsIdToBeDeleted] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setNewsArray(await getNews());
      } catch (ex) {
      } finally {
        setloading(false);
      }
    };
    fetchData();
  }, []);

  const renderNews = () => {
    return (
      newsArray &&
      newsArray.map((n) => (
        <div key={n._id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{n.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {`Criada em ${getCurrentDateAsString(new Date(n.createdAt))}`}
            </h6>
            <p className="card-text">{n.content}</p>
            <div className="row flex-row-reverse">
              <i
                className="fas fa-trash clickableIcon text-danger"
                onClick={setNewsIdToBeDeleted.bind(this, n._id)}
                data-toggle="modal"
                data-target="#deleteModal"
                //data-backdrop="static"
                data-keyboard="false"
              />
              <i
                className="far fa-edit clickableIcon text-primary"
                onClick={() => {
                  history.push(`/news/${n._id}`);
                }}
              />
            </div>
          </div>
        </div>
      ))
    );
  };

  const handleDelete = async () => {
    const prevNewsArray = _.cloneDeep(newsArray);
    setNewsArray(newsArray.filter((n) => n._id !== newsIdToBeDeleted));

    try {
      await deleteNews(newsIdToBeDeleted);
    } catch (error) {
      setNewsArray(prevNewsArray);

      toast.error("Ocorreu um erro ao excluir a operação");
    }
  };

  return loading ? (
    <Spinner color="#002c6f" loading={true} />
  ) : (
    <Fragment>
      <div className="row justify-content-center">
        <Link to="/news/nova" className="btn btn-blue">
          NOVA NOTÍCIA
        </Link>
      </div>
      <div className="row mt-4 justify-content-center">{renderNews()}</div>
      <Modal
        id="deleteModal"
        title="Confirmação de exclusão"
        body={`Tem certeza que deseja excluir a notícia?`}
        action={handleDelete}
        buttonText="Excluir"
      />
    </Fragment>
  );
};

export default News;
