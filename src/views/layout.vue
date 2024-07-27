<template>
  <section class="flex-col">
    <layoutHeader>
      <template #logo>
        <div class="min-w-180px">78798</div>
      </template>
    </layoutHeader>
    <div class="flex-row flex-1 overflow-y-auto">
      <div class="overflow-y-auto min-w-180px bg-white" v-if="isMenuShow">
        <pv-menu :items="menusList"></pv-menu>
      </div>
      <div class="flex-1 overflow-y-auto p-10px " v-loading="pageLoading">
        <router-view class="height-full p-10px radius-10px overflow-y-auto">
        </router-view>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const menusList = computed(() => getDictList("menuList"));
const pageLoading = computed(() => {
  return getDictList("pageLoading")
});

const route: any = useRoute();
watchEffect(() => {
  setDictList({
    type: "pageLoading",
    data: route.meta?.loading
  });
});
const isMenuShow = computed(
  () => (route.meta?.isMenuShow ?? true) && menusList.value.length
);
</script>
