<template>
  <BarChart :chart-data="chartData" :options="chartOptions" />
</template>

<script>
import { defineComponent, ref } from "vue";
import { BarChart } from "vue-chart-3";

export default defineComponent({
  name: "GraphComponent",
  components: {
    BarChart,
  },
  setup() {
    const chartData = ref({
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 39, 10],
        },
      ],
    });

    const chartOptions = ref({
      responsive: true,
      maintainAspectRatio: false,
    });

    return { chartData, chartOptions };
  },
});
</script>
