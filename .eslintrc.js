module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["@nuxtjs", "plugin:nuxt/recommended"],
  // add your custom rules here
  rules: {
    "nuxt/no-cjs-in-config": "off",
    "vue/comment-directive": "off",
    quotes: ["error", "double"],
    "space-before-function-paren": ["error", "always"]
  }
};
