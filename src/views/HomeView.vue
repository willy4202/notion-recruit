<template>
  <div>
    <h1 v-for="link in links">
      <router-link :to="link">{{ link }}</router-link>
    </h1>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      links: ["jobs", "gallery", "applicant"],
    };
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {},
  methods: {},
};
</script>
