// jest.config.js
export default {
    transform: {
      "^.+\\.[tj]sx?$": "babel-jest"
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    }
  };
  