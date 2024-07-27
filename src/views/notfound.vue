<template>
  <el-result icon="warning" title="未找到页面" sub-title=" 很抱歉！您放问题页面不存在。">
    <template #extra>
      <el-button @click="onDialogVisible" type="primary">
        返回首页
      </el-button>
    </template>
  </el-result>
</template>

<script setup lang="ts">
const router = useRouter();
const onDialogVisible = () => {
  router.push("/");
};
</script>
