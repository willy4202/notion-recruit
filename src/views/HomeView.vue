<template>
  <section>
    <h1>채용 공고</h1>
    <h3>job lists</h3>
    <ul>
      <li v-for="job in jobs" :key="job">
        <router-link :to="job">{{ job }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import notionClient from "@/mixins/notionCleint";

const PROXY_API = "/api";
const option = {
  "Notion-Version": "2022-02-22",
};

export default {
  name: "home",
  mixins: [notionClient],
  components: {},
  data() {
    return {
      jobs: ["1", "2", "3", "4"],
    };
  },

  mounted() {
    // this.getDatabase();
    // console.log(notionClient.databases.query);
    this.getDB();
  },

  methods: {
    async getDB() {
      await fetch(
        "/api/databases/1b129f2601944e4fad20849f53f5eab0/query",
        option
      ).then((res) => console.log(res));
    },

    async getDatabase() {
      await notionClient.databases.query({
        database_id: "1b129f2601944e4fad20849f53f5eab0",
      });
    },
  },
};
</script>
