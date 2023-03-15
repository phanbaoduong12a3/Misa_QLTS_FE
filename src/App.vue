<template>
  <div>
    <div class="container">
      <div class="container__left">
        <div class="slide">
          <TheSlide></TheSlide>
        </div>
      </div>
      <div class="container__right">
        <div class="nav">
          <TheHeader></TheHeader>
        </div>
        <div class="content">
          <TheMain></TheMain>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheMain from "./components/layout/TheMain.vue";
import TheSlide from "./components/layout/TheSlide.vue";

export default{
  name: "App",
  components: {
    TheHeader,
    TheMain,
    TheSlide,
  },
  methods: {},
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.container {
  display: flex;
  background-color: #f4f7ff;
}

.container__left {
}

.slide {
  background-color: #1c3048;
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.16);
  height: 100vh;
}

.container__right {
  display: flex;
  flex-direction: column;
  flex: 1;
  /* width: calc(100vw - 80px); */
}

.nav {
  background-color: #ffffff;
  height: 56px;
  flex: 1;
  /* width: calc(100vw - 56px); */
}

.content {
  /* width: 100%; */
  height: calc(100vh - 80px);
  margin: 24px 0 0 24px;
}
</style>
