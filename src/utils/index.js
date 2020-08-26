const nonWordCharacterPattern = /(\s|\.|,|;)+/;
const wordCharacterPattern = /\w+/;

const countWords = (text) => {
  const words = text
    .trim()
    .split(nonWordCharacterPattern)
    .filter(word => wordCharacterPattern.test(word));
  
  const wordCount = words.length;
  return wordCount;
};

export default countWords;
