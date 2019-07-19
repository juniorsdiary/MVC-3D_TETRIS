module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ['eslint:recommended', "prettier"],
    "parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module"
    },
    "plugins": ["prettier"],
    "rules": {
      "prettier/prettier": "error"
    }
};
