<template>
  <section>
    <div>jobs</div>
    <div>{{ $route.params.job_id }}</div>
  </section>
</template>
<script>
const { Client } = require("@notionhq/client");
const notion = new Client({
  auth: process.env.VUE_APP_INTEGRATION,
});

export default {
  name: "",
  components: {},
  data() {
    return {
      example: "",
      job_id: "",
      database_id: "",
    };
  },
  created() {
    console.log(this.job_id);
  },
  methods: {
    getPages(database_id) {
      notion.databases.query({
        database_id,
      });
    },
  },
  watch: {
    $route(to, from) {
      console.log(to);
    },
  },
};
</script>
