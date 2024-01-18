<template>
  <v-container>
    <!-- titulo para verificação de churn e mrr -->
    <v-row>
      <v-col>
        <h1>Envie o seu arquivo</h1>
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
