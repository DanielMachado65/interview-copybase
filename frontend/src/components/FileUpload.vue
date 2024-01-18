<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-1">Envio de arquivo</h1>
        <v-file-input
          label="Selecione um arquivo"
          accept=".xlsx,.csv"
          @change="handleFileUpload"
        ></v-file-input>
      </v-col>
    </v-row>
  </v-container>
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
        console.log("workbook", workbook);
      };
      reader.readAsBinaryString(file);
    },
    parseCSV(event) {
      const file = event.target.files[0];
      if (!file) return;

      Papa.parse(file, {
        complete: (results) => {
          console.log("Resultados do Parse:", results.data);
        },
        header: true, // Define se a primeira linha do CSV contém os cabeçalhos
        skipEmptyLines: true, // Ignora linhas vazias
        dynamicTyping: true, // Converte automaticamente strings numéricas e literais booleanos
      });
    },
  },
};
</script>
