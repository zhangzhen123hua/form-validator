<template>
  <input type="text" :value="dataVal" @blur="handleBlur" @input="handleInput" />
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
      dataVal: this.value
    };
  },
  methods: {
    handleBlur() {
      this.dispatch("iFormItem", "on-form-blur", this.dataVal);
    },
    handleInput(event) {
      const value = event.target.value;
      this.dataVal = value;
      this.$emit("input", value);
    }
  }
};
</script>
