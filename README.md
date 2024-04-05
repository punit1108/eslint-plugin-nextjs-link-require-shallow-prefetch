# eslint-plugin-nextjs-link-require-shallow-prefetch

Next.js Link tag will require Shallow and Prefetch attributes

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-nextjs-link-require-shallow-prefetch`:

```sh
npm install eslint-plugin-nextjs-link-require-shallow-prefetch --save-dev
```

## Usage

Add `nextjs-link-require-shallow-prefetch` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "nextjs-link-require-shallow-prefetch"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "nextjs-link-require-shallow-prefetch/rule-name": 2
    }
}
```


## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                       | Description                                                   | 🔧 |
| :----------------------------------------------------------------------------------------- | :------------------------------------------------------------ | :- |
| [nextjs-link-require-shallow-prefetch](docs/rules/nextjs-link-require-shallow-prefetch.md) | Next.js Link tag will make Shallow and Prefetch attributes mandatory | 🔧 |

<!-- end auto-generated rules list -->


