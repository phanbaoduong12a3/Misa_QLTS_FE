<template>
  <div ref="dialogDeltete" class="black-bg">
    <div class="dialog-validate">
      <div class="dialog-validate__container">
        <div class="container__left">
          <div class="icon-warning"></div>
        </div>
        <div class="container__right">
          <div class="container__content">
            <div class="validate-items">
              <div class="validate-item">{{ Title }}</div>
            </div>
          </div>
          <div class="container__footer">
            <div class="btn-submit" @click="deleteData">
              {{ ContentText.Confirm }}
            </div>
            <div class="btn-cancer" @click="hideDialog">
              {{ ContentText.Cancer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";
import Enum from "@/js/enum.js";

export default {
  name: "dialogDelete",
  components: {},
  props: {
    // chế độ của prop 
    modeDelete: Number,
  },
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      mode: 6,
      Title: "", // nôi dung dialog
    };
  },
  created() {
    this.mode = this.modeDelete;

    switch (this.mode) {
      case Enum.Mode.ValueEmpty:
        this.Title = this.ContentText.NotValueDelete;
        break;
    
      default:
        this.Title = this.ContentText.ConfirmDelete;
        break;
    }
  },
  methods: {
    /**
     * Thực hiện không xóa, truyền emit onUnDeleteConfirm ra component cha
     * Tạo bởi: NVAn(20/12/2022)
     */
    hideDialog() {
      this.$emit("onUnDeleteConfirm");
    },

    /**
     * Thực hiện xóa, truyền emit onDeleteConfirm ra component cha
     * Tạo bởi: NVAn(20/12/2022)
     */
    deleteData() {
      switch (this.mode) {
        case Enum.Mode.ModeDeleteOne:
          this.$emit("onDeleteConfirmOne");
          break;

        case Enum.Mode.ModeDelete:
          this.$emit("onDeleteConfirm");
          break;
        
        case Enum.Mode.ValueEmpty:
          this.$emit("onDeleteConfirm");
          break;

        default:
          break;
      }
    },
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
  border-radius: 6px;
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
  margin: 24px 0;
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
  line-height: 34px;
  text-align: center;
  background-color: #fff;
  border-radius: 2px;
  color: #000;
  border: 1px solid #000;
  cursor: pointer;
  margin-right: 8px;
}

.btn-cancer:hover {
  background-color: #ccc;
  color: #000;
}

.btn-submit {
  width: 100px;
  height: 36px;
  line-height: 34px;
  text-align: center;
  background-color: #1aa4c8;
  border-radius: 2px;
  color: #ffffff;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #66afff;
}
</style>