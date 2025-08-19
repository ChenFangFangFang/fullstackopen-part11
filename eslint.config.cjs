const globals = require("globals")
const stylisticJs = require("@stylistic/eslint-plugin-js")
const js = require("@eslint/js")

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.browser  // 添加浏览器全局变量
      }
    },
    plugins: {
      "@stylistic/js": stylisticJs
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/quotes": ["error", "single"],
      "@stylistic/js/semi": ["error", "never"],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]  // 允许以_开头的未使用变量
    }
  },
  {
    ignores: [
      "dist/**",
      "build/**",
      "**/coverage/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/part4/assets/**",
      "bloglist-frontend/dist/**"
    ]
  }
]