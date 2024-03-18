import React from "react";
import PropTypes from "prop-types";

const FormField = (props) => {
  return (
    <div className="login field">
      <input
        className="login input"
        placeholder={props.label}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string, // label muss zwingend ein string sein und muss zwingend als String übergeben werden
  value: PropTypes.string, // gleich wie bei value
  onChange: PropTypes.func, // callback funktion, die übergeben wird, falls sich einer der werte ändert
};

export default FormField;
