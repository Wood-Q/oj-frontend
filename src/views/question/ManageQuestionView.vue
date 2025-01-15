<template>
  <div id="ManageQuestionView">
    <h2>管理题目</h2>
    <a-table
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.page_size,
        current: searchParams.page,
        total: total,
      }"
      @page-change="onPageChange"
    >
      <template #answer="{ record }">
        <span>{{ record.answer || "无数据" }}</span>
      </template>
      <template #judge_case="{ record }">
        <span>{{ JSON.stringify(record.judge_case) || "无数据" }}</span>
      </template>
      <template #judge_config="{ record }">
        <span>{{ JSON.stringify(record.judge_config) || "无数据" }}</span>
      </template>
      <template #tags="{ record }">
        <span>{{ record.tags.join(", ") }}</span>
      </template>
      <template #submitnum="{ record }">
        <span>{{ record.submitnum }}</span>
      </template>
      <template #acceptednum="{ record }">
        <span>{{ record.acceptednum }}</span>
      </template>
      <template #user_id="{ record }">
        <span>{{ record.user_id }}</span>
      </template>
      <template #CreatedAt="{ record }">
        <span>{{ record.CreatedAt }}</span>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doChange(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import {
  deleteApiV1QuestionsByQuestionId,
  getApiV1QuestionsByPage,
} from "@/client";
import { Message } from "@arco-design/web-vue";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  page: 1,
  page_size: 10,
});

const loadData = async () => {
  const res = await getApiV1QuestionsByPage(
    searchParams.value.page_size,
    searchParams.value.page,
    "",
    []
  );
  if (res.status === 200) {
    dataList.value = res.data.questions;
    total.value = res.data.total_count;
  } else {
    Message.error("加载失败");
  }
};
onMounted(() => {
  loadData();
});

const onPageChange = (pageNum: number) => {
  searchParams.value = {
    page: pageNum,
    page_size: searchParams.value.page_size,
  };
};

const doChange = async (question: any) => {
  router.push({
    path: "/question/update",
    query: {
      question_id: question.question_id,
    },
  });
};

const doDelete = async (question: any) => {
  const res = await deleteApiV1QuestionsByQuestionId(question.question_id);
  if (res.status === 200) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("删除失败");
  }
};

const columns = [
  { title: "ID", dataIndex: "question_id" },
  { title: "标题", dataIndex: "title" },
  { title: "内容", dataIndex: "content" },
  { title: "标签", slotName: "tags" },
  { title: "答案", slotName: "answer" },
  { title: "判题用例", slotName: "judge_case" },
  { title: "判题配置", slotName: "judge_config" },
  { title: "提交数", slotName: "submitnum" },
  { title: "通过数", slotName: "acceptednum" },
  { title: "用户id", slotName: "user_id" },
  { title: "创建时间", slotName: "CreatedAt" },
  { title: "操作", slotName: "optional" },
];

watchEffect(() => {
  loadData();
});
</script>
