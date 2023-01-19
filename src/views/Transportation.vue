<template>
  <div class="container">
    <form class="wrapper">
      <div class="input-wrapper">
        <label>이름</label>
        <input type="wrapper" v-model="userAnswer.name" />
      </div>
      <div class="input-wrapper">
        <label>이메일</label>
        <input type="email" v-model="userAnswer.email" />
      </div>
      <div class="input-wrapper">
        <label>전화번호</label>
        <input type="wrapper" v-model="userAnswer.phone" />
      </div>
      <div class="input-wrapper">
        <label>운행방식</label>
        <select v-model="userAnswer.way">
          <option value="편도">편도</option>
          <option value="왕복">왕복</option>
        </select>
      </div>
      <div class="input-wrapper">
        <label>문의사항</label>
        <input type="wrapper" v-model="userAnswer.question" />
      </div>
      <div
        class="products-transportaions"
        v-for="product in products"
        :key="product.id"
      >
        <label>{{ product.name }}</label>
        <input
          type="radio"
          v-model="userAnswer.product"
          :value="product.name"
          name="product"
        />
      </div>
      <button class="btn" @click="postInfo">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      products: [
        { id: 1, img: "", value: 1, name: "스탠다드 SUV" },
        { id: 2, img: "", value: 2, name: "스탠다드 VAN" },
        { id: 3, img: "", value: 3, name: "프리미엄 세단" },
        { id: 4, img: "", value: 4, name: "프리미엄 SUV" },
        { id: 5, img: "", value: 5, name: "익스클루시브 세단" },
        { id: 6, img: "", value: 6, name: "익스클루시브 SUV" },
      ],

      userAnswer: {
        name: "",
        email: "",
        phone: "",
        way: "",
        question: "",
        product: "",
      },
    };
  },
  beforeCreate() {},
  created() {},
  updated() {},

  methods: {
    async postInfo() {
      const content = { answer: this.userAnswer };
      const headers = {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
      };
      await this.$axios
        .post(" http://localhost:3000/product", content, { headers })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      alert("post done");
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  .wrapper {
    width: 200px;

    .input-wrapper {
      display: flex;
      flex-direction: column;
      label {
        font-size: 20px;
        padding: 10px 0;
        font-weight: 700;
      }
      input {
        width: 300px;
        font-size: 20px;
      }
    }

    .products-transportaions {
      margin-top: 20px;
    }
    .btn {
      margin-top: 100px;
      width: 200px;
      background-color: blue;
      border: none;
      padding: 10px;
      border-radius: 500px;
      color: white;
    }
    .btn:hover {
      background-color: red;
    }
  }
}
</style>
