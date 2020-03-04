<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 pa-3 flex-center">
      <router-link class="py-5 flex-center" to="/">
        <div class="app-navbar__center lg5 md4">
          <div class="container portrait">
            <img :src="image" />
          </div>
        </div>
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs v-model="tabIndex" center>
            <va-tab>{{ $t('auth.login') }}</va-tab>
            <va-tab>{{ $t('auth.createNewAccount') }}</va-tab>
          </va-tabs>

          <va-separator />

          <div class="pa-3">
            <router-view />
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>

import image from '../../assets/icons/logo_transparent.png'
const tabs = ['login', 'signup']

export default {
  name: 'AuthLayout',

  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
      image: image,
    }
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
}
</script>

<style lang="scss">

.container {
  width: 200px;
  overflow: hidden;
}

.container img {
  display: block;
}

.portrait img {
  width: 100%;
}

.landscape img {
  height: 100%;
}

.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(to right, #0e4ac4, #002c85);

  &__card {
    width: 100%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
</style>
