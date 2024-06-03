<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "@/data/config.js";
import zhCn from "/node_modules/element-plus/es/locale/lang/zh-cn.mjs";


//本地化处理
const locale = zhCn;
//数据源
const Store = ref({});
const ConfigStore = useConfigStore();
//路由
const router = useRouter();
//被选中的列表项
const selection = ref([]);
//读取传递的属性
const prop = defineProps({
  store: Object,
  columnData: Array,
  path: Object,
});
//表格数据配置
const tableSetting = reactive({
  data: [],
  column: [],
  save: "",
  update: "",
});
//数据导航配置
const paginationSetting = reactive({
  currentPage: 1,
  pageSizeList: [10, 20, 50, 100],
  pageSize: 10,
  count: 0,
});

//读取属性
onMounted(() => {
  tableSetting.column = prop.columnData;
  Store.value = prop.store;
  tableSetting.save = prop.path.savePath;
  tableSetting.update = prop.path.updatePath;
});

//获取数据
onMounted(() => {
  refresh();
});

//刷新数据
const refresh = async () => {
  //分页获取数据列表
  await Store.value.getDataList(paginationSetting.pageSize, paginationSetting.currentPage);
  tableSetting.data = Store.value.ListData;
  //获取数据总数
  await Store.value.getDataCount();
  paginationSetting.count = Store.value.CountData;
};

//当 表格一页显示的条数变动时 重新更新数据
const handleSizeChange = async () => {
  refresh();
};

//当 切换表格页数时 重新更新数据
const handleCurrentChange = async () => {
  refresh();
};

//当多选框被选中时 执行此方法
const delMulti = async () => {
  await Store.value.deleteMultiData(selection.value);
  refresh();
};

const del = async (row) => {
  await Store.value.deleteData(row);
  refresh();
};

const handleSelectionChange = (rows) => {
  selection.value = rows;
};

const toSave = () => {
  router.push(tableSetting.save);
};

const update = (row) => {
  Store.value.setUpdateId(row);
  router.push(tableSetting.update);
};
</script>

<template>
  <el-card>
    <template #header>
      <el-button plain type="primary" icon="CirclePlusFilled" @click="toSave"> 添加 </el-button>
      <el-button plain type="danger" icon="DeleteFilled" @click="delMulti" v-if="selection.length != 0"> 批量删除 </el-button>
    </template>

    <el-config-provider :locale="locale">
      <el-table :data="tableSetting.data" stripe max-height="480px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" />
        <el-table-column
          v-for="col in tableSetting.column"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align"
          :show-overflow-tooltip="col.overflow"
        />
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <el-button type="success" icon="Edit" @click="update(scope.row)"> 修改 </el-button>
            <el-button type="danger" icon="Delete" @click="del(scope.row)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        v-model:current-page="paginationSetting.currentPage"
        v-model:page-size="paginationSetting.pageSize"
        :page-sizes="paginationSetting.pageSizeList"
        :total="paginationSetting.count"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </el-card>
</template>
