<template>
  <section>
    <h1>채용 공고</h1>
    <hr />
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>

    <ul v-else>
      <li class="job-list" v-for="job in notionDbList" :key="job.page_id">
        <router-link
          :to="`/jobs/${job.page_id}`"
          @click.native="setJobDetails(job)"
        >
          <h2>{{ job.title }}</h2>
          <div class="job-tag">
            <span>{{ job.department }}</span>
            <span>{{ job.team }}</span>
            <span>{{ job.career }}</span>
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import notionClient from "@/mixins/notionCleint";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import store from "@/store";
import { JOBS_LIST_URL } from "@/utils/apiconfig";

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
      this.$axios.get(JOBS_LIST_URL).then((res) => {
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
          career: page.properties.경력여부.select.name,
        });
      });
      console.log(refinedResponse);
      return refinedResponse;
    },

    setJobDetails() {
      console.log(store.state.jobDetails.title);
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

    .job-list {
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
