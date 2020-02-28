<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Student)')">
          <form @submit.prevent="registerStudent">
            <div class="row">
              <div class="flex md6 xs12">
                <va-input v-model="studentName" type="studentName" placeholder="Full Name" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="studentEmail" type="studentEmail" placeholder="Email" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="studentContact" placeholder="Contact Number" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="studentNumber" placeholder="Id Number" />
              </div>

              <div class="flex md6 xs12">
                <va-select
                  :label="$t('Courses/Degree')"
                  v-model="simpleSelectModel"
                  textBy="description"
                  :options="simpleOptions"
                />
              </div>
            </div>

            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0" @click="launchToastStudent">Submit</va-button>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Professor)')">
          <form @submit.prevent="registerProf">
            <div class="row">
              <div class="flex md6 xs12">
                <va-input v-model="profName" placeholder="Name" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="profEmail" placeholder="Email" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="profContact" placeholder="Contact Number" />
              </div>
            </div>

            <div class="d-flex justify--center mt-3">
              <va-button type="submit" class="my-0" @click="launchToast">Submit</va-button>
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
      toastTextStudent: 'Student register successfully.!',
      toastTextProf: 'Student register successfully.!',
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
      studentEmailErrors: [],
      studentNameErrors: [],
    }
  },
  methods: {
    clear (field) {
      this[field] = ''
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
        .doc(this.studentEmail)
        .set(data)
    },

    async registerProf () {
      const data = {
        course: '',
        email: this.profEmail,
        id: '',
        mobileNo: this.profContact,
        name: this.profContact,
        register: true,
        status: 'Present',
        token: '',
        type: 1,
      }

      await firebaseInstance.firebase
        .firestore()
        .collection('Users')
        .doc(this.studentEmail)
        .set(data)
    },

    launchToast () {
      this.showToast(
        this.toastTextStudent,
        {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
        },
      )
    },

    launchToastStudent () {
      this.showToast(
        this.toastTextProf,
        {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
        },
      )
    },
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
