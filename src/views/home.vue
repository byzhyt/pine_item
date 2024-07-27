<template>
  <div @click="onTapChange" class="flex-row justify-start flex-wrap">
    <div class="p-12px flex-1 max-w-200px min-w-200px min-h-200px" v-for="i in list">home{{ i }}</div>
  </div>
</template>
<script setup lang="ts">

const router = useRouter();
const list: any = ref([]);
onBeforeMount(() => {
  for (let i = 0; i < 50; i++) {
    list.value.push(i);
  }
});
onMounted(() => {

  setDictList({
    type: "pageLoading",
    data: false
  });
});
const onTapChange = () => {
  router.push("/list");
};
</script>
