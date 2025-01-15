<template>
  <div id="QuestionView">
    <h2>浏览题目</h2>
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="name" label="名称" style="min-width: 240px">
        <a-input v-model="searchParams.title" placeholder="请输入名称" />
      </a-form-item>
      <a-form-item field="post" label="标签" style="min-width: 240px">
        <a-input-tag v-model="searchParams.tags" placeholder="请输入标签" />
      </a-form-item>
      <!-- <a-form-item>
        <a-button type="primary" @click="doSearch">搜索</a-button>
      </a-form-item> -->
    </a-form>
    <a-divider size="0" />
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
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            color="green"
            >{{ tag }}</a-tag
          >
        </a-space>
      </template>

      <template #acceptedRate="{ record }">
        <span>{{
          ` ${record.Submit ? record.acceptedNum / record.submitNum : "0"}(${
            record.acceptedNum
          }/${record.submitNum})`
        }}</span>
      </template>
      <template #CreatedAt="{ record }">
        <span>{{ moment(record.CreatedAt).format("YYYY-MM-DD") }}</span>
      </template>

      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="toQuestion(record)">做题</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { getApiV1QuestionsByPage } from "@/client";
import { Message } from "@arco-design/web-vue";
import { ref, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  title: "",
  tags: [],
  page: 1,
  page_size: 5,
});

const loadData = async () => {
  const res = await getApiV1QuestionsByPage(
    searchParams.value.page_size,
    searchParams.value.page,
    searchParams.value.title,
    searchParams.value.tags
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
    title: searchParams.value.title,
    tags: searchParams.value.tags,
    page: pageNum,
    page_size: searchParams.value.page_size,
  };
};

// const doSearch = () => {
//   searchParams.value = {
//     title: searchParams.value.title,
//     tags: searchParams.value.tags,
//     page: 1,
//     page_size: searchParams.value.page_size,
//   };
//   loadData();
// };

const toQuestion = async (question: any) => {
  router.push({
    path: `/view/question/${question.question_id}`,
  });
};

const columns = [
  { title: "题号", dataIndex: "question_id" },
  { title: "题目名称", dataIndex: "title" },
  { title: "标签", slotName: "tags" },
  { title: "通过率", slotName: "acceptedRate" },
  { title: "创建时间", slotName: "CreatedAt" },
  { title: "操作", slotName: "optional" },
];

watchEffect(() => {
  loadData();
});
</script>

<style>
#QuestionView {
  max-width: 1280px;
  margin: auto;
}
</style>
