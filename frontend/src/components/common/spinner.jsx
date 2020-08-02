import React from "react";

import BounceLoader from "react-spinners/BounceLoader";

const Spinner = props => {
  return (
    <div className="sweet-loading">
      <BounceLoader color={props.color} loading={props.loading} size={70} />
    </div>
  );
};

export default Spinner;
