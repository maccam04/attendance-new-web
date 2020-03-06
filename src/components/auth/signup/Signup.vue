<template>
  <form @submit.prevent="onsubmit()">
    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <va-checkbox
        v-model="agreedToTerms"
        class="mb-0"
        :error="!!agreedToTermsErrors.length"
        :errorMessages="agreedToTermsErrors"
      >
        <template slot="label">
          {{ $t('auth.agree') }}
          <span class="link">{{ $t('auth.termsOfUse') }}</span>
        </template>
      </va-checkbox>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.sign_up') }}</va-button>
    </div>
  </form>
</template>

<script>
import { firebaseInstance } from '../../../app/store.js'

export default {
  name: 'signup',
  data () {
    return {
      email: '',
      password: '',
      agreedToTerms: false,
      emailErrors: [],
      passwordErrors: [],
      agreedToTermsErrors: [],
      toastText: 'Admin registered successfully.',
    }
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      this.agreedToTermsErrors = this.agreedToTerms
        ? []
        : ['You must agree to the terms of use to continue']
      if (!this.formReady) {
        return
      }

      const data = {
        email: this.email,
        password: this.password,
      }

      firebaseInstance.firebase
        .firestore()
        .collection('Admin')
        .where('email', '==', this.email)
        .where('password', '==', this.password)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            firebaseInstance.firebase
              .firestore()
              .collection('Admin')
              .doc(this.email)
              .set(data)

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.isToastFullWidth,
            })
          } else {
            this.showToast('Your email is already registered!', {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.isToastFullWidth,
            })
          }
        })
    },
  },
  computed: {
    formReady () {
      return !(
        this.emailErrors.length ||
        this.passwordErrors.length ||
        this.agreedToTermsErrors.length
      )
    },
  },
}
</script>

<style lang="scss">
</style>
