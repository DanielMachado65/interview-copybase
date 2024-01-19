<template>
  <v-row>
    <v-col cols="12" md="6">
      <h2>MRR</h2>
      <BarChart :chart-data="mrrChartData" :options="chartOptions" />
    </v-col>

    <v-col cols="12" md="6">
      <h2>Churn Rate</h2>
      <BarChart :chart-data="churnChartData" :options="chartOptions" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import axios from "axios";

export default defineComponent({
  name: "GraphComponent",
  components: {
    BarChart,
  },
  data() {
    return {
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
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  methods: {
    processApiResponse(data) {
      const labels = [];
      const mrrData = [];
      const churnData = [];

      for (const key in data.mrr) {
        if (Object.prototype.hasOwnProperty.call(data.mrr, key)) {
          labels.push(key);
          mrrData.push(data.mrr[key]);
        }
      }

      for (const key in data.churnRate) {
        if (Object.prototype.hasOwnProperty.call(data.churnRate, key)) {
          churnData.push(data.churnRate[key]);
        }
      }

      this.mrrChartData.labels = labels;
      this.mrrChartData.datasets[0].data = mrrData;
      this.churnChartData.labels = labels;
      this.churnChartData.datasets[0].data = churnData;
    },
    async fetchData() {
      try {
        const response = await axios.get(
          process.env.VUE_APP_BASE_API + "/metrics/65a9c9807fa02de31fb5171a"
        );
        this.processApiResponse(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>
