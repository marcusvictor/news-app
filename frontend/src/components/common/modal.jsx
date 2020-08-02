import React from "react";

const Modal = props => {
  const {
    id,
    title,
    body,
    action,
    displayButton = true,
    buttonText = "Confirmar"
  } = props;

  return (
    <div className="modal" id={id} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              {body}
            </p>
          </div>
          {displayButton &&
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={action}
              >
                {buttonText}
              </button>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
