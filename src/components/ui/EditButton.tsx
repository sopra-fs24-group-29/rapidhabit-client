import React from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";

const EditButton = ({ editFunction, allowEdit }) => {
  return (
    <Button onClick={editFunction} disabled={!allowEdit}>
      <span className="material-icons">edit</span>
    </Button>
  );
};

EditButton.propTypes = {
  editFunction: PropTypes.func.isRequired,
  allowEdit: PropTypes.bool,
};

export default EditButton;
