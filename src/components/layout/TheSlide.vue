<template>
  <div class="outside__slide">
    <div class="slide__logo">
      <div class="icon logo-misa"></div>
      <div class="category-text logo-text" v-show="isShowMenu">MISA QLTS</div>
    </div>
    <div class="slide__categorys">
      <div class="slide__category">
        <div class="icon-category1 icon"></div>
        <div class="category-text" v-show="isShowMenu">Tổng quan</div>
      </div>
      <div class="slide__category active">
        <div class="icon-category2 icon "></div>
        <div class="category-text" v-show="isShowMenu">
          <div class="text">Tài sản</div>
          <div class="icon-down"></div>
        </div>
      </div>
      <div class="slide__category">
        <div class="icon-category3 icon"></div>
        <div class="category-text" v-show="isShowMenu">
          <div class="text">Tài sản HT-ĐB</div>
          <div class="icon-down"></div>
        </div>
      </div>
      <div class="slide__category">
        <div class="icon-category4 icon"></div>
        <div class="category-text" v-show="isShowMenu">
          <div class="text">Công cụ dụng cụ</div>
          <div class="icon-down"></div>
        </div>
      </div>
      <div class="slide__category">
        <div class="icon-category5 icon"></div>
        <div class="category-text" v-show="isShowMenu">Danh mục</div>
      </div>
      <div class="slide__category">
        <div class="icon-category6 icon"></div>
        <div class="category-text" v-show="isShowMenu">
          <div class="text">Tra cứu</div>
          <div class="icon-down"></div>
        </div>
      </div>
      <div class="slide__category">
        <div class="icon-category7 icon"></div>
        <div class="category-text" v-show="isShowMenu">
          <div class="text">Báo cáo</div>
          <div class="icon-down"></div>
        </div>
      </div>
    </div>
    <div class="slide__btn-open-close">
      <div class="icon-open icon" @click="toggleMenu()"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSlide",
  data() {
    return {
      isShowMenu: false,
    }
  },
  methods: {
    /**
     * Hàm đóng mở menu slide-bar
     * Tạo bởi: NVAn(20/12/2022)
     */
    toggleMenu(){
      this.isShowMenu = !this.isShowMenu;
    }
  },
};
</script>
<style scoped>
.icon {
  background: url("../../assets/icon/qlts-icon.png") no-repeat;
}

.icon:hover {
  cursor: pointer;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.outside__slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.slide__logo {
  width: 100%;
  height: 60px;
  display: flex;
  margin: 16px 0 10px 0;

}

.logo-misa {
  display: inline-block;
  background-position: -20px -680px;
  width: 36px;
  height: 36px;
  color: aqua;
  margin: 2px 10px 0 10px;
}

.logo-text{
  font-size: 24px;
  font-weight: 700;
}

.slide__categorys {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
}

.slide__category {
  display: flex;
  border-radius: 6px;
  height: 40px;
  margin: 2px 6px;
}

.active {
  background-color: #1aa4c8;
}

.icon-category1 {
  display: inline-block;
  background-position: -10px -144px;
  width: 44px;
  height: 40px;
}

.icon-category2 {
  display: inline-block;
  background-position: -54px -144px;
  width: 44px;
  height: 40px;
}

.icon-category3 {
  display: inline-block;
  background-position: -99px -144px;
  width: 44px;
  height: 40px;
}

.icon-category4 {
  display: inline-block;
  background-position: -142px -144px;
  width: 44px;
  height: 40px;
}

.icon-category5 {
  display: inline-block;
  background-position: -186px -144px;
  width: 44px;
  height: 40px;
}

.icon-category6 {
  display: inline-block;
  background-position: -230px -144px;
  width: 44px;
  height: 40px;
}

.icon-category7 {
  display: inline-block;
  background-position: -318px -144px;
  width: 44px;
  height: 40px;
}

.category-text {
  color: #fff;
  flex: 1;
  line-height: 40px;
  min-width: 150px;
  display: flex;
  flex-direction: row;
}

.text {
  flex: 1;
}

.icon-down {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -158px -275px;
  width: 11px;
  height: 40px;
  margin-right: 10px;
}

.slide__btn-open-close {
  height: 40px;
  border-top: 2px solid #32445a;
}

.icon-open {
  background-position: -461px -155px;
  float: right;
  margin: 11px;
  width: 22px;
  height: 18px;
}
</style>
