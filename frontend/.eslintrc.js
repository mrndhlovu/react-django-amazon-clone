/* eslint-disable quotes */
module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: ["plugin:react/recommended", "airbnb"],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks"],
  rules: {
    strict: 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    quotes: [2, "double", { avoidEscape: true }],
    "no-underscore-dangle": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "implicit-arrow-linebreak": "off",
    "arrow-body-style": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
