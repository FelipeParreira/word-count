import countWords from '../../utils';

describe('countWords', () => {
  it('should count the number of words in a string', () => {
    expect(countWords('')).toBe(0);
    expect(countWords(' ')).toBe(0);
    expect(countWords('.')).toBe(0);
    expect(countWords(' .')).toBe(0);
    expect(countWords('word ')).toBe(1);
    expect(countWords('word ,')).toBe(1);
    expect(countWords('word')).toBe(1);
    expect(countWords('word .')).toBe(1);
    expect(countWords('one-word')).toBe(1);
    expect(countWords('two, words')).toBe(2);
    expect(countWords('...here there')).toBe(2);
    expect(countWords('here...there')).toBe(2);
    expect(countWords('here...there!!!one')).toBe(3);
    expect(countWords('two,words')).toBe(2);
    expect(countWords('There are five words here!')).toBe(5);
    expect(countWords('1. First item; 2. Second item; 3. Third item')).toBe(9);
    expect(countWords('Hey, John, do you know how many words there are in this sentence?')).toBe(13);
    expect(countWords(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`)).toBe(69);
  });
});