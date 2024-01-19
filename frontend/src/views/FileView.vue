<template>
  <v-container>
    <!-- titulo para verificação de churn e mrr -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Envio de arquivo</h1>
      </v-col>
      <v-col>
        <h1 class="text-subtitle-1">Verificação de churn e mrr</h1>
      </v-col>
    </v-row>

    <!-- enviar o arquivo -->
    <FileUpload @file-uploaded="handleFileUpload" />

    <!-- gráficos com 3-->
    <v-container v-if="fileId">
      <v-row>
        <v-col cols="12">
          <Graph :data="graphData" :fileId="fileId" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import FileUpload from "../components/FileUpload.vue";
import Graph from "../components/Graph.vue";

export default defineComponent({
  name: "FileView",
  components: {
    FileUpload,
    Graph,
  },
  data: () => ({
    graphData: null,
    fileId: null,
  }),
  methods: {
    handleFileUpload(fileId) {
      this.checkDataAvailability(fileId);
    },

    async checkDataAvailability(fileId) {
      console.log("checkDataAvailability", fileId);
      this.fileId = fileId;
    },
  },
});
</script>
