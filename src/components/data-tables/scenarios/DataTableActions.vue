<template>
  <va-card :title="$t('List of Student')">
    <va-data-table :fields="fields" :data="users" no-pagination>
      <template slot="marker" slot-scope="props">
        <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
      </template>

      <template slot="actions" slot-scope="props">
        <va-button
          flat
          small
          color="gray"
          @click="edit(props.rowData)"
          class="ma-0"
        >{{ $t('tables.edit') }}</va-button>

        <va-button
          flat
          small
          color="danger"
          @click="remove(props.rowData)"
          class="ma-0"
        >{{ $t('tables.delete') }}</va-button>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>

import { firebaseInstance } from '../../../app/store.js'

export default {
  data () {
    return {
      users: [],
    }
  },

  async mounted () {
    await firebaseInstance.firebase
      .firestore()
      .collection('Users')
      .where('type', '==', 0)
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.data())
          this.users.push(doc.data())
        })
      })
  },

  computed: {
    fields () {
      return [
        {
          name: '__slot:marker',
          width: '30px',
          dataClass: 'text-center',
        },
        {
          name: 'id',
          title: 'Student Id',
        },
        {
          name: 'name',
          title: this.$t('tables.headings.name'),
        },
        {
          name: 'email',
          title: this.$t('tables.headings.email'),
        },
        {
          name: 'mobileNo',
          title: 'Contact #',
        },
        {
          name: 'course',
          title: 'Degree',
        },
        {
          name: '__slot:actions',
          dataClass: 'text-right',
        },
      ]
    },
  },
  methods: {
    edit (user) {
      alert('Edit User: ' + JSON.stringify(user))
    },
    remove (user) {
      const idx = this.users.findIndex(u => u.id === user.id)
      this.users.splice(idx, 1)
    },
  },
}
</script>

<style lang="scss">
</style>
