<template>
  <v-container class="p-16">
    <!-- titulo para verificação de churn e mrr -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4">Analise de Dados</h1>
      </v-col>
      <v-col>
        <h1 class="text-subtitle-1">
          Ao enviar o arquivo, voce poderá verificar gráficos de receita
          recorrente mensal <strong>(MRR)</strong> e taxa de cancelamento
          <strong>(Churn Rate)</strong>
        </h1>
      </v-col>
    </v-row>

    <!-- enviar o arquivo -->
    <FileUpload @file-uploaded="handleFileUpload" />

    <!-- Loader -->
    <v-row justify="center" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <!-- gráficos com 3-->
    <v-container v-else-if="!isLoading && fileId">
      <v-row>
        <v-col cols="12">
          <DasboardGraph :fileId="fileId" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";

// Components
import FileUpload from "../components/FileUpload.vue";
import DasboardGraph from "../components/DasboardGraph.vue";
import axios from "axios";

export default defineComponent({
  name: "FileView",
  components: {
    FileUpload,
    DasboardGraph,
  },
  data: () => ({
    fileId: null,
    pollingInterval: null,
    isLoading: false,
  }),
  methods: {
    handleFileUpload(fileId) {
      this.isLoading = true;
      this.startPolling(fileId);
    },

    startPolling(fileId) {
      this.pollingInterval = setInterval(() => {
        this.checkDataAvailability(fileId);
      }, 3000); // Polling a cada 3 segundos
    },

    async checkDataAvailability(fileId) {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_API + `/file/${fileId}`
        );

        if (response.data.status === "completed") {
          clearInterval(this.pollingInterval);

          this.fileId = fileId;
          this.isLoading = false;
        }
      } catch (error) {
        console.error("Erro ao verificar o arquivo:", error);
        clearInterval(this.pollingInterval);
      }
    },
  },
});
</script>
