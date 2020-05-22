<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{
      label
    }}</label>
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
import AsyncValidator from "async-validator";
import emitMixin from "../mixins/setEmit";
export default {
  name: "iFormItem",
  mixins: [emitMixin],
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: ""
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
  //通过计算属性动态获取到表单中的数据
  computed: {
    //由于prop的字段名和input双项数据绑定的字段名一样。
    fieldValue() {
      return this.form.model[this.prop];
    }
  },

  methods: {
    //从校验规则获取必填规则标记出来
    setRules() {
      let rules = this.getRules();
      console.log(rules, 1);
      if (rules.length) {
        rules.every(rule => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required;
        });
      }
    },

    // 从form中获取校验规则
    getRules() {
      let formRules = this.form.rules;
      console.log(formRules, 0);
      formRules = formRules ? formRules[this.prop] : [];

      return [].concat(formRules || []);
    },
    //过滤出blur的校验规则
    getFilterRules(val) {
      const rules = this.getRules();
      return rules.filter(
        item => !item.trigger || item.trigger.indexOf(val) !== -1
      );
    },
    validate(val, callback = function() {}) {
      let rules = this.getFilterRules(val);
      if (!rules || rules.lenght === 0) {
        return false;
      }
      // 设置状态为校验中
      this.validateState = "validating";
      //创建一个校验规则对象
      let descriptor = {};
      descriptor[this.prop] = rules;
      //创建要校验的数据对象
      let model = {};
      model[this.prop] = this.fieldValue;
      const validator = new AsyncValidator(descriptor);
      //当数据不符合校验规则时，在 validator.validate 的回调函数中，就可以得到相应的错误信息。
      validator.validate(model, { firstFields: true }, errors => {
        //根据errors判断校验状态
        this.validateState = !errors ? "seccess" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    //监听input失去焦点
    onFieldBlur() {
      this.validate("blur");
    }
    //重置数据
    //  resetField () {
    //   this.validateState = '';
    //   this.validateMessage = '';

    //   this.form.model[this.prop] = this.initialValue;
    // },
  },
  mounted() {
    if (this.prop) {
      //组件渲染时，将实例缓存到form中。
      this.dispatch("iForm", "on-form-item-add", this);

      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue;
    }
    this.setRules();
    //通过$emit触发自定义事件，并且通过$on监听到事件触发，两者可以在同一个组件中使用。
    this.$on("on-form-blur", this.onFieldBlur);
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
