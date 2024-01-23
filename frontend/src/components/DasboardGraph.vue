<template>
  <v-row>
    <MRRGraph :fileId="fileId" :chartOptions="chartOptions" />
    <StatusDistributionGraph :fileId="fileId" :chartOptions="chartOptions" />
    <ChurnGraph :fileId="fileId" :chartOptions="chartOptions" />
    <TotalSpentByUsersGraph :fileId="fileId" :chartOptions="chartOptions" />
  </v-row>
</template>

<script>
import { defineComponent } from "vue";
import {
  ChurnGraph,
  MRRGraph,
  StatusDistributionGraph,
  TotalSpentByUsersGraph,
} from "./index";

export default defineComponent({
  name: "DasboardGraph",
  components: {
    MRRGraph,
    TotalSpentByUsersGraph,
    StatusDistributionGraph,
    ChurnGraph,
  },
  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
});
</script>
