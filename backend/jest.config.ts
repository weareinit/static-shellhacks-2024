export default {
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: [
    "**/tests/**/*.spec.ts",
    "**/tests/**/*.test.ts",
  ],
  testEnvironment: "node",
  verbose: true,
  testTimeout: 30000,

};
