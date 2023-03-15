<template>
  <div class="outside__nav__left">
    <div class="nav__left">
      <div class="nav__name">{{Title.ListAsset}}</div>
    </div>
    <div class="nav__right">
      <div class="nav__title">{{Title.FinancialDepartment}}</div>
      <div class="nav__time">
        <div class="nav__time-title">{{Title.Year}}</div>
        <div class="nav_time-input">2022</div>
        <div class="bg-icon-up-down">
          <div class="icon-up"></div>
          <div class="icon-down"></div>
        </div>
      </div>
      <div class="nav__bell"><div class="icon-bell" :title="Tooltip.Notify"></div></div>
      <div class="nav__menu"><div class="icon-menu" :title="Tooltip.Menu"></div></div>
      <div class="nav__doubts"><div class="icon-doubts" :title="Tooltip.Suport"></div></div>
      <div class="nav__avatar">
        <div class="icon-avatar" :title="Tooltip.MyInfor"></div>
        <div class="icon-down"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Resource from "@/js/resource.js";

export default {
  name: "TheHeader",
  data() {
    return {
      Tooltip: Resource.Tooltip, // Tooltip gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
    }
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.icon:hover {
  cursor: pointer;
}

.outside__nav__left {
  display: flex;
  height: 56px;
  font-size: 16px;
  justify-content: space-between;
}

.nav__left {
  margin: 20px;
}

.nav__name {
  line-height: 16px;
  font-weight: 700;
}

.nav__right {
  margin-right: 20px;
  display: flex;
}

.nav__title {
  display: inline-block;
  margin: auto 15px;
  line-height: 16px;
  font-weight: 500;
}

.nav__time {
  background-color: rgba(26, 164, 200, 0.2);
  border-radius: 3px;
  width: 112px;
  height: 30px;
  margin: auto 15px;
  overflow: hidden;
  display: flex;
}

.nav__time .bg-icon-up-down{
  height: 30px;
  width: 16px;
  text-align: center;
}

.bg-icon-up-down .icon-up{
  background: url('../../assets/icon/qlts-icon.png') no-repeat -28px -331px;
	width: 10px;
	height: 15px;
}

.bg-icon-up-down .icon-down{
  background: url("../../assets/icon/qlts-icon.png") no-repeat -72px -334px;
  width: 10px;
  height: 15px;
}

.nav__time-title {
  font-size: 14px;
  line-height: 14px;
  margin: 8px 10px;
}

.nav_time-input {
  background-color: rgba(26, 164, 200, -0.8);
  border: none;
  outline: none;
  width: 56px;
  height: 18px;
  line-height: 17px;
  font-size: 14px;
  font-weight: 700;
  margin: 6px 0;
}

.nav__bell {
  width: 16px;
  height: 20px;
  margin: 18px 10px;
}

.icon-bell {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -332px -109px;
  width: 16px;
  height: 20px;
}

.nav__menu {
  width: 18px;
  height: 18px;
  margin: 19px 10px;
}

.icon-menu {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -199px -23px;
  width: 18px;
  height: 18px;
}

.nav__doubts {
  width: 18px;
  height: 18px;
  margin: 19px 10px;
}

.icon-doubts {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -67px -67px;
  width: 18px;
  height: 18px;
}

.nav__avatar {
  display: flex;
  width: 36px;
  height: 18px;
  margin: 19px 0 19px 10px;
}

.icon-avatar {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -23px -23px;
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.nav__avatar .icon-down {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -72px -332px;
  width: 7px;
  height: 18px;
}

.nav__avatar:hover,
.icon-bell:hover,
.icon-menu:hover,
.icon-doubts:hover {
  cursor: pointer;
}
</style>



