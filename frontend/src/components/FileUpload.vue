<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-file-input
        label="Selecione arquivos"
        accept=".xlsx,.csv"
        @change="handleFileUpload"
        multiple
      ></v-file-input>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "FileUpload",

  data: () => ({}),
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      axios
        .post(process.env.VUE_APP_BASE_API + "/file-upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.$emit("file-uploaded", response.data.id);
        })
        .catch((error) => {
          console.error("Erro ao enviar arquivos:", error);
        });
    },
  },
};
</script>
