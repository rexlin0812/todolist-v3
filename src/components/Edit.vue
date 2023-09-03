
<script>
import { reactive, ref, nextTick } from "vue";
import { useVModel } from "@vueuse/core";

export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    handleSave: {
      type: Function,
      default: () => {},
    },
    tableData: {
      type: Object,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const modalShow = useVModel(props, "dialogFormVisible", emit);
    const editRef = ref(null);

    const rules = reactive({
      name: [
        { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
      ],
    });

    const formData = reactive({
      id: "",
      name: "",
      url: "",
    });

    const handleSave = async (formEl) => {
      if (!formEl) return;
      //表單驗證
      await formEl.validate((valid, fields) => {
        if (valid) {
          const updateData = props.tableData.filter(
            (data) => data.id == formData.id
          );
          updateData[0].name = formData.name;
          updateData[0].url = formData.url;
          modalShow.value = false;
          return;
        }
        console.log("error submit!", fields);
      });
    };

    const setInitData = (params) => {
      Object.assign(formData, params);
    };

    return {
      handleSave,
      formData,
      setInitData,
      modalShow,
      editRef,
      rules,
    };
  },
};
</script>
<template>
  <el-dialog v-model="modalShow" title="">
    <el-form ref="editRef" :rules="rules" :model="formData">
      <el-form-item label="name" prop="name" label-width="140px">
        <el-input v-model="formData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="url" label-width="140px">
        <el-input v-model="formData.url" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="modalShow = false">Cancel</el-button>
        <el-button type="primary" @click="handleSave(editRef)">
          Save
        </el-button>
        <slot name="btn"></slot>
        <slot></slot>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>