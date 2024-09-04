/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

const config = {
  printWidth: 150,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  proseWrap: 'always',
  importOrder: ['^@/types/(.*)$', '^@/prisma/(.*)$', '^@/lib/(.*)$', '^@/hooks/(.*)$', '^@/components/(.*)$', '^@/util/(.*)$', '^[./]'],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}

export default config
