# form-validator

1.校验在form-item中完成

- 获取form 组件的rules属性拿到校验的规则

  ~~~js
  1.通过provide将form组件的实例传递给form-item组件，form-item组件通过inject接受
  2.provide（传递）和inject（接受）需一起使用，两者不是响应式。
  3.不论组件层次有多深(普通组件传值只能父子或兄弟关系)，并在起上下游关系成立的时间里始终生效。
  4.使用场景：插件和组件库的开发中，祖先组件向后代组件传递数据。
  //form组件
  export default {
      provide() {
          return {
              form: this
          };
      }
  }
  //form-item组件
  export default {
      inject: ["form"] //字符串数组
  }
  //在form-item组件中通过this.form 获取到数据
  
  
  ~~~

  

