<template>
  <FileUpload />
</template>

<script>
import { defineComponent } from "vue";

// Components
import FileUpload from "../components/FileUpload.vue";

export default defineComponent({
  name: "FileView",

  components: {
    FileUpload,
  },
});
</script>
