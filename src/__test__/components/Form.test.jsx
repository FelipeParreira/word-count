import React from 'react';
import ReactDOM from 'react-dom';
import { render, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Form from '../../components/Form';

describe('Form', () => {
  let container;
  beforeEach(() => {
    const formElement = render(<Form />);
    container = formElement.container;
  });

  it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Form />, div);
    });

  it('should contain a text input field (textarea)', () => {
    const [textInputField] = container.getElementsByTagName('textarea');

    expect(textInputField).toBeDefined();
  });

  it('should contain one button to count words and another one to reset the text', () => {
    const [submitButton, resetButton] = container.getElementsByTagName('button');
    
    expect(submitButton).toBeDefined();
    expect(submitButton.innerHTML).toMatch(/count words/i);
    
    expect(resetButton).toBeDefined();
    expect(resetButton.innerHTML).toMatch(/reset text/i);
  });

  it('should set the text to an empty string when the reset button is pressed', async () => {
    const [textInputField] = container.getElementsByTagName('textarea');
    const [, resetButton] = container.getElementsByTagName('button');
    
    const exampleText = 'Hello, World!';
    userEvent.type(textInputField, exampleText);
    
    expect(textInputField).toHaveValue(exampleText);
    
    const emptyText = '';
    userEvent.click(resetButton);

    expect(textInputField).toHaveValue(emptyText);
  });

  it('should display the amount of words in the text after submission', async () => {
      const [textInputField] = container.getElementsByTagName('textarea');
      const [submitButton] = container.getElementsByTagName('button');

      const exampleText = 'There are five words here!';
      userEvent.type(textInputField, exampleText);

      expect(textInputField).toHaveValue(exampleText);
      
      await wait(() => {
        userEvent.click(submitButton);
      });
      
      const alertElement = container.querySelector('.MuiAlert-message');
      
      expect(alertElement).toBeDefined();
      expect(alertElement).toBeInTheDocument();
      expect(alertElement.innerHTML).toBe('Your text contains 5 words.');
  });

  it('should display an error if the submitted text is empty', async () => {
    const [textInputField] = container.getElementsByTagName('textarea');
    const [submitButton] = container.getElementsByTagName('button');

    const emptyText = '';
    userEvent.type(textInputField, emptyText);

    expect(textInputField).toHaveValue(emptyText);
    
    await wait(() => {
      userEvent.click(submitButton);
    });
    
    const alertElement = container.querySelector('.MuiAlert-message');
    
    expect(alertElement).toBeDefined();
    expect(alertElement).toBeInTheDocument();
    expect(alertElement.innerHTML).toBe('You should not submit an empty text!');
  });
});
