<template>
  <div class="content">
    <i-form :model="dataForm" :rules="ruleValidate">
      <i-form-item label="标题" prop="title">
        <i-input v-model="dataForm.title"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="emaile">
        <i-input v-model="dataForm.emaile"></i-input>
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
        title: "",
        emaile: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "标题必填", trigger: "blur" },
          { min: 2, max: 60, message: "2~60字符", trigger: "blur" }
        ],
        emaile: [
          { required: true, message: "邮箱必填", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ]
      }
    };
  },
  components: { iForm, iFormItem, iInput }
};
</script>
