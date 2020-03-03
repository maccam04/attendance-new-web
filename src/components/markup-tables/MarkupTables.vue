<template>
  <div class="modals">
    <va-card :title="$t('List of Professor')">
      <va-data-table :fields="fields" :data="users" no-pagination>
        <template slot="marker" slot-scope="props">
          <va-icon name="fa fa-circle" :color="props.rowData.color" size="8px" />
        </template>

        <template slot="actions" slot-scope="props">
          <!-- <va-button
          flat
          small
          color="gray"
          @click="edit(props.rowData)"
          class="ma-0"
          >{{ $t('tables.edit') }}</va-button>-->

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
    <!--//Modals-->
    <va-modal
      v-model="showSmallModal"
      size="small"
      :title=" $t('Warning')"
      :message=" $t('Are you sure you want to delete this?') "
      :okText=" $t('modal.confirm')"
      :cancelText=" $t('modal.cancel')"

    />
  </div>
</template>

<script>
import { firebaseInstance } from '../../app/store.js'
export default {
  data () {
    return {
      show: true,
      showSmallModal: false,
      users: [],
    }
  },

  async mounted () {
    await firebaseInstance.firebase
      .firestore()
      .collection('Users')
      .where('type', '==', 1)
      .onSnapshot(querySnapshot => {
        this.users = []
        querySnapshot.forEach(doc => {
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
          name: '__slot:actions',
          dataClass: 'text-right',
        },
      ]
    },
  },

  methods: {
    // edit(user) {
    //   alert("Edit User: " + JSON.stringify(user));
    // },
    async remove (user) {
      const idx = this.users.findIndex(u => u.id === user.id)
      this.users.splice(idx, 1)

      await firebaseInstance.firebase
        .firestore()
        .collection('Users')
        .doc(user.email)
        .delete()
    },
  },
}
</script>

<style lang="scss">
</style>
