<template>
 <div class="input-number">
    <v-money-spinner v-model="amount" v-bind="config" class="input-number__class" @keyup.down="downAmount" @keyup.up="upAmount" @keyup="updateAmount" autocomplete="off"></v-money-spinner>
    <div class="icon-UpAndDown"></div>
 </div>
</template>

<script>
import Resource from "@/js/resource.js";
import Enum from "@/js/enum.js";

export default {
  name: "InputNumber",
  components: {},
  props: {
    value: Number,
    modeInput: Number
  },
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      Tooltip: Resource.Tooltip, //Tooltip gọi từ file resource.js
      Placeholder: Resource.Placeholder, //Placeholder gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      amount: 0,
      config: {
        spinner: false,
        step: 10,
        min: 0,
        max: 100,
        prefix: "",
        suffix: "",
        precision: 0,
        decimal: '',
        thousands: '',
        template: "bootstrap",
        masked: true,
        disableNegative: false,
        align: "center",
      }
    };
  },
  created() {
    this.amount = this.value;

    switch (this.modeInput) {
      case Enum.ModeInput.depreciationRate:
        this.config.max = 100;
        break;
      case Enum.ModeInput.quantity:
        this.config.max = 999999;
      break;
      default:
        break;
    }
  },
  updated(){
    
  },
  methods: {
    updateAmount(){
      switch (this.modeInput) {
        case Enum.ModeInput.depreciationRate:
          this.$emit("changeDepreciationRate", Number(this.amount));
          
          break;

        case Enum.ModeInput.quantity:
          this.$emit("changeQuantity", Number(this.amount));
          
          break;
        default:
          break;
      }
    },

    downAmount(){
      if (Number(this.amount) != 0) {
        this.amount = (Number(this.amount) - 1).toString();
      }
    },

    upAmount(){
        this.amount = (Number(this.amount) + 1).toString();
    }
  },
};
</script>

<style scoped>
@import url('@/assets/css/inputNumber.css');
</style>