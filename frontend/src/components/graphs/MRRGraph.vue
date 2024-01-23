<template>
  <v-col cols="12" md="6">
    <h2>MRR</h2>
    <v-row justify="center" v-if="isLoading" style="padding: 50px">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <BarChart v-else :chart-data="mrrChartData" :options="chartOptions" />
  </v-col>
</template>

<script>
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import axios from "axios";

export default defineComponent({
  name: "MRRGraph",
  props: {
    fileId: {
      type: String,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: true,
    },
  },
  components: {
    BarChart,
  },
  data: () => ({
    isLoading: true,
    mrrChartData: {
      labels: [],
      datasets: [
        {
          label: "MRR",
          backgroundColor: "#f87979",
          data: [],
        },
      ],
    },
  }),
  methods: {
    async fetchMRRData() {
      axios
        .get(process.env.VUE_APP_BASE_API + "/metrics/" + this.fileId + "/mrr")
        .then((response) => {
          this.processMrrData(response.data);
          this.isLoading = false;
        });
    },
    processMrrData(mrrData) {
      const labels = mrrData.map((item) => item.period);
      const data = mrrData.map((item) => item.totalValue);

      this.mrrChartData.labels = labels;
      this.mrrChartData.datasets[0].data = data;
    },
  },
  mounted() {
    this.fetchMRRData();
  },
});
</script>
