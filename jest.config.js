/*module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    transform: {
      '^.+\\.(js|jsx)?$': 'babel-jest',
    },
  }; */
  module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['js', 'jsx', 'json', 'node','tsx'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
   
    // ...other configurations
  };
  
