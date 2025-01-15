<template>
  <div id="QuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs>
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question?.title">
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question?.judge_config.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question?.judge_config.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question?.judge_config.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question?.content" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question?.tags"
                    :key="index"
                    color="
                    green"
                  >
                    {{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="content" title="评论">评论区 </a-tab-pane>
          <a-tab-pane key="answer" title="答案">
            <!-- <MdViewer :value="question?.answer" /> -->
            暂时无法查看答案
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <CodeEditor />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit"
          >提交答案</a-button
        >
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  getApiV1QuestionsByQuestionId,
  postApiV1Questionsubmit,
} from "@/client";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { Message } from "@arco-design/web-vue";
import { ref, onMounted, watchEffect, withDefaults, defineProps } from "vue";

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref();

const loadData = async () => {
  console.log(props.id);
  const res = await getApiV1QuestionsByQuestionId(props.id as any);
  if (res.status === 200) {
    question.value = res.data.question;
  } else {
    Message.error("加载失败");
  }
};
const form = ref({
  language: "cpp",
  code: "",
});
const doSubmit = async () => {
  const res = await postApiV1Questionsubmit(form.value);
  if (res.status === 200) {
    Message.success("提交成功");
  } else {
    Message.error("提交失败" + res.error);
  }
};
onMounted(() => {
  loadData();
});

watchEffect(() => {
  loadData();
});
</script>

<style>
#ViewQuestion {
  max-width: 1280px;
  margin: auto;
}
</style>
