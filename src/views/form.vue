<template>
  <div class="content">
    <i-form :model="dataForm" :rules="rules">
      <i-form-item label="标题" prop="title">
        <i-input v-model="dataForm.title"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>
<script>
import iForm from "../components/form";
import iFormItem from "../components/form-item";
import iInput from "../components/input";
export default {
  data() {
    return {
      dataForm: {
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "标题必填", trigger: "blur" },
          { min: 2, max: 60, message: "2~60字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {
    iForm,
    iFormItem,
    iInput
  },
  mounted() {
    this.$on("on-form-blur", this.getHandle);
  },
  methods: {
    getHandle() {
      console.log(2222);
    }
  }
};
</script>
