<template>
  <v-row>
    <MRRGraph :fileId="fileId" />
    <StatusDistributionGraph :fileId="fileId" />
    <ChurnGraph :fileId="fileId" />
    <TotalSpentByUsersGraph :fileId="fileId" />
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
});
</script>
