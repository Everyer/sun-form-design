<template>
  <div class="sy_wrap" v-if="!designer.formMode">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {},
  name: "designFormWrapper",
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped lang="scss">
.sy_wrap{
  width: 100%;
}
</style>