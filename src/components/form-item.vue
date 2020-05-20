<template>
  <div>
    <label :class="{ 'i-form-item-label-required': isRequired }"
      >{{ label }}
    </label>
    <div>
      <slot></slot>
      <!-- 校验提示信息 -->
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>
<script>
// import AsyncValidator from "async-validator";
import emitMixin from "../mixins/setEmit";
export default {
  name: "iFormItem",
  mixins: [emitMixin],
  //接受祖先组件的数据
  inject: ["form"],
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  data() {
    return {
      isRequired: false, //是否必填
      validateState: "", // 校验状态
      validateMessage: "" // 校验不通过时的提示信息
    };
  },
  computed: {
    //由于prop的字段名和input双项数据绑定的字段名一样。
    inputData() {
      return this.form.model[this.prop];
    }
  },
  created() {
    //通过$emit触发自定义事件，并且通过$on监听到事件触发，两者可以在同一个组件中使用。
    this.$on("on-form-blur", this.onFieldBlur);
  },
  methods: {
    //必填项操作
    setRules() {
      let rules = this.getRules();
      if (rules.lenght) {
        rules.forEach(element => {
          //必填标记
          this.isRequired = element.required;
        });
      }
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    //过滤出符合要求的校验规则
    getFilterRules(trigger) {
      const rules = this.getRules();
      if (rules.lenght) {
        rules.filter(
          item => !item.trigger || item.trigger.indexOf(trigger) !== -1
        );
      }
    },
    //监听事件
    onFieldBlur() {
      console.log(22222222);
    }

    //验证数据,  trigger:校验的类型, 参数2：回调函数
    // validate(trigger, callback = function() {}) {
    //   let rules = this.getFilterRules(trigger);
    //   if (!rules || rules.lenght === 0) return false;
    // }
  }
};
</script>
<style>
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
