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
          console.log("Arquivos enviados com sucesso:", response);
        })
        .catch((error) => {
          console.error("Erro ao enviar arquivos:", error);
        });
    },
    // readXLSXFile(file) {
    //   const reader = new FileReader();
    //   reader.onload = (e) => {
    //     const data = e.target.result;
    //     const workbook = XLSX.read(data, { type: "binary" });

    //     const firstSheetName = workbook.SheetNames[0];
    //     const worksheet = workbook.Sheets[firstSheetName];

    //     // Converte a planilha para JSON
    //     const json = XLSX.utils.sheet_to_json(worksheet);

    //     console.log("Dados da Planilha XLSX:", json);
    //   };
    //   reader.readAsBinaryString(file);
    // },
    // parseCSV(event) {
    //   const file = event.target.files[0];
    //   if (!file) return;

    //   Papa.parse(file, {
    //     complete: (results) => {
    //       console.log("Dados do CSV:", results.data);
    //     },
    //     header: true, // Usa a primeira linha como cabeçalhos
    //     skipEmptyLines: true,
    //     dynamicTyping: true,
    //   });
    // },
  },
};
</script>
