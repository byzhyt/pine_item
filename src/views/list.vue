<template>
  <div @click="onTapChange" class="flex-row flex-wrap">
    <div class="p-12px flex-1 min-w-200px min-h-200px" v-for="i in list">list{{ i }}</div>
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
  router.push("/home");
};
</script>
