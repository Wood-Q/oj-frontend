<template>
  <div id="AddQuestionView">
    <h2>创建题目</h2>
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input
          v-model="form.body.title"
          :style="{ width: '320px' }"
          placeholder="请输入标题"
        />
      </a-form-item>
      <a-form-item field="tags" label="标签">
        <a-input-tag
          v-model="form.body.tags"
          :style="{ width: '320px' }"
          placeholder="输入标签"
          allow-clear
        />
      </a-form-item>
      <a-form-item field="content" label="题目内容">
        <MdEditor :value="form.body.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.body.answer" :handle-change="onAnswerChange" />
      </a-form-item>
      <a-form-item label="判题配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="form.judge_config.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.body.judge_config.timeLimit"
              placeholder="请输入时间限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="form.judge_config.memoryLimi" label="内存限制">
            <a-input-number
              v-model="form.body.judge_config.memoryLimit"
              placeholder="请输入内存限制"
              mode="button"
              size="large"
            />
          </a-form-item>
          <a-form-item field="form.judge_config.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.body.judge_config.stackLimit"
              placeholder="请输入堆栈限制"
              mode="button"
              size="large"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item
        label="测试用例配置"
        :content-flex="false"
        :merge-props="false"
      >
        <a-form-item
          v-for="(judge_case_item, index) of form.body.judge_case"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 640px">
            <a-form-item
              :field="`form.judge_case[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judge_case_item.input"
                placeholder="请输入输入用例"
              />
            </a-form-item>
            <a-form-item
              :field="`form.judge_case[${index}].output`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judge_case_item.output"
                placeholder="请输入输出用例"
              />
            </a-form-item>
            <a-button @click="handleDelete(index)" status="danger"
              >删除</a-button
            >
          </a-space>
        </a-form-item>
        <div style="margin-top: 32px">
          <a-button @click="handleAdd" type="outline" status="success"
            >新增用例</a-button
          >
        </div></a-form-item
      ><a-form-item>
        <div style="margin-top: 16px">
          <a-button type="primary" style="min-width: 200px" @click="doSubmit"
            >提交</a-button
          >
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  getApiV1QuestionsByQuestionId,
  postApiV1Questions,
  PostApiV1QuestionsData,
  putApiV1QuestionsByQuestionId,
  PutApiV1QuestionsByQuestionIdData,
} from "@/client";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const loadData = async () => {
  const id = route.query.question_id;
  if (!id) return;
  const res = await getApiV1QuestionsByQuestionId(id as any);
  if (res.status === 200) {
    console.log(res.data);
    form.body = res.data.question;
  } else {
    Message.error("加载题目失败" + res.error);
  }
};

onMounted(() => {
  loadData();
});

const form = reactive({
  body: {
    title: "",
    content: "",
    answer: "",
    tags: [],
    judge_case: [
      {
        input: "",
        output: "",
      },
    ],
    judge_config: {
      memoryLimit: 100,
      stackLimit: 100,
      timeLimit: 100,
    },
  },
} as PostApiV1QuestionsData);

const doSubmit = async () => {
  console.log(form.body);
  const questionId = route.query.question_id as any; // 从路由获取 question_id
  if (questionId) {
    // 更新已有题目
    const data: PutApiV1QuestionsByQuestionIdData = {
      body: form.body,
      path: {
        question_id: questionId,
      },
    };
    const res = await putApiV1QuestionsByQuestionId(questionId, data);
    if (res.status === 200) {
      Message.success("更新成功");
    } else {
      Message.error("更新失败" + res.error);
    }
  } else {
    const res = await postApiV1Questions(form);
    if (res.status === 200) {
      Message.success("创建成功");
    } else {
      Message.error("创建失败" + res.error);
    }
  }
};
const handleAdd = () => {
  if (form.body.judge_case) {
    form.body.judge_case.push({
      input: "",
      output: "",
    });
  }
};
const handleDelete = (index: number) => {
  if (form.body.judge_case) {
    form.body.judge_case.splice(index, 1);
  }
};

const onContentChange = (value: string) => {
  form.body.content = value;
};
const onAnswerChange = (value: string) => {
  form.body.answer = value;
};
</script>

<style scoped>
#AddQuestionView {
}
</style>
