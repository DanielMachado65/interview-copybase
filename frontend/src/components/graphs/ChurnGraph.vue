<template>
  <v-col cols="12" md="6">
    <h2>Churn Rate</h2>
    <v-row justify="center" v-if="isLoading" style="padding: 50px">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <BarChart v-else :chart-data="churnChartData" :options="chartOptions" />
  </v-col>
</template>

<script>
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import axios from "axios";

export default defineComponent({
  name: "ChrunGraph",
  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  components: {
    BarChart,
  },
  data: () => ({
    isLoading: true,
    churnChartData: {
      labels: [],
      datasets: [
        {
          label: "Churn Rate",
          backgroundColor: "#79a6f8",
          data: [],
        },
      ],
    },
  }),
  methods: {
    async fetchChurnData() {
      axios
        .get(
          process.env.VUE_APP_BASE_API +
            "/metrics/" +
            this.fileId +
            "/churn-rate"
        )
        .then((response) => {
          this.processChurnData(response.data);
          this.isLoading = false;
        });
    },
    processChurnData(churnData) {
      const labels = churnData.map((item) => item.period);
      const data = churnData.map((item) => item.churnRate);

      this.churnChartData.labels = labels;
      this.churnChartData.datasets[0].data = data;
    },
  },
  mounted() {
    this.fetchChurnData();
  },
});
</script>
