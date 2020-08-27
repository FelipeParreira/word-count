import { TextField, Button, ButtonGroup, FormGroup, Box } from "@material-ui/core";

import { Form as FForm, Field, Formik } from 'formik';
import Alert from './Alert';

import classNames from 'classnames';
import countWords from '../../utils';
import numeral from 'numeral';
import React from "react";

const Form = () => {
  const initialValues = { 
    text: "", 
    wordCount: -1,
  };

  const onSubmit = (values, { setSubmitting, setValues }) => {
    setSubmitting(true);
    
    setValues({
      ...values,
      wordCount: countWords(values.text),
    });
    
    setSubmitting(false);
  };

  const validate = ({ text }) => {
    const errors = {};
    if (text.trim().length === 0) {
      errors.text = "You should not submit an empty text!";
    }

    return errors;
  };

  return (
    <Formik 
      validateOnChange={false} 
      validateOnBlur={false}
      {...{ initialValues, onSubmit, validate }}>
        {({ values, isSubmitting, errors, setFieldValue }) => (
        <FForm
          as={FormGroup} 
          size="medium"
          margin="dense"
        >
          <Field 
              autoFocus
              placeholder="Enter your text here..." 
              name="text" 
              type="input"
              multiline
              variant="filled"
              rows={8}
              as={TextField} 
              style={{ width: '50%', margin: "0 auto" }}
              className={classNames({ "validation-group": true })}
            />
          
          <Box style= {{ width: '30%', margin: '2% auto' }}>
            <ButtonGroup>
              <Button disabled={isSubmitting} type="submit">Count words</Button>
              <Button type="reset" onClick={() => {
                setFieldValue('text', '');
                setFieldValue('wordCount', -1);
              } }>Reset text</Button>
            </ButtonGroup>
          </Box>

          <Box>
            { 
              values.wordCount > -1 ? 
              (
                <Alert message={`Your text contains ${numeral(values.wordCount).format('0,0')} ${values.wordCount === 1 ? "word": "words"}.`} severity="success" />
            ) :
            (
              !!errors.text && 
              (
                <Alert message={errors.text} severity="error" />
              )
            )
          }
          </Box>
        </FForm>
        )}
    </Formik>
  );
};

export default Form;
