/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";

import UIInput from "./UIInput";
import AmazonButton from "./AmazonButton";

const UIForm = ({
  dataTestId,
  children,
  initialState,
  submitHandler,
  validationSchema,
}) => {
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
      <Form className="form__wrapper" data-testid={dataTestId}>
        {children}
      </Form>
    </Formik>
  );
};

UIForm.Button = AmazonButton;

UIForm.Input = UIInput;

UIForm.defaultProps = {
  initialState: {},
  dataTestId: "",
  validationSchema: {},
};
UIForm.propTypes = {
  children: PropTypes.node.isRequired,
  dataTestId: PropTypes.string,
  initialState: PropTypes.shape({}),
  submitHandler: PropTypes.func.isRequired,
  validationSchema: PropTypes.shape({}),
};

export default UIForm;
