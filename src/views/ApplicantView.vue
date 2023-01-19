<template>
  <div class="container">
    <h1>입사 지원</h1>
    <form class="container">
      <div class="text-input-form" v-for="field in fields" :key="field.name">
        <label>{{ field.label }}</label>
        <input
          v-model="field.value"
          :type="field.type"
          :name="field.name"
          :placeholder="field.placeholder"
        />
      </div>
      <select v-model="position">
        <option value="프론트엔드">프론트엔드</option>
        <option value="백엔드">백엔드</option>
      </select>

      <button type="submit" @click.prevent="postApplicantInfo">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      fields: [
        {
          name: "name",
          label: "이름",
          type: "text",
          value: "",
          placeholder: "Please write your full name",
        },
        {
          name: "email",
          label: "이메일",
          type: "text",
          value: "",
          placeholder: "example@google.com",
        },
        {
          name: "number",
          label: "전화번호",
          type: "text",
          value: "",
          placeholder: "010-0000-0000",
        },
        { name: "resume", label: "이력서", type: "file", value: "" },
        {
          name: "career",
          label: "경력기술서",
          type: "file",
          value: "",
        },
        { name: "portfolio", label: "포트폴리오", type: "file", value: "" },
      ],
      position: "",
    };
  },

  created() {},

  updated() {},

  methods: {
    postApplicantInfo() {
      const content = { data: this.fields };
      const headers = {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
      };
      this.$axios
        .post("http://localhost:3000/applicant", content, { headers })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;
  margin: 0 auto;

  h1 {
  }

  .text-input-form {
    width: 100%;
    margin-bottom: 30px;
    input {
      width: 100%;
      padding: 10px 10px;
      box-sizing: border-box;
      border: 1px solid d1d3d8;
    }
  }
}
</style>
