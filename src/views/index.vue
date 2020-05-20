<template>
  <div class="content">
    <el-form
      :model="dataForm"
      :rules="rules"
      ref="formDom"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="dataForm.title"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="dataForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="电话号" prop="telephone">
        <el-input v-model="dataForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="emailes">
        <el-input v-model="dataForm.emailes"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="dataForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="dataForm.passWord"></el-input>
      </el-form-item>
      <el-form-item label="微信号" prop="weChat">
        <el-input v-model="dataForm.weChat"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button type="primary" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    //自定义手机号 11 位手机号，以 1 开头，不包含 10 / 11 /12开头
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value))
        return callback(new Error("手机号错误"));
      callback();
    };
    //自定义电话号码  5-18 位数字，支持短横线
    const checkTelephone = (rule, value, callback) => {
      if (!/^[0-9-]{5,18}$/.test(value))
        return callback(new Error("电话号错误"));
      callback();
    };
    // 用户名校验  中文、英文、数字、短横线、下划线；不可包含空格
    const checkUserName = (rule, value, callback) => {
      if (!/^[\u4E00-\u9FA5A-Za-z0-9_-]+$/.test(value))
        return callback(new Error("用户名错误"));
      callback();
    };
    // 密码校验
    const checkPassWord = (rule, value, callback) => {
      if (!/^([a-zA-Z0-9]|[._~!@#$%^&*()+=';,]){3,30}$/.test(value))
        return callback(new Error("密码错误"));
      callback();
    };
    //微信号  6—20 个字母、数字、下划线和减号，必须以字母开头
    const checkWeChat = (rule, value, callback) => {
      if (!/^([a-zA-Z0-9])[A-Za-z0-9_-]{6,20}$/.test(value))
        return callback(new Error("微信号错误"));
      callback();
    };

    return {
      dataForm: {
        title: "",
        phoneNumber: "",
        telephone: "",
        emailes: "",
        userName: "",
        passWord: "",
        weChat: ""
      },
      rules: {
        title: [
          { required: true, message: "标题必填", trigger: "blur" },
          { min: 2, max: 60, message: "2~60字符", trigger: "blur" }
        ],
        phoneNumber: [
          { required: true, message: "手机号必填", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "电话号必填", trigger: "blur" },
          { validator: checkTelephone, trigger: "blur" }
        ],
        emailes: [
          { required: true, message: "邮箱必填", trigger: "blur" },
          { type: "email", message: "邮箱格式错误", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名必填", trigger: "blur" },
          { validator: checkUserName, trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "密码必填", trigger: "blur" },
          { validator: checkPassWord, trigger: "blur" }
        ],
        weChat: [
          { required: true, message: "微信号必填", trigger: "blur" },
          { validator: checkWeChat, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs.formDom.resetFields(); //重置表单
    },
    submitForm() {
      this.$refs.formDom.validate(valid => {
        if (valid) {
          console.log("提交成功");
          // let { data } = await fromByLevel(this.dataForm);
          // if (data.code !== 0) return this.$message.error("调用失败");
          // console.log(data);
        } else {
          console.log("提交失败");
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
