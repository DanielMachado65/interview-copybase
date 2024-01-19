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
    <FileUpload />

    <!-- gráficos com 3-->
    <v-container>
      <v-row>
        <v-col cols="12">
          <Graph :data="graphData" />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

// Components
import FileUpload from "../components/FileUpload.vue";
import Graph from "../components/Graph.vue";

export default defineComponent({
  name: "FileView",
  components: {
    FileUpload,
    Graph,
  },
  data() {
    return {
      graphData: null,
    };
  },
  methods: {
    async fetchGraphData() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_API + "/metrics/65a9c9807fa02de31fb5171a"
        ); // Substitua com a URL do seu backend
        this.graphData = response.data; // Atualizar os dados do gráfico
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    },
  },
  mounted() {
    this.fetchGraphData(); // Chamar o método na montagem do componente
  },
});
</script>
