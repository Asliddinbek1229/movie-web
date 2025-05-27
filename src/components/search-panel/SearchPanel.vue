<template>
    <input
        type="text"
        class="form-control search-input"
        placeholder="Kinolarni qidirish..."
        :value="term"
        @input="changeHandler"
    />
</template>

<script>
export default {
    props: {
      updateTermHandler: {
        type: Function,
        required: true,
      },
    },
  data() {
      return {
        term: '',
      }
  },
  methods: {
      changeHandler(e) {
        this.term = e.target.value;
        this.updateTermHandler(this.term);
      }
  }
}
</script>

<style>
</style>