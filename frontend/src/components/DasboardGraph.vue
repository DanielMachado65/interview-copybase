<template>
  <v-row>
    <v-col cols="12" md="6">
      <h2>MRR</h2>
      <BarChart :chart-data="mrrChartData" :options="chartOptions" />
    </v-col>

    <v-col cols="12" md="6">
      <h2>Status Distribution</h2>
      <DoughnutChart :chart-data="statusChartData" :options="chartOptions" />
    </v-col>

    <v-col cols="12" md="6">
      <h2>Churn Rate</h2>
      <BarChart :chart-data="churnChartData" :options="chartOptions" />
    </v-col>

    <v-col cols="12" md="6">
      <h2>Total Spent by Users</h2>
      <LineChart :chart-data="usersValueChartData" :options="chartOptions" />
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from "vue";
import { BarChart, DoughnutChart, LineChart } from "vue-chart-3";
import axios from "axios";

export default defineComponent({
  name: "DasboardGraph",
  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  components: {
    BarChart,
    DoughnutChart,
    LineChart,
  },
  data: () => ({
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
    usersValueChartData: {
      labels: [],
      datasets: [
        {
          label: "Total Spent",
          backgroundColor: "#79a6f8",
          borderColor: "#79a6f8",
          data: [],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    async fetchData() {
      try {
        const mrrResponse = await axios.get(
          `${process.env.VUE_APP_BASE_API}/metrics/${this.fileId}/mrr`
        );
        this.processMrrData(mrrResponse.data);

        // Chamada de API para Churn Rate
        const churnResponse = await axios.get(
          `${process.env.VUE_APP_BASE_API}/metrics/${this.fileId}/churn-rate`
        );
        this.processChurnData(churnResponse.data);

        const statusResponse = await axios.get(
          `${process.env.VUE_APP_BASE_API}/metrics/${this.fileId}/group-by-status`
        );
        this.processStatusData(statusResponse.data);

        const usersResponse = await axios.get(
          `${process.env.VUE_APP_BASE_API}/metrics/${this.fileId}/group-by-users-per-value`
        );
        this.processUsersValueData(usersResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    processMrrData(mrrData) {
      const labels = mrrData.map((item) => item.period);
      const data = mrrData.map((item) => item.totalValue);

      this.mrrChartData.labels = labels;
      this.mrrChartData.datasets[0].data = data;
    },

    processChurnData(churnData) {
      const labels = churnData.map((item) => item.period);
      const data = churnData.map((item) => item.churnRate);

      this.churnChartData.labels = labels;
      this.churnChartData.datasets[0].data = data;
    },

    processStatusData(statusData) {
      const labels = statusData.map((item) => item._id);
      const data = statusData.map((item) => item.total);

      this.statusChartData.labels = labels;
      this.statusChartData.datasets[0].data = data;
    },
    processUsersValueData(usersValueData) {
      console.log(usersValueData);
      const labels = usersValueData.map((item) => item.subscriberId);
      const data = usersValueData.map((item) => item.totalSpent);

      this.usersValueChartData.labels = labels;
      this.usersValueChartData.datasets[0].data = data;
    },
  },
  created() {
    this.fetchData();
  },
});
</script>
