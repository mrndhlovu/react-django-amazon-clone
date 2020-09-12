import React, { Children, cloneElement } from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";

const UIForm = ({
  dataTestId,
  children,
  initialState,
  submitHandler,
  validationSchema,
}) => {
  const childrenWithProps = (props) =>
    Children.map(children, (child) => cloneElement(child, { ...props }));

  return (
    <>
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
        {({ handleSubmit, ...rest }) => (
          <Form className="form__wrapper" data-testid={dataTestId}>
            {childrenWithProps(rest)}
          </Form>
        )}
      </Formik>
    </>
  );
};

UIForm.Button = ({ button: Button }) => <Button />;

UIForm.Input = ({
  className,
  name,
  placeholder,
  dataTestId,
  label,
  handleChange,
  handleBlur,
  values,
  type,
  errors,
}) => {
  return (
    <div className={className}>
      {label && (
        <label id={label.toLowerCase()} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        name={name}
        type={type}
        data-testid={dataTestId}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={handleBlur}
        className="form__input"
        value={values[name]}
      />
      {errors[name] && (
        <div className="form__error">
          <span>*</span>
          <span>{errors[name]}</span>
        </div>
      )}
    </div>
  );
};

UIForm.defaultProps = {
  initialState: {},
  dataTestId: "",
  validationSchema: {},
};

UIForm.Input.defaultProps = {
  className: "input__container",
  dataTestId: "",
  errors: {},
  handleBlur: () => {},
  handleChange: () => {},
  label: "",
  placeholder: "",
  type: "text",
  values: {},
};

UIForm.Button.propTypes = {
  button: PropTypes.func.isRequired,
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
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  values: PropTypes.shape({}),
  type: PropTypes.string,
  className: PropTypes.string,
};

export default UIForm;
