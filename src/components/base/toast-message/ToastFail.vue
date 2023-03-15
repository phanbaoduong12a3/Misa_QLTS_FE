<template>
  <div class="toast-message">
    <div class="toast-message__container">
      <div class="icon-delete"></div>
      <div class="container__text">{{Title.DeleteSuccessful}}</div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";
export default {
    name: "ToastFail",
    data() {
      return {
        Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      }
    },
};
</script>

<style croped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,300;1,400;1,500&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.toast-message {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 300px;
  height: 70px;
  box-shadow: 2px 5px 9px #888888;
  background-color: #fff;
}

.toast-message__container {
  display: flex;
  line-height: 70px;
}

.icon-delete {
  background: url("@/assets/img/icon-delete.jpg") no-repeat;
  background-size: 26px 26px;
  width: 26px;
  height: 26px;
  margin: 22px;
}

.container__text {
  margin-left: 10px;
}
</style>