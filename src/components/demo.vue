<script setup></script>
<template>
  <el-card>
    <template #header>
      <el-steps :active="1">
        <el-step title="Step 1" description="Some description" />
        <el-step title="Step 2" description="Some description" />
        <el-step title="Step 3" description="Some description" />
      </el-steps>
    </template>
    <el-descriptions title="Customized style list" :column="2" border style="width: 
    50%;">
      <el-descriptions-item
        label="Username"
        label-align="right"
        align="center"
      >
        kooriookami
      </el-descriptions-item>
      <el-descriptions-item
        label="Telephone"
        label-align="right"
        align="center"
      >
        18100000000
      </el-descriptions-item>
      <el-descriptions-item label="Place" label-align="right" align="center">
        <el-button type="primary">挂号</el-button>
      </el-descriptions-item>
    </el-descriptions>
    <div class="card-footer">
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
    </div>
  </el-card>
</template>
<style scoped>
.card-footer {
  margin-top: 30px;
}
</style>
