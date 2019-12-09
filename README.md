# Welcome to the Vue Component Library Starter Template

> A template project for creating more vue component libraries

## Introduction

**It is *highly recommended* that you understand the material in the References section below before contributing to this component library.**

In the menu to the left (click the menu icon), you will notice a few headings. These headings organize our components according to the **Atomic Design** pattern.

**Atomic Design** splits components in several categories among which are atoms, molecules, & organisms.
- **Atoms** are the smallest of components in an application. They cannot be split into smaller pieces. This could be things like buttons, input fields, or text areas, etc. An atom on its own can't do anything but display information.
- **Molecules** are built out of our atoms and perform some extended functionality. For example: an input and label atom may be combined into an "input molecule". The atoms may now interact with some functionality that the "molecule" component provides (e.g. clicking on the label focuses on the input field).
- **Organisms** are composed of molecules and may provide functionality to the end user. For example: our input molecule combined with a button may provide a login feature which becomes the "login organism". 


While building components:
- **DO NOT** ask "How can I break make this component more abstract?"
- **DO** ask "What features does my project/team require?"
- **DO** ask "Where are the overlaps in the components we will provide?" 

In summary, it can be easy to try to abstract too much and end up creating a feature that is never used

## Getting Started
**IMPORTANT**: If you are just starting a new library, make sure to do the following:
1. Change the name & description in the package.json file
2. Update the .dependabot/config.yml with the right maintainer configuration.
3. (Optional) Update the README title.


## Adding Components
1. **Create a demo page** in the pages directory. This page will show-off your new component and make it testable.
2. **Add the demo page** to the layout/default.vue page (follow the example that's already there). This will make your demo page visible in the menu.
3. **Create a new component** in the components directory under the respective category (see Atomic Design for more).
4. **Add a test file** for the new component in the test/unit directory.
5. **Start Test Driven Development!** You can run tests by first starting the development server (`npm run dev`) and then by running the cypress tests:
    - Headless: `npm test`
    - Cypress: `npm test:open`

**NOTE**: If you are unsure how to create any of the files mentioned above, try understanding/copying from the example test, demo, and component files already in this library.

## Publishing & Consuming Components
Before publishing your components to NPM, you'll need to run the build process, which will cleanly copy only the relevant Vue files to the dist directory. Running NPM publish will only publish this directory and metadata files.

To consume components after publishing them, install the package in your project (`npm i <package name>`) and then import the components you need:
```ts
import Example from '@byu-oit/vue-component-lib-starter/dist/Example.vue'
@Component({ components: { Example } })
export default class MyPage extends Vue {}
```

## References
[Nuxt Documentation](https://nuxtjs.org/)

[Nuxt TypeScript Property Decorators](https://github.com/nuxt-community/nuxt-property-decorator)

[Atomic Design Book](http://atomicdesign.bradfrost.com/)

[Atomic Design Overview](http://atomicdesign.bradfrost.com/)

[Test Driven Development](https://medium.com/@alisoueidan/atomic-design-33caf30f3a9b)

[Testing with Cypress](https://docs.cypress.io/guides/getting-started/writing-your-first-test.html)

[Cypress Documentation](https://docs.cypress.io/api/api/table-of-contents.html)
