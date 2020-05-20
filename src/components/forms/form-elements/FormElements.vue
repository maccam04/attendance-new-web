<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Student)')">
          <form @submit.prevent="onStudentSubmit">
            <div class="row">
              <div class="flex md6 xs12">
                <va-input
                  v-model="studentName"
                  type="studentName"
                  placeholder="Full Name"
                  :error="!!nameErrors.length"
                  :error-messages="nameErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="studentEmail"
                  type="email"
                  placeholder="Email"
                  :error="!!emailErrors.length"
                  :error-messages="emailErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="studentContact"
                  label="Contact Number"
                  type="number"
                  placeholder="0916 XXXX XXX"
                  @keydown="filterKey"
                  @input="filterInput"
                  :error="!!contactErrors.length"
                  :error-messages="contactErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="studentNumber"
                  type="number"
                  placeholder="Student Number"
                  @keydown="filterKey"
                  @input="filterInput"
                  :error="!!studentIdErrors.length"
                  :error-messages="studentIdErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-select
                  :label="$t('Courses/Degree')"
                  v-model="simpleSelectModel"
                  textBy="description"
                  :options="simpleOptions"
                  :error="!!courseErrors.length"
                  :error-messages="courseErrors"
                />
              </div>
            </div>

            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0">Submit</va-button>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Professor)')">
          <form @submit.prevent="onProfSubmit">
            <div class="row">
              <div class="flex md6 xs12">
                <va-input
                  v-model="profName"
                  placeholder="Name"
                  :error="!!profNameErrors.length"
                  :error-messages="profNameErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="profEmail"
                  type="email"
                  placeholder="Email"
                  :error="!!profEmailErrors.length"
                  :error-messages="profEmailErrors"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input
                  v-model="profContact"
                  type="number"
                  label="Contact Number"
                  @keydown="filterKey"
                  @input="filterInput"
                  :maxlength="maxlength"
                  placeholder="0916 XXXX XXX"
                  :error="!!profContactErrors.length"
                  :error-messages="profContactErrors"
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
  name: 'form-elements',
  data () {
    return {
      simpleOptions: [
        'Civil Engineering (BSCE)',
        'Computer Engineering (BSCpE)',
        'Marine Engineering (BSMArE)',
        'Marine Transportation (BSMT)',
        'Computer Science (BSCS)',
        'Information Technology (BSIT)',
        'Information System (BSIS)',
      ],
      toastTextStudent: 'Student registered successfully!',
      toastTextProf: 'Professor registered successfully!',
      toastDuration: 2500,
      toastIcon: 'fa-star-o',
      toastPosition: 'bottom-right',
      isToastFullWidth: false,
      studentEmail: '',
      studentName: '',
      studentContact: '',
      studentNumber: '',
      profName: '',
      profContact: '',
      profEmail: '',
      simpleSelectModel: '',
      emailErrors: [],
      nameErrors: [],
      contactErrors: [],
      profEmailErrors: [],
      profNameErrors: [],
      profContactErrors: [],
      courseErrors: [],
      studentIdErrors: [],
      messages: ['The number should be this format Ex: 0916 XXXX XXX.'],
      maxlength: 11,
      idLength: 10,
    }
  },
  computed: {
    studentFormReady () {
      return (
        !this.emailErrors.length &&
        !this.nameErrors.length &&
        !this.contactErrors.length &&
        !this.courseErrors.length &&
        !this.studentIdErrors.length
      )
    },
    profFormReady () {
      return (
        !this.profEmailErrors.length &&
        !this.profNameErrors.length &&
        !this.profContactErrors.length
      )
    },
  },
  methods: {
    clear () {
      this.studentEmail = ''
      this.studentName = ''
      this.studentContact = ''
      this.studentNumber = ''
      this.profName = ''
      this.profContact = ''
      this.profEmail = ''
      this.simpleSelectModel = ''
    },

    filterKey (e) {
      const key = e.key

      // If is '.' key, stop it
      if (key === '.') return e.preventDefault()

      // OPTIONAL
      // If is 'e' key, stop it
      if (key === 'e') return e.preventDefault()
    },

    // This can also prevent copy + paste invalid character
    filterInput (e) {
      e.target.value = e.target.value.replace(/[^0-9]+/g, '')
    },

    launchToastStudent () {
      this.showToast(this.toastTextStudent, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: 2500,
        fullWidth: this.isToastFullWidth,
      })
    },

    launchToastProf () {
      this.showToast(this.toastTextProf, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: 2500,
        fullWidth: this.isToastFullWidth,
      })
    },

    onStudentSubmit () {
      console.log('onStudentSubmit')
      this.emailErrors = this.studentEmail ? [] : ['Email is required']
      this.nameErrors = this.studentName ? [] : ['Name is required']
      this.contactErrors = this.studentContact
        ? []
        : ['Contact Number is required']
      this.courseErrors = this.simpleSelectModel
        ? []
        : ['Course/Degree is required']
      this.studentIdErrors = this.studentNumber
        ? []
        : ['Student Number is required']

      if (!this.studentFormReady) {
        console.log('not valid')
        return
      }

      this.registerStudent()
    },

    onProfSubmit () {
      this.profEmailErrors = this.profEmail ? [] : ['Email is required']
      this.profNameErrors = this.profName ? [] : ['Name is required']
      this.profContactErrors = this.profContact
        ? []
        : ['Contact Number is required']

      if (!this.profFormReady) {
        console.log('not valid')
        return
      }

      this.registerProf()
    },

    async registerStudent () {
      const data = {
        course: this.simpleSelectModel,
        email: this.studentEmail,
        id: this.studentNumber,
        mobileNo: this.studentContact,
        name: this.studentName,
        register: true,
        status: 'Present',
        token: '',
        type: 0,
      }

      await firebaseInstance.firebase
        .firestore()
        .collection('Users')
        .where('email', '==', this.studentEmail)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            firebaseInstance.firebase
              .firestore()
              .collection('Users')
              .doc(this.studentEmail)
              .set(data)

            this.launchToastStudent()
            this.clear()
          } else {
            this.showToast(
              'The email is already registered! Use another email for registration.',
              {
                position: this.toastPosition,
                duration: 2500,
                fullWidth: this.isToastFullWidth,
              },
            )
          }
        })
    },

    async registerProf () {
      const data = {
        course: '',
        email: this.profEmail,
        id: '',
        mobileNo: this.profContact,
        name: this.profName,
        register: true,
        status: 'Present',
        token: '',
        type: 1,
      }

      await firebaseInstance.firebase
        .firestore()
        .collection('Users')
        .where('email', '==', this.profEmail)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            firebaseInstance.firebase
              .firestore()
              .collection('Users')
              .doc(this.profEmail)
              .set(data)

            this.launchToastProf()
            this.clear()
          } else {
            this.showToast(
              'The email is already registered! Use another email for registration.',
              {
                position: this.toastPosition,
                duration: 2500,
                fullWidth: this.isToastFullWidth,
              },
            )
          }
        })
    },
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
