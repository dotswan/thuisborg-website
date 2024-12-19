# Thuisborg website on CMS

This repository is intended to unify the structure of frontend projects.

## Tech Stack

Node, Vuejs, VueEx, TailwindCSS, Vite

## Project Structure

```plaintext
project-root/
├── .github                     // deployment
├── dist                        // build files goes here
├── pages                       // inner pages html
├── public                      // media assets
│   ├── docs                    // documents like pdf,...
│   ├── fav                     // favicon files generated (realfavicongenerator.net)
│   ├── icons                   // icons, svg preffered
│   ├── images                  // project images
│   ├── videos                  // video files
│   ├── favicon.icons           // favicon file
│   └── partials.html           // header and footer styles                  
├── src
│   ├── js                  
│   │   ├── components          // vue components
│   │   ├── directives          // vue directives
│   │   ├── helpers             // reusable functions
│   │   ├── mixins              // vue mixins
│   │   ├── store               // vuex store
│   |   └── main.js             // js entry file
│   └── styles/
│       ├── components          // sass components
│       ├── partials            // sass standalone partials
│       ├── utils               // sass utility parts
│       └── main.scss           // styles entry point
├── index.html                  // landingpage
├── stats.html                  // vite after build resource status page
├── tailwind.config.js
└── vite.config.js
```

## Start a new project

1. Copy boilerplate code

```bash
  git clone https://github.com/dotswan/cms-frontend-boilerplate
```

2. Go to the project directory

```bash
  cd my-project
```

3. Create a new repository, then change the remote origin to the new repository

```bash
  git remote set-url origin <url-of-your-new-repo>
```

4. Install dependencies

```bash
  npm install
```

5. Start the server

```bash
  npm run dev
```

6. Production build

```bash
  npm run build
```

## Rules

- ***`CMS URLs`*** : After the project is built on CMS, it should be starting with `/template`, so all urls for any
  files will use the same pattern.

- ***`File URLs`*** : Vite proxy is added to redirect any address starting with `/template` to the main url on local, so
  it covers both CMS & local addresses

- ***`Port Number`*** : The redirect proxy needs to be added to the localhost port number, it can be controlled with
  `vite.config.js`

- ***`Header & footer`*** : This project is configured in a way that header and footer tags are injected to any page. So
  it needs to be coded once in `partials.html`.

- ***`Html Entry Page`*** : it is located on root `index.html`

- ***`Html Pages`*** : exept the entry html, other html files should be located in  `/pages`. so the final url will be
  like: `localhost:4850/pages/about` for file `/pages/about.html`. it can also support folders. so if we put `/nl`
  inside `/pages`, we can use it like `localhost:4850/pages/nl`.

- ***`CI/CD`*** : inside the directory `.github` the deployment rules are located which works with repository variables.
  After each merge to main, it will be triggered and runs the `npm run build` on github actions and uploads the files
  from `/assets` to the configured destination on CDN to be used on CMS.