<template>
  <section ref="loginHtml" class="flex-col bg-white" :style="pagejson.bgimg">
    <div class="flex-1 flex-row justify-center align-center overflow-y-auto">
      <div class="flex-row align-center bg-white flex-wrap radius-15px login-shaow overflow-hidden"
        :class="appVersion == 'pc' ? 'w-700px h-360px' : 'w-90%'">
        <div v-if="appVersion == 'pc'" class="flex-1 justify-center h-100% flex-col bg-login gap-20px color-light">
          <div class="flex-1 flex-col justify-center gap-20px ">
            <p class="flex-row justify-center">
              <pv-icon :preview="false" className="w-80px h-80px overflow-hidden radius-full"
                :icon="pagejson.logo"></pv-icon>
            </p>
            <p class="justify-center flex-row text-h2">超级平台后端管理系统</p>
          </div>
          <p class="justify-center flex-row gap-20px m-30px text-h4">
            <span>{{ pagejson.dateHtml }}</span>
            <span>{{ pagejson.weekHtml }}</span>
          </p>
        </div>
        <PageLogin :option="pagejson.loginJson" class="flex-1 p-20px"></PageLogin>
      </div>
    </div>
    <layoutFooter class="p-20px flex-row justify-center"> </layoutFooter>
  </section>
</template>

<script setup lang="ts">
import {loginJson,userFindPhonePassword} from "@/scripts/login";


const appVersion = computed(() => getAppVersion());
const pagejson: any = reactive({
  loginJson,
  dateHtml: '',
  weekHtml: '',
  timenull: null,
  logo: setFilePath('/bg-login.jpg'),
  bgimg: {
    'background-image': `url(${setFilePath('/bg-login.jpg')})`,
    'background-size': '100% 100%'
  },
  formdata: {}
});

const weekHtml: any = inject('weekHtml');
const dateHtml: any = inject('dateHtml');
const dateResetTime = () => {
  pagejson.weekHtml = weekHtml()
  const setTimeHtml = () => {
    pagejson.dateHtml = dateHtml()
  }
  setTimeHtml();
  clearInterval(pagejson.timenull)
  pagejson.timenull = setInterval(setTimeHtml, 1000)
}
onBeforeMount(() => {
  dateResetTime()
});
onBeforeUnmount(() => {
  clearInterval(pagejson.timenull)
  pagejson.timenull = null;
})
</script>

<style lang="scss" scoped>
.login-shaow {
  @include shadow('1', (0px 2px 10px #a1a0a0))
}

.bg-login {
  $line: var(--el-color-primary) 90%, transparent, var(--el-color-success) 20%;
  @include bgramp('line', (-135deg, $line))
}
</style>