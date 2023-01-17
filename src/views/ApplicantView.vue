<template>
  <div class="container">
    <h1>입사 지원</h1>
    <form class="container">
      <div class="text-input-form" v-for="text in textForms">
        <div>{{ text }}</div>
        <input type="text" />
      </div>

      <div class="text-input-form">
        <div>이력서 및 경력기술서</div>
        <input type="file" />
      </div>
      <div class="text-input-form">
        <div>포트폴리오</div>
        <input type="file" />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      textForms: ["이름", "이메일", "전화번호"],
    };
  },

  created() {},

  updated() {},

  methods: {},
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
