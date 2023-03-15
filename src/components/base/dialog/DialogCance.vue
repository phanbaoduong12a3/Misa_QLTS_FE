<template>
  <div class="black-bg">
    <div class="dialog-validate">
      <div class="dialog-validate__container">
        <div class="container__left">
          <div class="icon-warning"></div>
        </div>
        <div class="container__right">
          <div class="container__content">
            <div class="validate-items">
              <div class="validate-item">
                {{ ContentText.AddFall }}
              </div>
            </div>
          </div>
          <div class="container__footer">
            <div class="btn-cancer" @click="closeDialog">{{ContentText.Cancer}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";

export default {
  name: "dialogCance",
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
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

.black-bg {
  display: inline-block;
  box-sizing: border-box;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1000;
}

.dialog-validate {
  box-sizing: border-box;
  background-color: #fff;
  width: 500px;
  top: calc((100vh - 300px) / 2);
  right: calc((100vw - 500px) / 2);
  left: calc((100vw - 500px) / 2);
  position: fixed;
  z-index: 100;
  overflow: hidden;
  padding: 24px;
}

.dialog-validate__container {
  display: flex;
}

.container__left {
  margin-right: 24px;
  padding-top: 16px;
}

.container__right {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.container__content {
  flex: 1;
}

.validate-items {
}

.validate-item {
  margin: 4px 0;
}

.icon-warning {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -824px -130px;
  background-size: 1000px 1500px;
  width: 48px;
  height: 40px;
}

.container__footer {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
  margin-top: 20px;
}

.btn-cancer {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: #1aa4c8;
  border-radius: 2px;
  color: #ffffff;
  cursor: pointer;
}

.btn-cancer:hover {
  background-color: #66afff;
}
</style>