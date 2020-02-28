<template>
  <div class="grid row">
    <div class="flex xs12 md12">
      <va-card title="Fixed Grid">
        <div>
          <div class="row">
            <div class="flex xs12">
              <div
                class="grid__container flex-center"
                :style="computedStyle"
              >
                xs12
              </div>
            </div>
            <div class="flex xs6" v-for="i in 2" :key="`6${i}`">
              <div
                class="grid__container flex-center"
                :style="computedStyle"
              >
                xs6
              </div>
            </div>
            <div class="flex xs2" v-for="i in 22" :key="`4${i}`">
              <div
                class="grid__container flex-center"
                :style="computedStyle"
              >
                xs4
              </div>
            </div>
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'grid',

  computed: {
    computedStyle () {
      return {
        backgroundColor: this.$themes.primary,
      }
    },
  },
}
</script>

<style lang="scss">
.grid {
  &__container {
    min-height: 3rem;
    color: $white;
    border-radius: 0.5rem;

    @include media-breakpoint-down(xs) {
      padding: 0.5rem;
      text-align: center;
      font-size: 0.75rem;
    }
  }
}

</style>
