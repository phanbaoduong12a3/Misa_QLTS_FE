<template>
 <div>
    <v-money-spinner v-model="amount"  v-bind="config" class="input-money__class" @keyup="updateAmount" @blur="logss" autocomplete="off"></v-money-spinner>
 </div>
</template>

<script>
import Resource from "@/js/resource.js";
import Enum from "@/js/enum.js";

export default {
  name: "inputMoney",
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
        max: 10000000000000000000,
        prefix: "",
        suffix: "",
        precision: 0,
        decimal: '.',
        thousands: '.',
        template: "bootstrap",
        masked: true,
        disableNegative: false,
        align: "center",
      }
    };
  },
  created() {
    this.amount = this.value;
  },
  updated(){
    switch (this.modeInput) {
      case Enum.ModeInput.cost:

        break;
      case Enum.ModeInput.valueAtrophyYear:
        this.amount = this.formatCash(this.value);
        break;
      default:
        break;
    }
  },
  methods: {
    /**
     * Hàm format tiền str: (String) (Xóa dấu phẩy)
     * Trả về number
     * Tạo bởi: NVAn(20/12/2022)
     */
    formatCashReverse(str) {
      return Number(str.split(".").join(""));
    },

    /**
     * Hàm format tiền str: String
     * Trả về string
     * Tạo bởi: NVAn(20/12/2022)
     */
    formatCash(str) {
      return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    },

    updateAmount(){
      switch (this.modeInput) {
      // input nguyên giá
      case Enum.ModeInput.cost:
        this.$emit("changeCost", this.formatCashReverse(this.amount));
        break;

      // input giá trị hao mòn năm
      case Enum.ModeInput.valueAtrophyYear:
        this.$emit("changevalueAtrophyYear", this.formatCashReverse(this.amount));
        break;

      default:
        break;
      }
    },

    logss(){
      this.$emit('blurInput');
    }

  },
};
</script>

<style scoped>
@import url('@/assets/css/inputMoney.css');
/* 
.input-money{
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  margin-top: 8px;
}

.active-ip{
  border: 1px solid #f33a58 !important;
}

.input-money:hover{
  border-color: #1aa4c8;
} */
</style>