<template>
  <router-view v-slot="{ Component }">
     <layoutSuspense>
          <component :is="Component"></component>
      </layoutSuspense>
  </router-view>
</template>
