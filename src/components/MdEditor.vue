<template>
  <Editor
    :value="value"
    :mode="mode"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import { Editor } from "@bytemd/vue-next";
import { defineProps } from "vue";

interface Props {
  value: string;
  mode: string;
  handleChange: (v: string) => void;
}

const plugins = [
  gfm(),
  highlight(),
  // Add more plugins here
];

// 使用 defineProps 并直接提供默认值
const props = defineProps({
  value: { type: String, default: "" },
  mode: { type: String, default: "split" },
  handleChange: {
    type: Function,
    default: (v: string) => {
      console.log(v);
    },
  },
});
</script>
