import React from "react";

export default function NotFound(props) {
  return (
    <div className="jumbotron">
      <h1 className="display-4">404 - Página não encontrada</h1>
      <p className="lead">
        A página que você está procurando não foi encontrada. Favor contactar a
        TI.
      </p>
      <hr className="my-4" />

      <button
        className="btn btn-primary"
        onClick={() => props.history.push("/")}
      >
        Início
      </button>
    </div>
  );
}
