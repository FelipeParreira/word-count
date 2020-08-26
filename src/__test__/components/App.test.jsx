import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';

import App from '../../components/App';

describe('App', () => {
  let container;
  beforeEach(() => { container = render(<App />).container; });
  
  it('should render without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App />, div);
    });

  it('should render the correct title', () => {
    const [titleElement] = container.getElementsByTagName('h1');
    
    expect(titleElement).toBeDefined();
    expect(titleElement.innerHTML).toBe("Let's count words!");
  });

  it('should contain a form element', () => {
    const [formElement] = container.getElementsByTagName('form');

    expect(formElement).toBeDefined();
  });
});