<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item :to="home.to" router exact>
          <v-list-item-action>
            <v-icon>{{ home.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ home.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-for="section of sections"
          :key="section.title"
          :prepend-icon="section.icon"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ section.display }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(component, i) in section.components"
            :key="i"
            :to="component.path"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>
                {{ component.icon || 'mdi-alert-circle-outline' }}
              </v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ component.title || 'Untitled' }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row no-gutters>
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import pkg from '~/package.json'
import { Component, Vue } from '~/node_modules/nuxt-property-decorator'

@Component
export default class DefaultView extends Vue {
  private drawer = false
  private sections = {
    atoms: {
      display: 'Atoms',
      icon: 'mdi-atom',
      components: [
        {
          title: 'Example',
          path: '/atoms/example',
          icon: 'mdi-test-tube'
        }
      ]
    },
    molecules: {
      display: 'Molecules',
      icon: 'mdi-molecule',
      components: []
    },
    organisms: {
      display: 'Organisms',
      icon: 'mdi-leaf',
      components: []
    }
  }

  private home = {
    icon: 'mdi-home',
    title: 'Home',
    to: '/'
  }

  private title = pkg.description
}
</script>
