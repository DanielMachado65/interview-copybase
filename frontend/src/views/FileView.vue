<template>
  <!-- enviar o arquivo -->
  <FileUpload />

  <!-- preview o arquivo -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="headline">Arquivo</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="items"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- botão para enviar o arquivo -->
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary">Enviar</v-btn>
      </v-col>

      <!-- botão para cancelar o envio do arquivo -->
      <v-col cols="12">
        <v-btn color="error">Cancelar</v-btn>
      </v-col>
    </v-row>
  </v-container>

  <!-- gráficos com 3-->
  <v-container>
    <v-row>
      <Graph :data="graphData" />
    </v-row>
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
