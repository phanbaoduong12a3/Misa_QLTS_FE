<template>
  <div class="black-ground bg-add">
    <div class="form-add">
      <div class="form-add__container">
        <div class="form-add__container__head">
          <div class="form-add__container__head__title">{{ TheTitle }}</div>
          <div @click="hidenForm" class="icon-close" :title="Tooltip.Close"></div>
        </div>
        <div class="form-add__container__body">
          <form class="form" id="form-1">
            <div class="form-row">
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.fixedAssetCode}">
                <input type="text" ref="ipForCusStart" style="width: 0px; height: 0px; border: none;">
                <label for="fname">
                  {{ ContentText.FixedAssetCode }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <input
                  @blur="blurValidate($event)"
                  ref="fixedAssetCode"
                  id="fixedAssetCode"
                  class="form-control"
                  type="text"
                  name="fname"
                  v-model="FixedAsset.fixedAssetCode"
                  :placeholder="Placeholder.ImportAssetCode"
                  maxlength="50"
                  autocomplete="off"
                />
                <div class="form-message"><span v-if="objectValidateForm.fixedAssetCode">{{ ContentText.Validate }}</span></div>
              </div>
              <div :class="{'form-group col2-3': true, invalid: objectValidateForm.fixedAssetName}">
                <label for="fname"
                  >{{ ContentText.FixedAssetName }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <input
                  @blur="blurValidate($event)"
                  ref="fixedAssetName"
                  id="fixedAssetName"
                  class="form-control"
                  type="text"
                  name="fname"
                  v-model="FixedAsset.fixedAssetName"
                  :placeholder="Placeholder.ImportAssetName"
                  maxlength="255"
                  autocomplete="off"
                />
                <div class="form-message"><span v-if="objectValidateForm.fixedAssetName">{{ ContentText.Validate }}</span></div>
              </div>
            </div>
            <div class="form-row">
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.departmentId}">
                <label for="fname"
                  >{{ ContentText.DepartmentCode }}
                  <span class="cl-red">{{ ContentText.red }}</span></label
                >
                <div class="col-select form-control padding-0">
                  <input-filter-form :modeFilter="2" :valueFirst="FixedAsset.departmentId" @filter="importDepartment"/>
                </div>
                <div class="form-message"><span v-if="objectValidateForm.departmentId">{{ ContentText.Validate }}</span></div>
              </div>
              <div class="form-group col2-3">
                <label for="fname">{{ ContentText.DepartmentName }} </label>
                <input
                  id="PartName"
                  class="form-control bg-ccc"
                  type="text"
                  name="fname"
                  :value="getPartNameByDepartmentId(FixedAsset.departmentId)"
                  placeholder=""
                  readonly
                  disabled
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="form-row">
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.fixedAssetCategoryId}">
                <label for="fname"
                  >{{ ContentText.FixedAssetCategoryCode }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <div class="col-select form-control padding-0">
                  <input-filter-form :modeFilter="1" :valueFirst="FixedAsset.fixedAssetCategoryId" @filter="importFixedAssetCode"/>
                </div>
                <div class="form-message"><span v-if="objectValidateForm.fixedAssetCategoryId">{{ ContentText.Validate }}</span></div>
              </div>
              <div class="form-group col2-3">
                <label for="fname">{{
                  ContentText.FixedAssetCategoryName
                }}</label>
                <input
                  id="TypeAssetName"
                  class="form-control bg-ccc"
                  type="text"
                  name="fname"
                  :value="getTypeAssetNameByFixedAssetCategoryId(FixedAsset.fixedAssetCategoryId)"
                  readonly
                  disabled
                  placeholder=""
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="form-row">
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.quantity}">
                <label for="fname"
                  >{{ ContentText.Quantity }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <div class="input-number">
                  <input
                  class="form-control text-align-right padding-right-32"
                  type="number"
                  max="99999"
                  min="0"
                  @blur="blurValidateNumber($event)"
                  id="quantity"
                  @input="importQuantity($event)"
                  v-model="FixedAsset.quantity"
                  autocomplete="off"
                  />
                  <div class="icon-UpAndDown"></div>
                </div>
                <div class="form-message"><span v-if="objectValidateForm.quantity">{{ ContentText.Validate }}</span></div>
              </div>
              <div class="form-group col1-3 form-group col1-3-center">
                <label for="fname"
                  >{{ ContentText.Cost }} <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <div :class="{'input-money': true, active_ip: objectValidateForm.cost}">
                  <inputMoney :value="FixedAsset.cost" :modeInput="1" @changeCost="importCost" @blurInput="blurValidateComponentCost()" /> 
                </div>
                <div class="form-message"><span v-if="objectValidateForm.cost">{{ ContentText.Validate }}</span></div>
              </div>
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.lifeTime}">
                <label for="fname"
                  >{{ ContentText.LifeTime }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <input
                  class="form-control text-align-right padding-right-20"
                  type="number"
                  v-model="FixedAsset.lifeTime"
                  max="100"
                  min="0"
                  @blur="blurValidateNumber($event)"
                  id="lifeTime"
                  @input="importLifeTime($event)"
                  autocomplete="off"
                  />
                <!-- <input
                  class="form-control text-align-right padding-right-20"
                  type="text"
                  name="fname"
                  v-model="FixedAsset.lifeTime"
                  maxlength="3"
                  autocomplete="off"
                /> -->
                <div class="form-message"><span v-if="objectValidateForm.lifeTime">{{ ContentText.Validate }}</span></div>
              </div>
            </div>
            <div class="form-row">
              <div :class="{'form-group col1-3': true, invalid: objectValidateForm.depreciationRate}">
                <label for="fname"
                  >{{ ContentText.DepreciationRate}}<span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <div class="input-number">
                  <input
                  class="form-control text-align-right padding-right-32"
                  type="number"
                  v-model="FixedAsset.depreciationRate"
                  max="100"
                  min="0"
                  @blur="blurValidateNumber($event)"
                  id="depreciationRate"
                  @input="importDepreciationRate($event)"
                  autocomplete="off"
                  />
                  <div class="icon-UpAndDown"></div>
                </div>
                <div class="form-message"><span v-if="objectValidateForm.depreciationRate">{{ ContentText.Validate }}</span></div>
              </div>
              <div class="form-group col1-3 form-group col1-3-center">
                <label for="fname"
                  >{{ ContentText.ValueAtrophyYear }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <div :class="{'input-money': true, active_ip: objectValidateForm.valueAtrophyYear}">
                  <inputMoney :value="FixedAsset.valueAtrophyYear" :modeInput="2" @blurInput="blurValidateComponentValueAtrophyYear()" @changevalueAtrophyYear="importValueAtrophyYear"/>
                </div>
                <div class="form-message"><span v-if="objectValidateForm.valueAtrophyYear">{{ ContentText.Validate }}</span></div>
              </div>
              <div class="form-group col1-3">
                <label for="fname">{{ ContentText.TrackedYear }} </label>
                <input
                  class="form-control bg-ccc text-align-right padding-right-20"
                  type="number"
                  name="fname"
                  readonly
                  disabled
                  v-model="FixedAsset.trackedYear"
                  autocomplete="off"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col1-3 position-relative">
                <label for="fname"
                  >{{ ContentText.BuyDate }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <Datepicker
                  v-model="FixedAsset.purchaseDate"
                  placeholder="dd/mm/yyyy"
                  class="date-picker"
                  hideInputIcon
                  vertical
                  selectText="Chọn"
                  cancelText="Đóng"
                  format="dd/MM/yyyy"
                  previewFormat="dd/MM/yyyy"
                  arrow-navigation
                  :clearable="false"
                  :enableTimePicker="false"
                ></Datepicker>
                <div class="icon-datepicker"></div>
              </div>
              <div
                class="
                  form-group
                  col1-3
                  form-group
                  col1-3-center
                  position-relative
                "
              >
                <label for="fname"
                  >{{ ContentText.UseStartDate }}
                  <span class="cl-red">{{ ContentText.red }}</span>
                </label>
                <Datepicker
                  v-model="FixedAsset.useDate"
                  class="date-picker"
                  text-input
                  hideInputIcon
                  vertical
                  selectText="Chọn"
                  cancelText="Đóng"
                  format="dd/MM/yyyy"
                  previewFormat="dd/MM/yyyy"
                  arrow-navigation
                  :clearable="false"
                  :enableTimePicker="false"
                  ref="useDatePicker"
                ></Datepicker>
                <!--  -->
                <div
                  style="right: -268px"
                  class="icon-datepicker"
                  @click="handleClickUserDatePicker"
                ></div>
              </div>
              <div class="form-group col1-3"></div>
            </div>
          </form>
        </div>
        <div class="form-add__container__foot">
          <button @click="canceForm" type="submit" class="btn-cancel">
            {{ ContentText.Cancer }}
          </button>
          <button @click="addData" @keydown.tab="onTab()" type="submit" class="btn-submit">
            {{ ContentText.Save }}
          </button> 
          <input type="text" ref="ipForCusEnd" style="width: 0px; height: 0px; border: none;">
        </div>
      </div>
    </div>
    <dialog-validate
      v-if="isShowDialogValidate"
      :validateItems="validateItems"
      :modeRequest="modeRequest"
      @closeDialog="closeDialogValidate()"
    />
    <dialogCance v-if="isShowDialogCance" />
  </div>
</template>

<script>
import axios from "axios";
import Enum from "@/js/enum.js";
import Resource from "@/js/resource.js";
import { ObjectValidateForm } from "@/class/ObjectValidateForm.js";
import { FixedAsset } from "@/class/FixedAsset.js";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dialogValidate from "@/components/base/dialog/DialogValidate";
import dialogCance from "@/components/base/dialog/DialogCance";
import inputMoney from '@/components/base/popup/InputMoney'
import inputFilterForm from '@/components/base/popup/InputFilterForm'
// import inputNumber from '@/components/base/popup/InputNumber'

export default {
  name: "FormMode",
  components: { Datepicker, dialogValidate, dialogCance, inputMoney, inputFilterForm },
  props: {
    // Chế độ của popup
    mode: Number,
    updateAsset: Object,
    duplicateAsset: Object,
  },
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      Placeholder: Resource.Placeholder, //Placeholder gọi từ file resource.js
      Tooltip: Resource.Tooltip, //Tooltip gọi từ file resource.js
      FixedAsset: new FixedAsset(), // Đối tượng tài sản sẽ nhận data từ form
      objectValidateForm: new ObjectValidateForm(), // Đối tượng validate gọi từ form
      TheTitle: "", // Tiêu đề của form
      AssetCategorys: [], // Danh sách loại tìa sản lấy từ API
      Departments: [], // Danh sách bộ phận sử dụng lấy từ API
      isShowDialogValidate: false,
      isShowDialogCance: false,
      validateItemss: [], // Mảng các trường chưa nhập cần validate(cảnh báo)
      assetCodeAuto: "", // Mã tài sản tự động lấy được
      valueAtrophyYearBefor: "0", //Giá trị của giá trị hao mòn năm trước lúc nhập (trước khi bắt keyup)
      modeInput: 0, //
      modeRequest: 0, // Chế độ khi yêu cầu
    };
  },
  created() {
    var _this = this;

    // Load dữ liệu trang
    this.loadData();

    // Sự kiện khi click ra ngoài thì đóng thẻ select
    window.addEventListener("click", function () {
      try {
        // Chon tất cả thẻ option
        let listSelectControl = _this.$refs.optionFilteritem;

        // Ẩn hết toàn bộ thẻ select đang mở
        for (const selectControl of Array.from(listSelectControl)) {
          selectControl.style.display = "none";
        }
      } catch (error) {
        console.log(error);
      }
    });

    try {
      // cập nhật đối tượng tường ứng với từng loại popup
      switch (this.mode) {
        case Enum.Mode.Update:
          // Thiết lập title popup thành Sửa tài sản
          this.TheTitle = this.ContentText.UpdateAsset;

          // Truyền giá trị tài sản ban đầu vào form
          this.CreateFormUpdate(this.updateAsset);

          break;
        default:
          // Thiết lập title popup thành Thêm tài sản
          this.TheTitle = this.ContentText.AddAsset;

          // Tự sinh mã mới cho trường mã tài sản
          fetch("http://localhost:63515/api/v1/Assets/new-code")
            .then((response) => {
              return response.json();
            })
            .then((AssetCodeAuto) => {
              this.assetCodeAuto = AssetCodeAuto.newRecordCode;
              this.FixedAsset.fixedAssetCode = this.assetCodeAuto;
            });

          break;
      }
    } catch (error) {
      console.log(error);
    }
  },
  updated(){
    try {
      this.FixedAsset.trackedYear = this.FixedAsset.useDate.getFullYear();
    } catch (error) {
      console.log(error);
    }
  },
  beforeMount(){
    let _this = this;

    // Tự động focus ô mã tài sản khi mở form
    this.$nextTick(() => _this.$refs.fixedAssetCode.focus());
  },
  methods: {
    /**
     * Hàm bắt sự kiện tab khi đến ô cuối cùng => chuyển đến mã tài sản
     * Tạo bởi: DuongPV(20/12/2022)
     */
    onTab(){
      this.$refs.ipForCusStart.focus();
    },

    handleClickUserDatePicker() {
      let datepicker = this.$refs.useDatePicker;
      datepicker.openMenu();
    },

    /**
     * Hàm Load data
     * Tạo bởi: DuongPV(20/12/2022)
     */
    loadData() {
      // load danh sách tài sản
      this.isShowDialogLoading = true;

      // load danh sách loại tài sản
      try {
        fetch("http://localhost:63515/api/AssetCategorys/filter?keyword=")
          .then((response) => {
            return response.json();
          })
          .then((AssetCategory) => {
            this.AssetCategorys = AssetCategory.data;
          });
      } catch (error) {
        console.log(error);
      }

      // load danh sách phòng ban
      try {
        fetch("http://localhost:63515/api/v1/Departments/filter?keyword=")
          .then((response) => {
            return response.json();
          })
          .then((part) => {
            this.Departments = part.data;
          });
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm format tiền str: String
     * Trả về string
     * Tạo bởi: DuongPV(20/12/2022)
     */
    formatCash(str) {
      return str.split("").reverse().reduce((prev, next, index) => {return (index % 3 ? next : next + ".") + prev;});
    },

    /**
     * Hàm format tiền str: (String) (Xóa dấu phẩy)
     * Trả về number
     * Tạo bởi: DuongPV(20/12/2022)
     */
    formatCashReverse(str) {
      return Number(str.split(".").join(""));
    },

    //Xử lý sự kiện khi blur vào ô input (ẩn hiện message validate)
    blurValidate(e) {
      //lấy thẻ input đang target
      let ipTarget = e.target;

      let check = ipTarget.value.trim() ? true : false;

      if(check){
        this.objectValidateForm[ipTarget.id] = false;
      }else{
        this.objectValidateForm[ipTarget.id] = true;
      }
    },

    blurValidateNumber(e){
      //lấy thẻ input đang target
      let ipTarget = e.target;

      let check = ipTarget.value.trim() ? true : false;
      if(Number(ipTarget.value) === 0) {
        check = false;
      }else{
        check = true;
      }

      if(check){
        this.objectValidateForm[ipTarget.id] = false;
      }else{
        this.objectValidateForm[ipTarget.id] = true;
      }
    },

    // Xử lý sự kiện khi blur ô input(component) (ẩn hiện message validate) TH Nguyên giá
    blurValidateComponentCost(){
      //Kiểm tra điều kiện giá trị đang trong ô input
      let check = this.FixedAsset.cost != 0 ? true : false;

      if(check){
        this.objectValidateForm.cost = false;
      }else{
        this.objectValidateForm.cost = true;
      }
    },
    
    // Xử lý sự kiện khi blur ô input(component) (ẩn hiện message validate) TH Giá trị hao mòn năm
    blurValidateComponentValueAtrophyYear(){
      //Kiểm tra điều kiện giá trị đang trong ô input
      let check = this.FixedAsset.valueAtrophyYear != 0 ? true : false;

      if(check){
        this.objectValidateForm.valueAtrophyYear = false;
      }else{
        this.objectValidateForm.valueAtrophyYear = true;
      }
    },

    //Xử lý sự kiện khi nhập dữ liệu vào ô input (ẩn message validate)
    inputValide(e) {
      let errorElement = e.target.parentElement.querySelector(".form-message");
      let inputElement = e.target.parentElement.querySelector("input");
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    },

    //Sự kiện tạo thẻ select(blur và ra sẽ hiện option)
    showOption(e) {
      try {
        e.stopImmediatePropagation();
        let selectControls = e.target.parentElement.querySelectorAll(".option-filter-item");
        for (const selectControl of selectControls) {
          selectControl.style.display = "flex";
        }
      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Hàm tự động cập nhật tên bộ phận sử dụng tương ứng mã bộ phận sử dụng
     * Tạo bởi: DuongPV(20/12/2022)
     */
    importDepartment(departmentId){
      // Chọn tên bộ phận tương ứng với mã bộ phận
      for (const department of this.Departments) {
        if (department.departmentId == departmentId) {
          this.FixedAsset.departmentId = departmentId;
        }
      }

      // Khi mã trường đường chọn thì bỏ active
      this.objectValidateForm.departmentId = false;
    },

    /**
     * Hàm tự động cập nhật tên loại tài sản tương ứng mã loại tài sản
     * Tạo bởi: DuongPV(20/12/2022)
     */
    importFixedAssetCode(fixedAssetCategoryId){
      try {
        for (const assetCategory of this.AssetCategorys) {
        if (assetCategory.fixedAssetCategoryId == fixedAssetCategoryId) {
          // Chọn tên loại tài sản tương ứng với mã loại tài sản
          this.FixedAsset.fixedAssetCategoryId = fixedAssetCategoryId;

          //Chọn số năm sử dụng và tỷ lệ hao mòn theo loại tài sản đó
          this.FixedAsset.lifeTime = assetCategory.lifeTime;
          this.FixedAsset.depreciationRate = assetCategory.depreciationRate;
          this.FixedAsset.trackedYear = assetCategory.useDate.getFullYear();

        }
      }
      } catch (error) {
        console.log(error);
      }

      // Khi mã trường được chọn thì bỏ active
      this.objectValidateForm.fixedAssetCategoryId = false;
    },

    /**
     * Hàm tự động tính giá trị hao mòn năm
     * Tạo bởi: DuongPV(20/12/2022)
     */
    autoCalculateValueAtrophyYear() {
      // Lấy thẻ input của giá trị hao mòn năm
      let valueAtrophyYear = this.$refs.valueAtrophyYear;

      // Tự động tính giá trị hao mòn năm
      this.FixedAsset.valueAtrophyYear = Math.round(
        (this.FixedAsset.depreciationRate * this.FixedAsset.cost) / 100
      );

      //format tiền cho giá trị hao mòn năm và cập nhật
      valueAtrophyYear.value = this.formatCash(
        this.FixedAsset.valueAtrophyYear.toString()
      );

      // Cập nhật giá trị hao mòn năm cũ
      this.valueAtrophyYearBefor = valueAtrophyYear.value;
    },

    // Hàm xử lý nguyên giá
    importCost(cost){
      // cập nhật nguyên giá
      this.FixedAsset.cost = cost;

      // cập nhật giá trị hao mòn năm
      this.FixedAsset.valueAtrophyYear = Math.round(this.FixedAsset.cost * this.FixedAsset.depreciationRate / 100);
    },

    // Hàm xử lý tỷ lệ hao mòn năm
    importDepreciationRate(e){
      // cập nhật tỷ lệ hao mòn năm event.target.value
      const value = e.target.value

      if (value.length <= 2 || Number(value) == 100 ) {
        //Nếu giá trị value nhỏ hơn hoặc bằng 2 chữ số thì gán giá trị này cho depreciationRate
        this.FixedAsset.depreciationRate = value;
      }else{
        // Nếu giá trị này lớn hơn 2 chữ số thì gán depreciationRate thành 100
        this.FixedAsset.depreciationRate = 100;
      }
    },

    // Hàm xử lý số lượng
    importQuantity(e){
      // cập nhật tỷ lệ hao mòn năm
      const value = e.target.value

      if (value.length <= 5) {
        //Nếu giá trị value nhỏ hơn hoặc bằng 5 chữ số thì gán giá trị này cho quantity
        this.FixedAsset.quantity = value;
      }else{
        // Nếu giá trị này lớn hơn 5 chữ số thì gán quantity thành 99999
        this.FixedAsset.quantity = 99999;
      }
    },

    // Hàm xử lý số năm sử dụng
    importLifeTime(e){
      // cập nhật số năm sử dụng
      const value = e.target.value

      if (value.length <= 3) {
        //Nếu giá trị value nhỏ hơn hoặc bằng 3 chữ số thì gán giá trị này cho quantity
        this.FixedAsset.lifeTime = value;
      }else{
        // Nếu giá trị này lớn hơn 3 chữ số thì gán quantity thành 100
        this.FixedAsset.lifeTime = 100;
      }
    },

    // hàm xử lý giá trị hao mòn năm
    importValueAtrophyYear(valueAtrophyYear){
      // Cập nhật giá trị hao mòn năm
      this.FixedAsset.valueAtrophyYear = valueAtrophyYear;
    },

    //Đóng form khi click close
    hidenForm() {
      try {
        this.$emit("hideForm");
      } catch (error) {
        console.log(error);
      }
    },
    //Click vào hủy
    canceForm() {
      try {
        this.$emit("hideForm");
      } catch (error) {
        console.log(error);
      }
    },

    // Thêm mới dữ liệu khi lưu
    async addData() {
      try {
        // Khai báo các trường cần validate
        let checkValidate = false;

        // Kiểm tra validate
        if(this.FixedAsset.fixedAssetCode === ""){
          this.objectValidateForm.fixedAssetCode = true;
          checkValidate = true;
        }
        if(this.FixedAsset.fixedAssetName === ""){
          this.objectValidateForm.fixedAssetName = true;
          checkValidate = true;
        }
        if(this.FixedAsset.departmentId === ""){
          this.objectValidateForm.departmentId = true;
          checkValidate = true;
        }
        if(this.FixedAsset.fixedAssetCategoryId == ""){
          this.objectValidateForm.fixedAssetCategoryId = true;
          checkValidate = true;
        }
        if(this.FixedAsset.quantity == "" || this.FixedAsset.quantity === 0){
          this.objectValidateForm.quantity = true;
          checkValidate = true;
        }
        if(this.FixedAsset.depreciationRate == "" || this.FixedAsset.depreciationRate === 0){
          this.objectValidateForm.depreciationRate = true;
          checkValidate = true;
        }
        if(this.FixedAsset.lifeTime == "" || this.FixedAsset.lifeTime === 0){
          this.objectValidateForm.lifeTime = true;
          checkValidate = true;
        }
        if(this.FixedAsset.cost == "" || this.FixedAsset.cost === 0){
          this.objectValidateForm.cost = true;
          checkValidate = true;
        }
        if(this.FixedAsset.valueAtrophyYear == "" || this.FixedAsset.valueAtrophyYear === 0){
          this.objectValidateForm.valueAtrophyYear = true;
          checkValidate = true;
        }

        // Kiểm tra nghiệp vụ
        // if(this.FixedAsset.depreciationRate != Number(100/this.FixedAsset.lifeTime).toFixed(2)){
        //   major = 1;
        // }

        // Kiểm tra validate ở các trường
        if (checkValidate) {
          this.modeRequest = Enum.ModeRequest.ValidateEmpty;
          this.isShowDialogValidate = true;
          
        }else {
          //Kiểm tra xem thuộc loại form mode nào
          switch (this.mode) {
            case Enum.Mode.Update:
              axios
                .put(
                  `http://localhost:63515/api/v1/Assets/${this.FixedAsset.fixedAssetId}`,
                  {
                    fixedAssetId: this.FixedAsset.fixedAssetId,
                    fixedAssetCode: this.FixedAsset.fixedAssetCode,
                    fixedAssetName: this.FixedAsset.fixedAssetName,
                    departmentId: this.FixedAsset.departmentId,
                    fixedAssetCategoryId: this.FixedAsset.fixedAssetCategoryId,
                    purchaseDate: this.FixedAsset.purchaseDate,
                    useDate: this.FixedAsset.useDate,
                    cost: this.FixedAsset.cost,
                    valueAtrophyYear: this.FixedAsset.valueAtrophyYear,
                    quantity: this.FixedAsset.quantity,
                    depreciationRate: this.FixedAsset.depreciationRate,
                    trackedYear: this.FixedAsset.trackedYear,
                    lifeTime: this.FixedAsset.lifeTime,
                    productionYear: this.FixedAsset.productionYear,
                    createdBy: "Hoàng Tô Nghĩa",
                    createdDate: "2022-12-26T17:50:33.580Z",
                    modifiedBy: "Trung Văn Kiên",
                    modifiedDate: "2022-12-26T17:50:33.580Z",
                  }
                )
                .then((res) => {
                  console.log(res);
                })
                .catch((res) =>{
                  this.handleErrorApi(res.response.data.errorCode);
                });

              this.$emit("onShowToastSuccess");
              this.canceForm();
              break;

            // Mặc định sẽ là thêm mới
            default:
              // Biến kiểm tra mã trùng
              var checkCodeMiddle = true;
              // Response trả về
              var response;
              var checkMajor = (this.FixedAsset.depreciationRate == Math.round(100/this.FixedAsset.lifeTime));
              console.log(checkMajor);

              if (checkMajor) {
                await axios.post("http://localhost:63515/api/v1/Assets", {
                    fixedAssetId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    fixedAssetCode: this.FixedAsset.fixedAssetCode,
                    fixedAssetName: this.FixedAsset.fixedAssetName,
                    departmentId: this.FixedAsset.departmentId,
                    fixedAssetCategoryId: this.FixedAsset.fixedAssetCategoryId,
                    purchaseDate: this.FixedAsset.purchaseDate,
                    useDate: this.FixedAsset.useDate,
                    cost: this.FixedAsset.cost,
                    valueAtrophyYear: this.FixedAsset.valueAtrophyYear,
                    quantity: this.FixedAsset.quantity,
                    depreciationRate: this.FixedAsset.depreciationRate,
                    trackedYear: this.FixedAsset.trackedYear,
                    lifeTime: this.FixedAsset.lifeTime,
                    productionYear: this.FixedAsset.productionYear,
                    createdBy: "Hoàng Tô Nghĩa",
                    createdDate: "2022-12-26T17:50:33.580Z",
                    modifiedBy: "Trung Văn Kiên",
                    modifiedDate: "2022-12-26T17:50:33.580Z",
                  })
                  .then((res) => {
                    response = res.response;
                    checkCodeMiddle = false;
                  })
                  .catch((res) =>{
                    response = res.response;
                    checkCodeMiddle = true;
                  });   

                  if (checkCodeMiddle) {
                    if(response.data.errorCode == Enum.ErrorCode.ValidateCodeError){
                      this.modeRequest = Enum.ModeRequest.ExistCode;
                      this.isShowDialogValidate = true;
                    }
                  }else{
                    this.$emit("onShowToastSuccess");
                    this.canceForm();
                  }
              } else {
                this.modeRequest = Enum.ModeRequest.CheckDepreciationRateLifeTime;
                this.isShowDialogValidate = true;
              }
               
              break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    //Lấy tên bộ phận sử dụng bởi id bộ phận sử dụng
    getPartNameByDepartmentId(departmentId) {
      for (const department of this.Departments) {
        if (department.departmentId == departmentId)
          return department.departmentName;
      }
    },

    //Lấy mã bộ phận sử dụng bởi id bộ phận sử dụng
    getPartCodeByDepartmentId(departmentId) {
      for (const department of this.Departments) {
        if (department.departmentId == departmentId)
          return department.departmentCode;
      }
    },

    //Lấy tên loại tài sản bởi id loại tài sản
    getTypeAssetNameByFixedAssetCategoryId(fixedAssetCategoryId) {
      for (const assetCategory of this.AssetCategorys) {
        if (assetCategory.fixedAssetCategoryId == fixedAssetCategoryId)
          return assetCategory.fixedAssetCategoryName;
      }
    },

    //Lấy mã loại tài sản bởi id loại tài sản
    getTypeAssetCodeByFixedAssetCategoryId(fixedAssetCategoryId) {
      for (const assetCategory of this.AssetCategorys) {
        if (assetCategory.fixedAssetCategoryId == fixedAssetCategoryId)
          return assetCategory.fixedAssetCategoryCode;
      }
    },

    //Lấy số năm sử dụng bở mã loại tài sản
    getNumberYearOfUseByTypeAssetCode(TypeAssetCode) {
      for (const typeAsset of this.AssetCategorys) {
        if (typeAsset.TypeAssetCode == TypeAssetCode)
          return typeAsset.NumberYearOfUse;
      }
    },

    //Lấy tỷ lệ hao mòn dựa trên mã loại tài sản
    getWearRateByTypeAssetCode(TypeAssetCode) {
      for (const typeAsset of this.AssetCategorys) {
        if (typeAsset.TypeAssetCode == TypeAssetCode) return typeAsset.WearRate;
      }
    },

    //Truyền giá trị tài sản ban đầu vào form
    CreateFormUpdate(updateAsset) {
      this.FixedAsset.fixedAssetId = updateAsset.fixedAssetId;
      this.FixedAsset.fixedAssetCode = updateAsset.fixedAssetCode;
      this.FixedAsset.fixedAssetName = updateAsset.fixedAssetName;
      this.FixedAsset.departmentId = updateAsset.departmentId;
      this.FixedAsset.fixedAssetCategoryId = updateAsset.fixedAssetCategoryId;
      this.FixedAsset.purchaseDate = updateAsset.purchaseDate;
      this.FixedAsset.useDate = updateAsset.useDate;
      this.FixedAsset.cost = updateAsset.cost;
      this.FixedAsset.quantity = updateAsset.quantity;
      this.FixedAsset.depreciationRate = updateAsset.depreciationRate;
      this.FixedAsset.trackedYear = updateAsset.trackedYear;
      this.FixedAsset.lifeTime = updateAsset.lifeTime;
      this.FixedAsset.productionYear = updateAsset.productionYear;
      this.FixedAsset.valueAtrophyYear = updateAsset.valueAtrophyYear;
    },

    //Truyền giá trị tài sản ban đầu vào form
    CreateFormDuplicate(duplicateAsset) {
      this.FixedAsset = duplicateAsset;
    },

    // Xử lý Error API trả về
    handleErrorApi(errorCode){
      console.log("Mã lỗi: ", errorCode);
    },

      // Xử lý hành động đóng dialog validate
    closeDialogValidate(){
      this.isShowDialogValidate = false;
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

.position-relative {
  position: relative;
}

.cl-red {
  color: red;
  position: relative;
  top: 3px;
}

.bg-ccc {
  background-color: rgb(225, 225, 225);
}

.black-ground {
  display: inline-block;
  box-sizing: border-box;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
}

.form-add {
  box-sizing: border-box;
  width: 1000px;
  height: 622px;
  top: calc((100vh - 622px) / 2);
  bottom: calc((100vh - 622px) / 2);
  right: calc((100vw - 1000px) / 2);
  left: calc((100vw - 1000px) / 2);
  background-color: #ffffff;
  position: fixed;
  z-index: 100;
  border-radius: 6px;
  overflow: hidden;
}

.form-add__container {
  width: 100%;
  height: calc(100% - 108px);
  box-sizing: border-box;
  margin-top: 24px;
}

.form-add__container__head {
  display: flex;
  justify-content: space-between;
  margin-left: 24px;
  margin-right: 24px;
}

.form-add__container__head__title {
  font-size: 20px;
  font-weight: 600;
}

.form-add__container__head .icon-close {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -375px -287px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.form-add__container__body {
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 13px;
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.col1-3 {
  display: flex;
  flex-direction: column;
  width: calc(100% / 3 - 12px);
}

.col2-3 {
  display: flex;
  flex-direction: column;
  width: calc(2 * 100% / 3 - 12px);
}

.col1-3-center {
  width: calc(100% / 3 - 23px) !important;
}

.form-row label {
  font-size: 14px;
  font-weight: 500;
}

.form-row .form-control {
  height: 36px;
  margin-top: 8px;
  padding-left: 8px;
  padding-right: 10px;
  font-size: 14px;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  outline: none;
  width: 100%;
}

.form-control:hover {
  border-color: #1aa4c8;
}

.col-select {
  position: relative;
  margin-top: 8px;
  border: 1px solid #b3b3b3;
  font-size: 14px;
  font-style: italic;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  border-radius: 3px;
  display: flex;
  width: 100%;
}

.col-select:hover, .col-select:focus, .col-select:active {
  border-color: #1aa4c8;
}

.col-select:focus-visible{
  /* border-color: #1aa4c8; */
}

.option-filter__content {
  padding-left: 8px;
  padding-right: 4px;
  flex: 1;
  height: 36px;
  border: none;
  outline: none;
  cursor: context-menu;
}

.select-option.icon-down {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -62px -330px;
  width: 20px;
  height: 20px;
  margin: 7px;
}

.option-filter-items {
  position: absolute;
  margin-top: 3px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
  width: 100%;
  left: -1px;
  top: 34px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.option-filter-item {
  display: none;
  background-color: #ffffff;
  width: calc(100% + 2px);
  height: 36px;
  font-size: 14px;
  line-height: 34px;
  padding-left: 6px;
  font-style: normal;
}

.option-filter-item:hover {
  background-color: rgb(176, 219, 229);
  cursor: pointer;
}

.date-picker {
  margin-top: 8px;
}

.icon-datepicker {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -287px -67px;
  width: 18px;
  height: 18px;
  position: relative;
  top: -26px;
  right: -276px;
}

.form-add__container__foot {
  width: 100%;
  height: 82px;
  background-color: rgb(227, 227, 227);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.form-add__container__foot .btn-submit {
  width: 100px;
  height: 36px;
  margin: 12px 24px 12px 12px;
  outline: none;
  border: none;
  line-height: 36px;
  text-align: center;
  background-color: #1aa4c8;
  border-radius: 2px;
  color: #fff;
  cursor: pointer;
}

.form-add__container__foot .btn-submit:hover,
.form-add__container__foot .btn-submit:focus-visible{
  background-color: #1688A6;

}

.form-add__container__foot .btn-submit:focus-visible{
  border: none;
}

.form-add__container__foot .btn-cancel {
  border: none;
  outline: none;
  width: 100px;
  height: 36px;
  margin: 12px 0 12px 12px;
  line-height: 36px;
  text-align: center;
  background-color: #FBFBFB;
  border-radius: 2px;
  color: #000;
  cursor: pointer;
}

.form-add__container__foot .btn-cancel:hover, 
.form-add__container__foot .btn-cancel:focus-visible{
  background-color: #1aa4c8;
}

.form-group {
}

.form-group .form-message {
  font-size: 13px;
  height: 16px;
  line-height: 16px;
  color: #f33a58;
}

.form-group.invalid .form-control {
  border-color: #f33a58;
}

.text-align-right {
  text-align: right;
}

.padding-right-20 {
  padding-right: 20px !important;
}

.padding-right-32{
  padding-right: 32px !important;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

.out-ip {
  display: flex;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f4f7ff;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
}

.padding-0{
  padding: 0 !important;
}

.input-number{
    position: relative;
}

.input-number__class{
    height: 36px;
    margin-top: 8px;
    padding-right: 32px;
    font-size: 14px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    outline: none;
    width: 100%;
    text-align: right;
    flex: 1;
}

.input-number__class:hover{
    border-color: #1aa4c8;
}

.input-number .icon-up{
    
}

.input-number .icon-UpAndDown{
    background: url("@/assets/icon/qlts-icon.png") no-repeat -204px -332px;
    width: 10px;
    height: 20px;
    position: absolute;
    top: 18px;
    right: 9px;
}

.input-money{
  border: 1px solid #b3b3b3;
  border-radius: 3px;
  margin-top: 8px;
}

.active_ip{
  border: 1px solid #f33a58 !important;
}

.input-money:hover{
  border-color: #1aa4c8;
}
</style>


