<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Student)')">
          <form @submit.prevent="registerStudent" >
            <div class="row">
              <div class="flex md6 xs12">
                <va-input
                  v-model="name"
                  type="studentEmail"
                  placeholder="Full Name"
                  :label="Name"
                />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="email" type="studentEmail" placeholder="Email" :label="Email" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="contact_number" placeholder="Contact Number" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="id_number" placeholder="Id Number" />
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
              <va-button type="submit" class="my-0">Submit</va-button>
            </div>
          </form>
        </va-card>
      </div>

      <div class="flex xs12">
        <va-card :title="$t('Add New Account (Professor)')">
          <form>
            <div class="row">
              <div class="flex md6 xs12">
                <va-input v-model="simple" placeholder="Name" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="simple" placeholder="Email" />
              </div>

              <div class="flex md6 xs12">
                <va-input v-model="simple" placeholder="Contact Number" />
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
        {
          id: 1,
          description: 'Civil Engineering (BSCE)',
        },
        {
          id: 2,
          description: 'Computer Engineering (BSCpE)',
        },
        {
          id: 3,
          description: 'Marine Engineering (BSMArE)',
        },
        {
          id: 4,
          description: 'Marine Transportation (BSMT)',
        },
        {
          id: 5,
          description: 'Computer Science (BSCS)',
        },
        {
          id: 6,
          description: 'Information Technology (BSIT)',
        },
        {
          id: 7,
          description: 'Information System (BSIS)',
        },
      ],
      studentEmail: '',
      studentName: '',
      studentContact: '',
      studentNumber: '',
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
  },
}
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
