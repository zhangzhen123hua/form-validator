function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    // 向上遍历 。参1：组件的name值，参2：自定义事件名，参3：传递的数据
    //this.$parent 可访问到最近一级父组件的实例
    //this.$root 可访问到根父组件的实例
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;
      //满足条件：有父级组件并且组件上不能没有name值或name值不符合要求。后继续向上遍历。
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    // 向下遍历 。参1：组件的name值，参2：自定义名，参3：传递的数据
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
