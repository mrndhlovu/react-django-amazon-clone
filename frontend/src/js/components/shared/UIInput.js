import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { useField } from "formik";

const UIInput = forwardRef(
  ({ label, className, dataTestId, ...props }, ref) => {
    const [field, meta] = useField(props);

    return (
      <div className={className}>
        {label && (
          <label id={field.name.toLowerCase()} htmlFor={field.name}>
            {label}
          </label>
        )}

        <input
          data-testid={dataTestId}
          id={field.name}
          ref={ref}
          {...props}
          {...field}
        />

        {meta.touched && meta.error && (
          <div className="form__error">
            <span>*</span>
            <span>{meta.error}</span>
          </div>
        )}
      </div>
    );
  }
);

UIInput.defaultProps = {
  className: "input__container",
  dataTestId: "",
  label: "",
};

UIInput.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string,
  label: PropTypes.string,
};

export default UIInput;
