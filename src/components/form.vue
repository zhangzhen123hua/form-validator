<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "iForm",
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  //向后代组件传递数据
  provide() {
    return {
      form: this
    };
  }
};
</script>
