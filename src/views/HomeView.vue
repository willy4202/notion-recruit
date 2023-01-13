<template>
  <section>
    <h1>채용 공고</h1>
    <hr />
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>

    <ul v-else>
      <li v-for="job in notionDbList" :key="job.page_id">
        <router-link :to="job.page_id">
          <h2>{{ job.title }}</h2>
          <div class="job-tag">
            <span>{{ job.department }}</span>

            <span>{{ job.team }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import notionClient from "@/mixins/notionCleint";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  name: "home",
  mixins: [notionClient],
  components: { LoadingSpinner },
  data() {
    return {
      notionDbList: [],
      isLoading: true,
    };
  },

  created() {
    this.getDatabaseList();
  },

  updated() {},
  methods: {
    async getDatabaseList() {
      this.$axios.get("http://localhost:3000/jobs").then((res) => {
        this.notionDbList = this.refinedData(res.data.results);
        this.isLoading = false;
      });
    },

    refinedData(data) {
      const refinedResponse = [];
      data.forEach((page) => {
        refinedResponse.push({
          id: page.properties.id.number,
          page_id: page.id,
          title: page.properties.직무.title[0].plain_text,
          department: page.properties.소속.select.name,
          team: page.properties.팀.select.name,
        });
      });
      console.log(refinedResponse);
      return refinedResponse;
    },
  },
};
</script>

<style lang="scss">
section {
  padding: 20px 40px;

  ul {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0px;

    li {
      border-bottom: 1px solid #eaebee;

      .job-tag {
        span {
          padding-right: 20px;
          color: gray;
        }
      }
    }

    li:hover {
      h2 {
        color: gray;
        transition: 500ms;
      }
    }
  }
  a {
    text-decoration: none;
    color: black;
    padding: 20px;
  }
}
</style>
