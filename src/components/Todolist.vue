<script>
import { ref, computed } from "vue";
import editWindow from "@/components/Edit.vue";
import { ElMessageBox, ElMessage } from "element-plus";

export default {
  components: {
    editWindow,
  },
  props: ["tableData"],
  setup(props) {
    const dialogFormVisible = ref(false);
    const search = ref("");
    console.log(props.tableData, 123);
    const filterTableData = computed(() => {
      return props.tableData.filter(
        (data) =>
          !search.value ||
          data.url.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    const editWindowRef = ref(null);
    const handleEdit = (index, row) => {
      editWindowRef.value.setInitData({
        id: row.id,
        name: row.name,
        url: row.url,
      });
      dialogFormVisible.value = true;
    };

    const handleDelete = (index, row) => {
      ElMessageBox.confirm("Are you sure to delete this data?", "Warning", {
        type: "info",
        // cancelButtonText: "取消",
        // confirmButtonText: "確認",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            const rowIndex = props.tableData.findIndex(
              (item) => item.id === row.id
            );
            props.tableData.splice(rowIndex, 1);
          }
          done();
        },
      })
        .then(() => {
          ElMessage.success("删除成功");
          done();
        })
        .catch(() => {
          // ElMessage.error("删除失敗");
        });
    };

    return {
      props,
      editWindowRef,
      dialogFormVisible,
      filterTableData,
      search,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<template>
  <el-table :data="filterTableData">
    <el-table-column label="Name" prop="name" />
    <el-table-column label="url" prop="url" />
    <el-table-column align="right">
      <template #header>
        <el-input
          v-model="search"
          size="small"
          placeholder="keyword to search"
        />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <editWindow
    ref="editWindowRef"
    :tableData="tableData"
    v-model:dialogFormVisible="dialogFormVisible"
  >
    <template v-slot:btn>
      <button>slot範例一</button>
    </template>
    <button>slot範例二</button>
  </editWindow>
</template>



<style>
</style>