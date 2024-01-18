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
        <Graph :data="graphData" />
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
});
</script>
