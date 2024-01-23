<template>
  <v-col cols="12" md="6">
    <h2>Total Spent by Users</h2>
    <v-row justify="center" v-if="isLoading" style="padding: 50px">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-row>
    <LineChart
      v-else
      :chart-data="usersValueChartData"
      :options="chartOptions"
    />
  </v-col>
</template>

<script>
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { useToast } from "vue-toastification";
import axios from "axios";

export default defineComponent({
  name: "TotalSpentByUsersGraph",
  props: {
    fileId: {
      type: String,
      required: true,
    },
  },
  components: {
    LineChart,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data: () => ({
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
    isLoading: true,
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
  }),
  methods: {
    async fetchMRRData() {
      axios
        .get(
          process.env.VUE_APP_BASE_API +
            "/metrics/" +
            this.fileId +
            "/group-by-users-per-value"
        )
        .then((response) => {
          this.processUsersValueData(response.data);
          this.isLoading = false;
        })
        .catch((error) => {
          this.toast.error(error.message);
        });
    },
    processUsersValueData(usersValueData) {
      const labels = usersValueData.map((item) => item.subscriberId);
      const data = usersValueData.map((item) => item.totalSpent);

      this.usersValueChartData.labels = labels;
      this.usersValueChartData.datasets[0].data = data;
    },
  },
  mounted() {
    this.fetchMRRData();
  },
});
</script>
