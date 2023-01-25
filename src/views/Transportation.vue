<template>
  <div class="container">
    <form class="wrapper">
      <div class="input-wrapper" v-for="field in fields">
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
        <select v-if="field.type === 'select'" v-model="userAnswer[field.name]">
          <option v-for="option in field.options" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </div>
      <div class="input-wrapper" v-for="product in products">
        <label>{{ product.name }}</label>
        <!-- <img :src="product.img" /> -->
        <input
          type="radio"
          v-model="userAnswer.product"
          :value="product.name"
          name="product"
        />
      </div>
      <button class="btn" @click.prevent="postInfo">submit</button>
    </form>
  </div>
</template>

<script>
import { PRODUCT_URL } from "@/utils/apiconfig";
import mockData from "@/mock/transportation.json";

export default {
  data() {
    return {
      fields: [
        { name: "name", label: "이름", type: "text" },
        { name: "email", label: "이메일", type: "email" },
        { name: "phone", label: "전화번호", type: "text" },
        {
          name: "way",
          label: "운행방식",
          type: "select",
          options: [
            { value: "편도", label: "편도" },
            { value: "왕복", label: "왕복" },
          ],
        },
        { name: "question", label: "문의사항", type: "text" },
      ],
      products: mockData,
      userAnswer: {},
    };
  },

  created() {},
  updated() {},

  methods: {
    async postInfo() {
      try {
        const content = { answer: this.userAnswer };
        const headers = {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "*/*",
        };
        const response = await this.$axios.post(PRODUCT_URL, content, {
          headers,
        });
        console.log(response);
        alert("post done");
        location.reload();
      } catch (error) {
        console.error(error);
        alert(error);
      }
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
