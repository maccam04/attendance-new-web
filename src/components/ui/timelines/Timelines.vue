<template>
  <div class="timelines">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('Edit Admin Profile')">
          <form @submit.prevent="onsubmit">
            <div class="row">
              <div class="flex md6 xs12">
                <va-input
                  v-model="email"
                  type="email"
                  :label="$t('auth.email')"
                  :error="!!emailErrors.length"
                  :error-messages="emailErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="password"
                  :label="$t('auth.password')"
                  :error="!!passwordErrors.length"
                  :error-messages="passwordErrors"
                />
              </div>
            </div>

            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0">Submit</va-button>
            </div>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseInstance } from '../../../app/store.js'

export default {
  name: 'timelines',
  data () {
    return {
      cacheEmail: '',
      email: '',
      password: '',
      keepLoggedIn: false,
      toastText: 'Updated successfully!',
      emailErrors: [],
      passwordErrors: [],
    }
  },
  // async mounted() {
  //   await firebaseInstance.firebase
  //     .firestore()
  //     .collection("Rooms")
  //     .onSnapshot(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         console.log(doc.data());
  //         this.rooms.push({
  //           id: doc.data().id,
  //           roomName: doc.data().desc
  //         });
  //       });
  //     });
  // },

  mounted () {
    var storedEmail = localStorage.getItem('email')

    firebaseInstance.firebase
      .firestore()
      .collection('Admin')
      .doc(storedEmail)
      .get()
      .then(doc => {
        this.email = doc.data().email
        this.password = doc.data().password
      })
  },
  computed: {
    adminFormReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.email ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']

      if (!this.adminFormReady) {
        return
      }

      const data = {
        email: this.email,
        password: this.password,
      }

      firebaseInstance.firebase
        .firestore()
        .collection('Admin')
        .doc(this.email)
        .update(data)

      this.showToast(this.toastText, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: this.toastDuration,
        fullWidth: this.isToastFullWidth,
      })
    },
  },
}
</script>
