<template>
  <section>
    <h1>{{ notionData.title }}</h1>
    <span>{{ notionData.department }} </span>
    <span>{{ notionData.team }} </span>
    <span>{{ notionData.career }} </span>

    <hr />

    <p></p>
  </section>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      notionData: {
        title: "회계 실무자",
        department: "경영지원본부",
        team: "재무팀",
        career: "경력",
      },
    };
  },
  created() {
    this.getPageContent();
    this.getPageTitle();
  },
  methods: {
    getPageContent() {
      this.$axios
        .get("http://localhost:3000/jobs/" + this.$route.params.jobId)
        .then((res) => {
          console.log(res.data.results);
          this.refinedBlocks(res.data.results);
        });
    },

    refinedBlocks(data) {
      const refined = data.map((block) => {
        if (block.type === "heading_3") {
          // console.log(block.heading_3.rich_text[0].text.content);
        } else if (block.type === "paragraph") {
          // console.log(block);
        }
      });
    },

    getPageTitle() {
      this.$axios
        .get("http://localhost:3000/jobs/title/" + this.$route.params.jobId)
        .then((res) => {
          console.log(res.data.results);
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
