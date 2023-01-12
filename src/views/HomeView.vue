<template>
  <section>
    <h1>채용 공고</h1>
    <h3>job lists</h3>
  </section>
</template>

<script>
import notionClient from "@/mixins/notionCleint";

export default {
  name: "home",
  mixins: [notionClient],
  components: {},
  data() {
    return {
      example: "",
    };
  },

  mounted() {
    this.getDatabase();
    console.log(notionClient);
  },

  methods: {
    async getDatabase() {
      await notionClient.databases.query({
        database_id: "1b129f2601944e4fad20849f53f5eab0",
      });
    },
  },
};
</script>
