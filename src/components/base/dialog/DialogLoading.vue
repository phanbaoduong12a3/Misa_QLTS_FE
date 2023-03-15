<template>
  <div class="m-loading">
    <div class="m-loading-icon"></div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";

export default {
  name: "dialogLoading",
  data() {
    return {
      ContentText: Resource.ContentText, //ContentText content gọi từ file resource.js
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,300;1,400;1,500&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.m-loading {
  /* display: none; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.137);
}
.m-loading-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  border: 7px solid #f3f3f3; /* Light grey */
  border-top: 7px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1.5s linear infinite;
}
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>