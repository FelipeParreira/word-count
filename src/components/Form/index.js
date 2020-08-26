import { Form as FForm, Field, Formik } from 'formik';
import { TextField, Button, ButtonGroup, FormGroup, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import classNames from 'classnames';
import countWords from '../../utils';
import numeral from 'numeral';
import React from "react";

const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: "0 auto",
  }
});

const Form = () => {
  const classes = useStyles();
  const initialValues = { 
    text: "", 
    wordCount: 0,
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
        <Box 
        >
        <FForm
          bordercolor="grey.500"
          border={1}
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
              classes={{root: classes.root}}
              className={classNames({ "validation-group": true })}
            />
          <Box style= {{width: '30%', margin: '2% auto' }}>
            <ButtonGroup>
              <Button disabled={isSubmitting} type="submit">Count words</Button>
              <Button type="reset" onClick={() => setFieldValue('text', '')}>Reset text</Button>
            </ButtonGroup>
          </Box>
          <Box>
            { 
              values.wordCount > 0 ? 
              (
                <Alert style={{width: '30%', margin: '0 auto'}}  variant="outlined" severity="success">
                  {`Your text contains ${numeral(values.wordCount).format('0,0')} ${values.wordCount < 2 ? "word": "words"}.`}
                </Alert>
            ) :
            (!!errors.text && 
              <Alert style={{width: '30%', margin: '0 auto'}} variant="outlined" severity="error">
                {errors.text}
              </Alert>
            )
            
          }
          </Box>
        </FForm>
        </Box>
        )}
      </Formik>
  );
};

export default Form;
