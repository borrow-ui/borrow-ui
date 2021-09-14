This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

All the dependencies shuold have been installed already for the monorepo, otherwise run:

```bash
yarn
```

This will install all the dependencies.
The component library, (@borrow-ui/ui workspace) is already configured to work for this website.

## Getting Started

To run the development server, run:

```bash
yarn dev
```

You should be able to open [http://localhost:3000](http://localhost:3000) with your browser and see the project home page.

There are the following pages created as a demonstration:

-   `pages/index.js`: this is the home page entry point. A `Home` component has been created and places in `components/home` folder;
-   `pages/blog/*`: an example of a blog section, with a customized `index.js` file (hybrid MDX/JSX) and the blog posts loaded only from MDX files;
-   `pages/project/*`: an example of a full-MDX section, including `index` page (reachable from `/project` URL).

The code is commented where needed and explanations are added to the first blog post.

## Build

You can build this project by running

```bash
yarn build
```

This will create a folder, `.next`, with the built version.
