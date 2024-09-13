# Resume Builder App 📝 ![GitHub CI](https://github.com/michaelclemens/resume-builder-app/actions/workflows/ci.yml/badge.svg)

## Overview

### Stack

- ⚡️ [Next.js 14 with App Router](https://nextjs.org/docs)
- ⚛️ [React 18](https://18.react.dev/)
- ✨ [TypeScript](https://www.typescriptlang.org/docs/)
- 💨 [Tailwind CSS 3](https://tailwindcss.com/docs)
- 🛠 [Redux](https://redux.js.org/)
- 🌈 [Prisma ORM](https://www.prisma.io/docs/orm)
- 🐘 [PostgreSQL 16](https://www.postgresql.org/docs/16/index.html)
- 🎭 [Puppeteer](https://pptr.dev/)
- 🃏 [Jest](https://jestjs.io/docs)
- 📏 [ESLint](https://eslint.org/docs)
- 💖 [Prettier](https://prettier.io/docs/en/)
- 👷 [GitHub Actions](https://docs.github.com/en/actions)

### Features

- Create & manage multiple resumes
- Choose from multiple templates
- Customisable colour elements
- Print preview
- Download PDF
- ☀️ Light / ⏾ Dark themes

## Getting started 🚀

### 1. Download and install dependencies

Clone this repository:

```
git clone git@github.com:michaelclemens/resume-builder-app.git
```

Install npm dependencies:

```
cd resume-builder-app
npm ci
```

### 2. Create and seed the database

If you're using Docker on your computer, the following script will set up a PostgreSQL database using the `docker-compose.yml` file at the root of
your project:

```
npm run db:up
```

Run the following command to create your PostgreSQL database:

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in
[`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with a sample resume.

### 3. Configuring your environment

```
cp .env.example .env
```

Ensure these variables are correct. The `CHROME_EXECUTABLE_PATH` is used by Puppeteer when downloading a PDF of the resume. To find this locally go to
[`chrome://version/`](chrome://version/) in a Chrome browser and copy the `Executable Path` value

### 4. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.
