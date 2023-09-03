<script>
import { ref } from "vue";
import Todolist from "./components/Todolist.vue";
import { apiGetTodolistRequest } from "@/api";

export default {
  components: {
    Todolist,
  },
  setup() {
    const tableData = ref([]);

    (async () => {
      const { status, data } = await apiGetTodolistRequest();
      if (status) {
        tableData.value = data.data.map((item, index) => {
          return {
            ...item,
            id: index,
            name: "user" + index,
          };
        });
      }
    })();

    console.log(tableData);
    return { tableData };
  },
};
</script>

<template>
  <Todolist :tableData="tableData" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
