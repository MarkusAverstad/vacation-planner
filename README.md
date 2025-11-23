# Vacation Planner by Markus Averstad

Base application was generated with ``npm create vite@latest my-vite-app -- --template react``.

I decided to focus on the setup of this application as a challenge for myself, since I have worked on too many already
initialized applications lately and needed a refresher. As such the structure of the project is more mature than was strictly
necessary. The benefit to this is that this application could easily be iterated upon and added to without changing
structure later, which is costly. The downside is that styling has suffered, which led to a very prototype-looking app.

```
Structure:
- src
    - components
        - CountryList
        - Header
        - SortTH
        - SummaryBar
        - GiniFilter
    - hooks
        - useCountryData.ts (contains application state and data)
    - types
    - utils
        - dataGenerator.ts
        - debounce.ts
    - Dashboard.tsx
    - main.tsx
    - index.css
- index.html
- (dotfiles, proejct files etc.)
```

## How to run
- Install node on your machine if you do not have it already.
- Open your console and go to the project directory.
- To run the project in dev mode, type ``npm install`` and then ``npm run dev`` into your console.
- You can now go to http://localhost:5173/ to see the application in action.
- To run tests, type ``npm test``.

## Tech choices taken
- Typescript. Never leave home without it.
- React. I am very much at home with this framework, although I could certainly just as well have built it in Vue3
- TailwindCSS. A very lightweight and simple CSS framework that I have worked with in the past. It's easy to learn and works very well for all sizes of applications in my experience.
- Vite. It's much faster than Webpack and allows use of Vitest which is much faster than Jest.
- Eslint. Works well with Typescript for finding bugs before they happen.
- Prettier. It matches my code style quite well.

## A note on testing.
I have added a few Vitest tests to show off my style. Obviously more would be needed, especially for the useCountryData
hook / provider since it's the center of the application. E2E tests with Playwright or Cypress could also be added.

## A note on performance.
This application works very well for the current list of countries. It does however filter and sort the list separately
which is a bit inefficient. Also, the flags are not reloaded as fast as the rest of the list leading to a choppy feeling.

## A note on styling.
The styling is very straightforward and utilitarian. I quite liked the dark mode styling that came with the create vite app
and decided to keep going with that. The table would benefit from having the option for dark mode, but again I ran out of
time.

## A note on version control.
I worked on this on my local machine for an evening, so I didn't feel it was necessary to commit to Git more than at the 
last moment.
