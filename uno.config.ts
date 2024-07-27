import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  presetTypography
} from "unocss";

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|ts|js|mdx?|html)($|\?)/]
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography()
  ],
  shortcuts: {
    "width-full": "w-full",
    "height-full": "h-full",
    "flex-col": "flex-col flex-row",
    "flex-row": "flex",
    "flex-1": "flex-1",
    "align-center": "items-center",
    "align-start": "items-start",
    "align-end": "items-end",
    "justify-start": "flex-justify-start",
    "justify-center": "flex-justify-center",
    "justify-end": "flex-justify-end",
    "text-h1": "text-20px",
    "text-h2": "text-18px",
    "text-h3": "text-16px",
    "text-h4": "text-14px",
    "radius-full": "border-rounded-100%",
    "radius-10px": "border-rounded-10px",
    "radius-5px": "border-rounded-5px",
    "radius-8px": "border-rounded-8px",
    "radius-15px": "border-rounded-15px"
  },
  theme: {
    colors: {
      h1: "var(--color-h1)",
      h2: "var(--color-h2)",
      h3: "var(--color-h3)",
      line: "var(--color-line)",
      bgc: "var(--el-bg-color)",
      primary: "var(--el-color-primary)",
      success: "var(--el-color-success)",
      error: "var(--el-color-error)",
      warning: "var(--el-color-warning)",
      info: "var(--el-color-info)",
      danger: "var(--el-color-danger)"
    }
  }
});
