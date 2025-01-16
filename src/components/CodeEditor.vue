<template>
  <div
    id="code-editor"
    ref="codeEditorRef"
    style="min-height: 400px; height: 80vh"
  />
</template>

<script setup lang="ts">
import * as monaco from "monaco-editor";
import { ref, watch, withDefaults, defineProps, onMounted, toRaw } from "vue";

interface Props {
  value: string;
  language?: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: "",
  language: "Go",
  handleChange: (v: string) => {
    console.log(v);
  },
});

const codeEditorRef = ref();
const codeEditor = ref();

// Watch for changes in the language prop
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);

onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  // Initialize Monaco editor
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: { enabled: true },
    readOnly: false,
    theme: "vs-dark",
  });

  // Handle content change and call handleChange
  codeEditor.value.onDidChangeModelContent(() => {
    const newValue = toRaw(codeEditor.value).getValue();
    props.handleChange(newValue);
  });
});
</script>

<style scoped></style>
