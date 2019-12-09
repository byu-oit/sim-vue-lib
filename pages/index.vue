<template>
  <v-container>
    <v-row justify="center">
      <v-spacer />
      <v-col cols="8">
        <v-card>
          <v-card-title class="headline">
            Welcome to the {{ title }}
          </v-card-title>
          <v-card-text>
            <v-card flat>
              <v-card-title>Introduction</v-card-title>
              <v-card-text>
                <p>
                  <strong
                    >It is <i>highly recommended</i> that you understand the
                    material in the References section below before contributing
                    to this component library.</strong
                  >
                </p>
                <p>
                  In the menu to the left (click <v-icon>mdi-menu</v-icon>), you
                  will notice a few headings. These headings organize our
                  components according to the Atomic Design pattern.
                </p>
                <p>
                  <strong>Atomic Design</strong> splits components in several
                  categories among which are atoms, molecules, & organisms.
                </p>
                <ul>
                  <li>
                    <strong>Atoms</strong> are the smallest of components in an
                    application. They cannot be split into smaller pieces. This
                    could be things like buttons, input fields, or text areas,
                    etc. An atom on its own can't do anything but display
                    information.
                  </li>
                  <li>
                    <strong>Molecules</strong> are built out of our atoms and
                    perform some extended functionality. For example: an input
                    and label atom may be combined into an "input molecule". The
                    atoms may now interact with some functionality that the
                    "molecule" component provides (e.g. clicking on the label
                    focuses on the input field).
                  </li>
                  <li>
                    <strong>Organisms</strong> are composed of molecules and may
                    provide functionality to the end user. For example: our
                    input molecule combined with a button may provide a login
                    feature which becomes the "login organism".
                  </li>
                </ul>
                <br />
                <span>While building components:</span>
                <ul>
                  <li>
                    <strong>DO NOT</strong> ask "How can I break make this
                    component more abstract?"
                  </li>
                  <li>
                    <strong>DO</strong> ask "What features does my project/team
                    require?"
                  </li>
                  <li>
                    <strong>DO</strong> ask "Where are the overlaps in the
                    components we will provide?"
                  </li>
                </ul>
                <p>
                  In summary, it can be easy to try to abstract too much and end
                  up creating a feature that is never used.
                </p>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-title>Getting Started</v-card-title>
              <v-card-text>
                <p>
                  <strong>IMPORTANT</strong>: If you are just starting a new
                  library, make sure to do the following:
                </p>
                <ol>
                  <li>
                    Update the name & description in the package.json file
                  </li>
                  <li>
                    Update the .dependabot/config.yml with the right maintainer
                    configuration.
                  </li>
                  <li>(Optional) Update the README title.</li>
                </ol>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-title>Adding Components</v-card-title>
              <v-card-text>
                <ol>
                  <li>
                    <strong>Create a demo page</strong> in the pages directory.
                    This page will show-off your new component and make it
                    testable.
                  </li>
                  <li>
                    <strong>Add the demo page</strong> to the layout/default.vue
                    page (follow the example that's already there). This will
                    make your demo page visible in the menu.
                  </li>
                  <li>
                    <strong>Create a new component</strong> in the components
                    directory under the respective category (see Atomic Design
                    for more).
                  </li>
                  <li>
                    <strong>Add a test file</strong> for the new component in
                    the test/unit directory.
                  </li>
                  <li>
                    <strong>Start Test Driven Development!</strong> You can run
                    tests by first starting the development server (<strong
                      >npm run dev</strong
                    >) and then by running the cypress tests:
                    <ul>
                      <li>Headless: <strong>npm test</strong></li>
                      <li>Cypress: <strong>npm test:open</strong></li>
                    </ul>
                  </li>
                </ol>

                <p>
                  <strong>NOTE:</strong> If you are unsure how to create any of
                  the files mentioned above, try understanding/copying from the
                  Example Test, Demo, and Component files already in this
                  library
                </p>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-title>Publishing & Consuming Components</v-card-title>
              <v-card-text>
                <p>
                  Before publishing your components to NPM, you'll need to run
                  the build process, which will cleanly copy only the relevant
                  Vue files to the dist directory. Running NPM publish will only
                  publish this directory.
                </p>
                <p>
                  To consume components after publishing them, install the
                  package in your project and then import the components you
                  need.
                </p>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-title>References</v-card-title>
              <v-card-text>
                <div v-for="reference of references" :key="reference.link">
                  <a :href="reference.link" target="_blank">{{
                    reference.text
                  }}</a>
                </div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import pkg from '~/package.json'

@Component
export default class HomePage extends Vue {
  private title = pkg.description
  private references = [
    {
      text: 'Nuxt Documentation',
      link: 'https://nuxtjs.org/'
    },
    {
      text: 'Nuxt TypeScript Property Decorators',
      link: 'https://github.com/nuxt-community/nuxt-property-decorator'
    },
    {
      text: 'Atomic Design Book',
      link: 'http://atomicdesign.bradfrost.com/'
    },
    {
      text: 'Atomic Design Overview',
      link: 'https://medium.com/@alisoueidan/atomic-design-33caf30f3a9b'
    },
    {
      text: 'Test Driven Development',
      link: 'https://www.agilealliance.org/glossary/tdd'
    },
    {
      text: 'Testing with Cypress',
      link:
        'https://docs.cypress.io/guides/getting-started/writing-your-first-test.html'
    },
    {
      text: 'Cypress Documentation',
      link: 'https://docs.cypress.io/api/api/table-of-contents.html'
    }
  ]
}
</script>
