<template>
  <v-col cols="12" md="6">
    <h2>Status Distribution</h2>
    <DoughnutChart :chart-data="statusChartData" :options="chartOptions" />
  </v-col>
</template>

<script>
import { defineComponent } from "vue";
import { DoughnutChart } from "vue-chart-3";
import axios from "axios";

export default defineComponent({
  name: "StatusDistributionGraph",
  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  components: {
    DoughnutChart,
  },
  data: () => ({
    statusChartData: {
      labels: [],
      datasets: [
        {
          label: "Status",
          backgroundColor: ["#f87979", "#79a6f8", "#7cf879", "#f8cb79"],
          data: [],
        },
      ],
    },
  }),
  methods: {
    async fetchMRRData() {
      axios
        .get(
          process.env.VUE_APP_BASE_API +
            "/metrics/" +
            this.fileId +
            "/group-by-status"
        )
        .then((response) => {
          this.processStatusData(response.data);
        });
    },
    processStatusData(statusData) {
      const labels = statusData.map((item) => item._id);
      const data = statusData.map((item) => item.total);

      this.statusChartData.labels = labels;
      this.statusChartData.datasets[0].data = data;
    },
  },
  mounted() {
    this.fetchMRRData();
  },
});
</script>
