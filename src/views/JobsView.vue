<template>
  <section>
    <h1>{{ notionData.title }}</h1>
    <ul class="job-property">
      <li v-text="notionData.department"></li>
      <li v-text="notionData.team"></li>
      <li v-text="notionData.career"></li>
    </ul>

    <hr />
    <article>
      <div v-for="block in blocks" :key="block.id">
        <h3
          class="detail-title"
          v-if="block.type === 'heading_3'"
          v-text="block.text"
        ></h3>
        <p
          class="detail-paragraph"
          v-if="block.type === 'paragraph'"
          v-text="block.text"
        ></p>
        <ul class="bulleted-list" v-if="block.type === 'bulleted_list_item'">
          <li v-text="block.text"></li>
        </ul>
      </div>
    </article>
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
      blocks: [],
    };
  },
  created() {
    this.getPageContent();
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
      data.map((block) => {
        if (block.type === "heading_3") {
          this.blocks.push({
            id: block.id,
            type: block.type,
            text: block.heading_3.rich_text[0]?.text.content,
          });
        }
        if (block.type === "paragraph") {
          this.blocks.push({
            id: block.id,
            type: block.type,
            text: block.paragraph.rich_text[0]?.plain_text,
          });
        }
        if (block.type === "bulleted_list_item") {
          // console.log(block.bulleted_list_item.rich_text[0]?.plain_text);
          this.blocks.push({
            id: block.id,
            type: block.type,
            text: block.bulleted_list_item.rich_text[0]?.plain_text,
          });
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

<style lang="scss" scoped>
.job-property {
}

.detail-title {
  padding: 20px 0;
}
.detail-paragraph {
}

.bulleted-list {
  li {
    list-style: disc;
  }
}
</style>
