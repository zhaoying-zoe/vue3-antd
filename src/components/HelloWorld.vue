<script setup lang="ts">
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue';
import { usePublicStore, useUserInfoStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const usePublic = usePublicStore();

// 监听数据的变化 -- 相当于 watch
usePublic.$subscribe((args, state) => {
  console.error('args', args)
  console.error('state', state)
})

// const useUserInfo = useUserInfoStore();

// const { name, getName } = storeToRefs(usePublic);
// console.error('usePublic', usePublic);
console.error('usePublic', usePublic.name);
// console.error('storeToRefs(usePublic)', storeToRefs(usePublic));
// name = 12312312;
// console.error('name', name.value = '小陈'); // 小陈
// 将 store 的值重置为初始值
// usePublic.$reset();
// console.error('name', name); // tom
// console.error('getName', getName());

// console.error('store', usePublic);
// console.error('store.getUserMsg', usePublic.getUserMsg);

// console.error('useUserInfo', useUserInfo.changeName('小陈'));
// console.error('useUserInfo', useUserInfo);

// let per = reactive({
//   surname:'勇敢',
//   name:'小陈'
// })
// per.fullName = computed({
//   get() {
//     return per.surname + '~' + per.name
//   },
//   set(value) {
//     var arr=value.split('~')
//     per.surname = arr[0]
//     per.name = arr[1]
//   }
// })

// console.error('per', per.fullName);

onMounted(() => {
  console.error('onMounted-----');
})

// ref的使用 --- 一般用于基本类型
const numRef = ref(1);
// reactive的使用
const objReactive = reactive({
  msg: 'Hello'
});
// 可读的计算属性
const numRefComputed = computed(() => {
  return numRef.value + 1;
});

// console.error('numRef', numRef);
// console.error('numRefComputed', numRefComputed);

// 可写的计算属性
const numRefComputed2 = computed({
  get() {
    return numRef.value + 101;
  },
  set(value) {
    numRef.value = value;
  }
});

// 可读的计算属性-reactive
const objCreateComputed = computed(() => {
  return {
    name: 'objCreateComputed',
    age: 18
  }
});

const context = getCurrentInstance();

function changeStore() {
  // 通过 getCurrentInstance 方法获取到当前组件的上下文
  console.error('context', context);
  context?.appContext.config.globalProperties.$message.success({
    content: '修改成功'
  });
  
  // this.$message();
  // usePublic.$reset();

  // 修改 state -- 方法1
  usePublic.$patch({
    userMsg: [1, 2, 3],
    name: 1812312312312321
  });

  setTimeout(() => {
    // 修改 state -- 方法2
    usePublic.$patch((state) => {
      state.name = '小陈';
    });
  }, 3000);
  
  setTimeout(() => {
    // 替换 state
    usePublic.$state = { userMsg: [], name: 'xx' };
    console.error('usePublic.$state', usePublic.$state);
  }, 3000);
}

// console.error('numRefComputed2', numRefComputed2);
// console.error('numRefComputed2', numRefComputed2.value = 22222);

// console.error('objCreateComputed.value', objCreateComputed.value);
// objCreateComputed.name = 'sfsdfsadf' // 只读属性无法修改,就算修改了,也不生效

defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <div>message:::{{ gloMessage }}</div>
    <button @click="changeStore">修改store</button>
    <div>store:::{{ usePublic.name }}</div>
    <div class="green">{{ objReactive.msg }} my name is {{ objCreateComputed.name }}</div>
    <div class="green">My age is {{ objCreateComputed.age }}</div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
