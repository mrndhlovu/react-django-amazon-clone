module.exports = {
  setupFilesAfterEnv: ["<rootDir>src/test/setupTests.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
  },
};
