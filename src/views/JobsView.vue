<template>
  <section>
    <div>jobs</div>
    <div>{{ $route.params.job_id }}</div>
  </section>
</template>
<script>
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
  methods: {},
  watch: {
    $route(to, from) {
      console.log(to);
    },
  },
};
</script>
