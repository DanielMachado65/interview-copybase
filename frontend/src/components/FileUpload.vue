<template>
  <v-row class="text-center">
    <v-col cols="12">
      <v-file-input
        label="Selecione um arquivo"
        accept=".xlsx,.csv"
        @change="handleFileUpload"
      ></v-file-input>
    </v-col>
  </v-row>
</template>

<script>
import * as XLSX from "xlsx";
import Papa from "papaparse";

export default {
  name: "FileUpload",

  data: () => ({}),
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Verifica a extensão do arquivo
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension === "xlsx") {
        this.readXLSXFile(file);
      } else if (fileExtension === "csv") {
        this.parseCSV(event);
      } else {
        // Mensagem de erro ou lógica para tipos de arquivo inválidos
        console.error("Tipo de arquivo não suportado");
      }
    },
    readXLSXFile(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });

        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Converte a planilha para JSON
        const json = XLSX.utils.sheet_to_json(worksheet);

        console.log("Dados da Planilha XLSX:", json);
      };
      reader.readAsBinaryString(file);
    },
    parseCSV(event) {
      const file = event.target.files[0];
      if (!file) return;

      Papa.parse(file, {
        complete: (results) => {
          console.log("Dados do CSV:", results.data);
        },
        header: true, // Usa a primeira linha como cabeçalhos
        skipEmptyLines: true,
        dynamicTyping: true,
      });
    },
  },
};
</script>
