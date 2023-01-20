<template>
  <div class="container">
    <h1>입사 지원</h1>
    <form class="container">
      <div class="text-input-form" v-for="field in fields" :key="field.name">
        <label>{{ field.label }}</label>
        <input
          v-if="field.type === 'text'"
          type="text"
          v-model="userAnswer[field.name]"
        />
        <input
          v-if="field.type === 'email'"
          type="email"
          v-model="userAnswer[field.name]"
        />
        <input v-if="field.type === 'file'" type="file" />
        <select v-if="field.type === 'select'" v-model="userAnswer[field.name]">
          <option v-for="option in field.options" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>

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

          placeholder: "Please write your full name",
        },
        {
          name: "email",
          label: "이메일",
          type: "text",

          placeholder: "example@google.com",
        },
        {
          name: "phone",
          label: "전화번호",
          type: "text",

          placeholder: "010-0000-0000",
        },
        {
          name: "position",
          label: "포지션",
          type: "select",
          options: [
            { value: "프론트엔드", label: "프론트엔드" },
            { value: "백엔드", label: "백엔드" },
          ],
        },
        { name: "resume", label: "이력서", type: "file", value: "" },
        {
          name: "career",
          label: "경력기술서",
          type: "file",
        },

        { name: "portfolio", label: "포트폴리오", type: "file" },
      ],
      userAnswer: {},
    };
  },

  created() {},

  updated() {
    console.log(this.userAnswer);
  },

  methods: {
    postApplicantInfo() {
      const content = { data: this.userAnswer };
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
