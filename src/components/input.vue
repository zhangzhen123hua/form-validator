<template>
  <input type="text" :value="dataVal" @blur="handleBlur" />
</template>
<script>
import emitMixin from "../mixins/setEmit";
export default {
  name: "iInput",
  mixins: [emitMixin],
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dataVal: ""
    };
  },
  watch: {
    value(val) {
      this.dataVal = val;
    }
  },
  methods: {
    handleBlur() {
      console.log(1111);
      this.dispatch("iFormItem", "on-form-blur", this.dataVal);
    }
  }
};
</script>
