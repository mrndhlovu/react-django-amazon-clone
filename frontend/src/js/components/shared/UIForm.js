/* eslint-disable react/button-has-type */
import React, { Children, cloneElement, forwardRef } from "react";
import PropTypes from "prop-types";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";

const UIForm = ({
  dataTestId,
  children,
  initialState,
  submitHandler,
  validationSchema,
}) => {
  const childrenWithProps = (props) => {
    return Children.toArray(children).map((child) =>
      cloneElement(child, { ...props })
    );
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        submitHandler(data, (error) => {
          setSubmitting(false);
          if (!error) resetForm();
        });
      }}
    >
      {(props) => (
        <Form className="form__wrapper" data-testid={dataTestId}>
          {childrenWithProps({ ...props })}
        </Form>
      )}
    </Formik>
  );
};

UIForm.Button = ({ button: RenderButton, className, type, content }) => {
  return RenderButton ? (
    <RenderButton />
  ) : (
    <button className={className} type={type}>
      {content}
    </button>
  );
};

UIForm.Input = forwardRef(
  ({ className, name, dataTestId, label, type }, ref) => {
    const { touched, errors } = useFormikContext();

    return (
      <div className={className}>
        {label && (
          <label id={name.toLowerCase()} htmlFor={name}>
            {label}
          </label>
        )}
        <Field
          id={name}
          ref={ref}
          name={name}
          type={type}
          data-testid={dataTestId}
        />
        {touched[name] && errors[name] && (
          <div className="form__error">
            <span>*</span>
            <span>{errors[name]}</span>
          </div>
        )}
      </div>
    );
  }
);

UIForm.defaultProps = {
  initialState: {},
  dataTestId: "",
  validationSchema: {},
};

UIForm.Input.defaultProps = {
  className: "input__container",
  dataTestId: "",
  errors: {},
  handleChange: () => {},
  label: "",
  placeholder: "",
  type: "text",
};

UIForm.Button.defaultProps = {
  className: "",
  content: "",
  type: "button",
};

UIForm.Button.propTypes = {
  button: PropTypes.func.isRequired,
  className: PropTypes.string,
  content: PropTypes.string,
  type: PropTypes.string,
};

UIForm.propTypes = {
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  initialState: PropTypes.shape({}),
  submitHandler: PropTypes.func.isRequired,
  validationSchema: PropTypes.shape({}),
};

UIForm.Input.propTypes = {
  dataTestId: PropTypes.string,
  errors: PropTypes.shape({}),
  handleChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default UIForm;
