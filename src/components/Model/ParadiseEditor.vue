<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, shallowRef } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { computed } from "vue";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
const prop = defineProps({
  content: String,
});
const emit = defineEmits(["update:content"]);
const valueHtml = computed({
  get() {
    return prop.content;
  },
  set(value) {
    emit("update:content", value);
  },
});
const toolbarConfig = {
  excludeKeys: [
    "insertTable",
    "group-image",
    "group-video",
    "undo",
    "redo",
    "fullScreen",
    "|",
    "todo",
  ],
};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor;
};
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
