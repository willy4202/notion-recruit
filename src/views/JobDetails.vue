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
        <div class="image-wrapper" v-if="block.type === 'image'">
          <img :src="block.url" :alt="block.text" />
          <span v-text="block.text"></span>
        </div>
        <p
          class="detail-paragraph"
          v-if="block.type === 'paragraph'"
          v-html="block.text"
        ></p>
        <ul class="bulleted-list" v-if="block.type === 'bulleted_list_item'">
          <li v-text="block.text"></li>
        </ul>
        <p v-if="block.type === 'code'" v-text="block.text"></p>
        <hr v-if="block.type === `divider`" />
      </div>
    </article>
    <p></p>
  </section>
</template>
<script>
import { JOBS_LIST_URL } from "@/utils/apiconfig";

export default {
  name: "",
  components: {},
  data() {
    return {
      notionData: {
        title: "",
        department: "",
        team: "",
        career: "",
      },
      blocks: [],
    };
  },
  created() {
    this.getPageTitle();
    this.getPageContent();
  },

  methods: {
    getPageTitle() {
      this.$axios
        .get(JOBS_LIST_URL + "/title/" + this.$route.params.jobId)
        .then((res) => {
          this.refinedPagesProperties(res.data);
        });
    },

    getPageContent() {
      this.$axios
        .get(JOBS_LIST_URL + "/" + this.$route.params.jobId)
        .then((res) => {
          console.log(res.data.results);
          this.refinedBlocks(res.data.results);
        });
    },

    refinedBlocks(data) {
      data.forEach((block) => {
        switch (block.type) {
          case "heading_3":
            this.blocks.push({
              id: block.id,
              type: block.type,
              text: block.heading_3.rich_text[0]?.text.content,
            });
            break;
          case "paragraph":
            this.blocks.push({
              id: block.id,
              type: block.type,
              text:
                block.paragraph.rich_text.length === 0
                  ? "<br/>"
                  : block.paragraph.rich_text[0].plain_text,
            });

            break;
          case "bulleted_list_item":
            this.blocks.push({
              id: block.id,
              type: block.type,
              text: block.bulleted_list_item.rich_text[0]?.plain_text,
            });
            break;
          case "code":
            console.log(block.code.rich_text[0].plain_text);
            this.blocks.push({
              id: block.id,
              type: block.type,
              text: block.code.rich_text[0]?.plain_text,
            });
            break;
          case "image":
            this.blocks.push({
              id: block.id,
              type: block.type,
              text: block.image.caption[0]?.plain_text,
              url: block.image.file.url,
            });
            break;
          case "divider":
            this.blocks.push({
              id: block.id,
              type: block.type,
            });
            break;
        }
      });
    },

    refinedPagesProperties(data) {
      this.notionData = {
        title: data.properties.직무.title[0]?.plain_text,
        department: data.properties.소속.select.name,
        team: data.properties.팀.select.name,
        career: data.properties.경력여부.select.name,
      };
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

.image-wrapper {
  img {
    width: 100%;
  }
}
.detail-title {
  padding: 10px 0;
}
.detail-paragraph {
}

.bulleted-list {
  li {
    /* list-style: disc; */
  }
}
</style>
