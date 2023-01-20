<template>
  <div>
    DatabaseTestView.vue
    <div class="flex">
      <div v-for="data in galleryData" :key="data.id">
        <img :src="data.properties.프로필.files[0].file.url" />
      </div>
    </div>
  </div>
</template>
<script>
import { API_BASE_URL } from "@/utils/apiconfig";
import axios from "axios";

export default {
  name: "DatabaseTestView",
  components: {},
  data() {
    return {
      galleryData: "",
    };
  },
  beforeCreate() {},
  created() {
    this.getDb();
  },

  methods: {
    async getDb() {
      axios
        .get(API_BASE_URL + "gallery")
        .then((res) => (this.galleryData = res.data.results));
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  img {
    width: 150px;
  }
}
</style>
