<template>
  <div>
    <div class="content__option">
      <div class="content__option__left">
        <div class="option-search">
          <div class="icon-search"></div>
          <input
            @keydown="filterByAssetName"
            type="text"
            ref="ipSearch"
            :placeholder="Placeholder.SearchAsset"
          />
        </div>
        <div class="option-filter">
          <input-Filter :modeFilter="1" @filter="filterCategoryAsset"/>
        </div>
        <div class="option-filter">
          <input-Filter :modeFilter="2" @filter="filterDepartment"/>
        </div>
      </div>
      <div class="content__option__right">
        <div class="content__option__right__btn-add-asset" @click="ShowFormAdd">
          {{ Title.AddAsset }}
        </div>
        <export-excel :data="json_data" :name="'qlts.xls'">
          <div class="content__option__right_btn">
            <div class="icon-updt" :title="Tooltip.ExportTooltip"></div>
          </div>
        </export-excel>
        <div class="content__option__right_btn">
          <div
            id="delete"
            class="icon-deleteRed"
            @click="checkDeleteData"
            :title="Tooltip.DeleteTooltip"
          ></div>
        </div>
      </div>
    </div>
    <div class="content__table">
      <table>
        <thead>
          <tr class="table-start">
            <th class="ta-left">
              <input class="ip-checkbox" type="checkbox" ref="checkFull" @click="changeInputCheckFull"/>
            </th>
            <th class="ta-center w32" :title="Tooltip.SerialTooltip">
              {{ ContentText.Serial }}
            </th>
            <th class="ta-left w130">{{ ContentText.FixedAssetCode }}</th>
            <th class="ta-left w200">{{ ContentText.FixedAssetName }}</th>
            <th class="ta-left w130">
              {{ ContentText.FixedAssetCategoryName }}
            </th>
            <th class="ta-left w180">{{ ContentText.Department }}</th>
            <th class="ta-right w70">{{ ContentText.Quantity }}</th>
            <th class="ta-right w100">{{ ContentText.Cost }}</th>
            <th class="ta-right w100" :title="Tooltip.AccumulatedTooltip">
              {{ ContentText.Accumulated }}
            </th>
            <th class="ta-right w100">{{ ContentText.ResidualValue }}</th>
            <th class="w100">{{ ContentText.Feature }}</th>
          </tr>
        </thead>
      </table>

      <div class="table-body">
        <table>
          <tbody>
            <tr
              class="table-start"
              v-for="(asset, index) in assets"
              :key="index"
              @click="activeRecord($event)"
              @dblclick="ShowFormUpdate(asset)"
            >
              <td class="ta-left">
                <input
                  :data="asset.fixedAssetId"
                  ref="ipCheckbox"
                  class="ip-checkbox"
                  type="checkbox"
                  @change="changeInputCheckBox"
                />
              </td>
              <td id="stt" class="ta-center w32">{{ index + 1 }}</td>
              <td class="ta-left w130 line-clamp">{{ asset.fixedAssetCode }}</td>
              <td class="ta-left w200 line-clamp">{{ asset.fixedAssetName }}</td>
              <td class="ta-left w130 line-clamp">
                {{ getNameAssetCategory(asset.fixedAssetCategoryId) }}
              </td>
              <td class="ta-left w180 line-clamp">
                {{ getNamePart(asset.departmentId) }}
              </td>
              <td class="ta-right w70 line-clamp">{{ asset.quantity }}</td>
              <td class="ta-right w100 line-clamp">
                {{ formatCash(asset.cost.toString()) }}
              </td>
              <td class="ta-right w100 line-clamp">
                {{
                  formatCash(
                    getAccumulated(asset.cost, asset.depreciationRate).toString()
                  )
                }}
              </td>
              <td class="ta-right w100 line-clamp">
                {{
                  formatCash(
                    getResidualValue(
                      asset.cost,
                      asset.depreciationRate
                    ).toString()
                  )
                }}
              </td>
              <td class="w100 col2 mandate">
                <div class="bg-icon">
                  <div class="icon-update" @click="ShowFormUpdate(asset)" title="Sửa"></div>
                </div>
                <div class="bg-icon">
                  <div
                  class="icon-duplicate"
                  @click="deleteDataInline(asset.fixedAssetId)"
                  title="Xóa"
                  ></div>
                </div>
              </td>
            </tr>
            <tr class="table-start-not-valid" v-if="isShowTableNull">Không có bản ghi nào thỏa mãn</tr>
          </tbody>
        </table>
      </div>

      <table>
        <tfoot>
          <tr class="table-start">
            <td class="ta-center total-records w150">
              {{ ContentText.Sum }}<b>{{ totalRecord }}</b>
              {{ ContentText.Record }}
            </td>
            <td class="number-records w60" @click="showOptionNumberRecord()">
              <div class="number-record-text">{{ this.APIFixedAssetFilter.limit }}</div>
              <div class="icon-down"></div>
              <div class="w60 number-record-selects" v-if="isNumberRecord">
                <div class="w60 number-record-select" @click.stop="changeNumberRecord(10)">10</div>
                <div class="w60 number-record-select" @click.stop="changeNumberRecord(20)">20</div>
                <div class="w60 number-record-select" @click.stop="changeNumberRecord(30)">30</div>
                <div class="w60 number-record-select" @click.stop="changeNumberRecord(40)">40</div>
                <div class="w60 number-record-select" @click.stop="changeNumberRecord(50)">50</div>
              </div>
            </td>
            <td class="number-of-pages w230">
              <div class="number-of-page icon-prew" @click="prewPage" title="Trang trước"></div>
              <div
                class="number-of-page pageNode"
                v-for="(page, index) in totalPage"
                :key="index"
                @click="changePage($event, page)"
                ref="paging"
              >
                {{ page }}
              </div>
              <div class="number-of-page icon-next" @click="nextPage" title="Trang sau"></div>
            </td>
            <td class="w5"></td>
            <td class="w70"></td>
            <td class="w180"></td>
            <td class="ta-right w70">{{ sumQuantity }}</td>
            <td class="ta-right w100">
              {{ formatCash(sumCost.toString()) }}
            </td>
            <td class="ta-right w100">
              {{ formatCash(sumAccumulated.toString()) }}
            </td>
            <td class="ta-right w100">
              {{ formatCash(sumResidualValue.toString()) }}
            </td>
            <td class="w100"></td>
          </tr>
        </tfoot>
      </table>
    </div>
    <FormMode
      @onShowToastSuccess="showToastSuccess"
      v-if="isShowForm"
      :mode="mode"
      :updateAsset="updateAsset"
      :duplicateAsset="duplicateAsset"
      @hide-Form="hideForm()"
    />
    <dialogDelete
      @onDeleteConfirm="deleteData"
      @onUnDeleteConfirm="closeDialogDelete"
      @onDeleteConfirmOne="deleteDataOne"
      :modeDelete="modeDelete"
      v-if="isShowDialogDelete"
    />
    <dialogLoading v-if="isShowDialogLoading" />
    <toastSuccess v-if="isShowToastSuccess" />
    <toastFail v-if="isShowToastDelete" />
  </div>
</template>
<script>
import axios from "axios";
import FormMode from "@/components/base/popup/FormMode";
import inputFilter from '@/components/base/popup/InputFilter'
import Enum from "@/js/enum.js";
import Resource from "@/js/resource.js";
import toastSuccess from "@/components/base/toast-message/ToastSuccess";
import dialogDelete from "@/components/base/dialog/DialogDelete";
import dialogLoading from "@/components/base/dialog/DialogLoading";
import toastFail from "@/components/base/toast-message/ToastFail";
import { APIFilter } from "@/class/APIFilter.js";
// import { Department } from "@/class/Department.js";
export default {
  components: {
    FormMode,
    toastSuccess,
    dialogDelete,
    dialogLoading,
    toastFail,
    inputFilter
  },
  name: "TheMain",
  data() {
    return {
      mode: 0, // mode của form
      modeDelete: 0, //Mode của delete
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      Tooltip: Resource.Tooltip, //Tooltip gọi từ file resource.js
      Placeholder: Resource.Placeholder, //Placeholder gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      updateAsset: {}, // tài sản truyền vào form cập nhật tài sản
      assets: [], // Danh sách tài sản lấy từ API
      AssetCategorys: [], // Danh sách loại tìa sản lấy từ API
      FilterAssetCategorys: [], // Danh sách loại tìa sản lấy từ API
      Departments: [], // Danh sách bộ phận sử dụng lấy từ API
      isShowForm: false, // Ẩn hiện form
      APIFixedAssetFilter: new APIFilter(), // Đối tượng truyền vài api tài sản
      APIAssetCategoryFilter: new APIFilter(), // Đối tượng truyền vài api loại tài sản
      APIAssetDepartment: new APIFilter(), // Đối tượng truyền vài api bộ phận sử dụng
      totalRecord: 0, // Tổng ố bản ghi bị ảnh hưởng
      isShowToastSuccess: false,
      isShowToastDelete: false,
      isShowDialogDelete: false,
      isShowDialogLoading: true,
      isShowTableNull: false, 
      isNumberRecord: false,
      assetSelected: {}, //
      APIFixedAsset: "", // chuỗi API lấy tài sản
      APIDepartment: "", // chuỗi API lấy danh sách phòng ban
      APIFixedAssetCategory: "", // chuỗi API lấy danh sách loại tài sản
      totalPage: 0, // Tổng số trang
      currenPage: 1, // Trang hiện tại đang xuất hiện
      assetIdDelete: "", // Id asset khi xóa trên dòng
      json_fields: {
            'STT': 'name',
            'Mã tài sản': 'city',
            'Tên tài sản': 'phone.mobile',
            'Tên loại tài sản': 'phone.mobile',
            'Bộ phận sử dụng': 'phone.mobile',
            'Số lượng': 'phone.mobile',
            'Nguyên giá': 'phone.mobile',
            'HM/KH lũy kế': 'phone.mobile',
            'Giá trị còn lại': 'phone.mobile',
      },
      json_data: [],
      json_meta: [
            [
                {
                    'key': 'charset',
                    'value': 'utf-8'
                }
            ]
      ],
    };
  },
  created() {
    // Cài đặt API lấy tài sản
    this.APIFixedAsset =
      "http://localhost:63515/api/Assets/filter?keyword=" +
      this.APIFixedAssetFilter.keyword +
      "&limit=" +
      this.APIFixedAssetFilter.limit +
      "&offset=" +
      this.APIFixedAssetFilter.offset +
      "&departmentId=" +
      this.APIFixedAssetFilter.departmentId +
      "&fixedAssetCategoryId=" +
      this.APIFixedAssetFilter.fixedAssetCategoryId;
    // Cài đặt API lấy danh sách phòng ban
    this.APIDepartment = "http://localhost:63515/api/v1/Departments/filter?keyword=";
    // Cài đặt API lấy danh sách loại tài sản
    this.APIFixedAssetCategory = "http://localhost:63515/api/AssetCategorys/filter?keyword=" + this.APIAssetCategoryFilter.keyword;
    // Load dữ liệu trang
    this.loadData();
  },
  updated() {
    // Cài đặt API lấy tài sản
    this.APIFixedAsset =
      "http://localhost:63515/api/Assets/filter?keyword=" +
      this.APIFixedAssetFilter.keyword +
      "&limit=" +
      this.APIFixedAssetFilter.limit +
      "&offset=" +
      this.APIFixedAssetFilter.offset +
      "&departmentId=" +
      this.APIFixedAssetFilter.departmentId +
      "&fixedAssetCategoryId=" +
      this.APIFixedAssetFilter.fixedAssetCategoryId;
    // Cài đặt API lấy danh sách phòng ban
    this.APIDepartment = "http://localhost:63515/api/v1/Departments/filter?keyword=";
    // Cài đặt API lấy danh sách loại tài sản
    this.APIFixedAssetCategory = "http://localhost:63515/api/AssetCategorys/filter?keyword=" + this.APIAssetCategoryFilter.keyword;
    // Custom paging khi trang hiện tại là trang đầu tiên (currenPage = 1)
    if (this.currenPage == 1) {
      let pages = document.querySelectorAll(".pageNode");
      // Trường hợp pages = [] sẽ bị lỗi => bỏ qua trường hợp này
      try {
        // Thêm class active cho trang hiện tại (tô đậm)
        pages[0].classList.add("number-of-page-active");
        this.isShowTableNull = false;
      } catch (error) {
        this.isShowTableNull = true;
      }
      // Xóa toàn bộ element ...
      let listnode = document.querySelectorAll(".dotNode");
      if (listnode) {
        for (let node of listnode) {
          node.remove();
        }
      }
      // custom paging (xóa những trang ko liền kề đầu, cuối, currentPage)
      if (this.totalPage > 3) {
        for (let i = 2; i < this.totalPage - 1; i++) {
          pages[i].style.display = "none";
        }
        let html = '<div class="number-of-page dotNode">...</div>';
        pages[1].insertAdjacentHTML("afterend", html);
      }
    }
    
  },
  methods: {
    // Cập nhật API lấy tài sản
    getAPIFixedAsset() {
      return (
        "http://localhost:63515/api/v1/Assets/filter?keyword=" +
        this.APIFixedAssetFilter.keyword +
        "&limit=" +
        this.APIFixedAssetFilter.limit +
        "&offset=" +
        this.APIFixedAssetFilter.offset +
        "&departmentId=" +
        this.APIFixedAssetFilter.departmentId +
        "&fixedAssetCategoryId=" +
        this.APIFixedAssetFilter.fixedAssetCategoryId
      );
    },
    // Cập nhật API lấy danh sách phòng ban
    getAPIDepartment() {
      return "http://localhost:63515/api/v1/Departments/filter?keyword=";
    },
    // Cập nhật API lấy danh sách loại tài sản
    getAPIFixedAssetCategory() {
      return "http://localhost:63515/api/AssetCategorys/filter?keyword=" + this.APIAssetCategoryFilter.keyword;
    },
    /**
     * Hàm format tiền str: String
     * Tạo bởi: DuongPV(20/12/2022)
     */
    formatCash(str) {
      return str
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ".") + prev;
        });
    },
    /**
     * Hàm Load data
     * Tạo bởi: DuongPV(20/12/2022)
     */
    loadData() {
      // load danh sách tài sản
      this.isShowDialogLoading = true;
      try {
        fetch(this.getAPIFixedAsset())
          .then((response) => {
            return response.json();
          })
          .then((asset) => {
            // Cập nhật danh sách tài sản trả về trong trang
            this.assets = asset.data;
            // Cập nhật danh sách sô bản ghi bị ảnh hưởng
            this.totalRecord = asset.totalRecord;
            //Cập nhật số trang = số bản ghi bị ảnh hưởng / số tài sản trong 1 trang
            this.totalPage = Math.ceil(asset.totalRecord / this.APIFixedAssetFilter.limit);
            this.isShowDialogLoading = false;
          });
      } catch (error) {
        console.log(error);
      }
      // load danh sách loại tài sản
        try {
          fetch(this.getAPIFixedAssetCategory())
            .then((response) => {
              return response.json();
            })
            .then((AssetCategory) => {
                this.AssetCategorys = AssetCategory.data;
                this.FilterAssetCategorys = AssetCategory.data.map(function(assetCategory){
                  return {
                    id: assetCategory.fixedAssetCategoryId,
                    code: assetCategory.fixedAssetCategoryCode,
                    name: assetCategory.fixedAssetCategoryName
                  }
                });
            });
        } catch (error) {
          console.log(error);
        }
      // load danh sách phòng ban
      try {
        fetch(this.getAPIDepartment())
          .then((response) => {
            return response.json();
          })
          .then((part) => {
            this.Departments = part.data;
          });
      } catch (error) {
        console.log(error);
      }
      
      let _this = this;
      setTimeout(function(){
        try {
          // Cập nhật json-data
        _this.updateJsonData();
        } catch (error) {
          console.log(error);
        }
      }, 1000);
    },
    /**
     * Hàm hàm lấy ra tên loại tài sản tương ứng với mã tài sản truyền vào
     * Tạo bởi: DuongPV(20/12/2022)
     */
    getNameAssetCategory(fixedAssetCategoryId) {
      if(this.AssetCategorys != []){
        for (const AssetCategory of this.AssetCategorys) {
        if (AssetCategory.fixedAssetCategoryId === fixedAssetCategoryId) {
          return AssetCategory.fixedAssetCategoryName;
        }
      }
      }
    },
    /**
     * hàm lấy ra tên bộ phận sử dụng với mã bộ phận sử dụng truyền vào
     * Tạo bởi: DuongPV(20/12/2022)
     */
    getNamePart(departmentId) {
      for (const Part of this.Departments) {
        if (Part.departmentId === departmentId) {
          return Part.departmentName;
        }
      }
    },
    updateJsonData(){
      let _this = this;
      let stt = 1;
      // Cập nhật data json_data
      _this.json_data = [];
      for (const asset of this.assets) {
        let rowData;
        rowData = {
          'STT': stt,
          'Mã tài sản': asset.fixedAssetCode,
          'Tên tài sản': asset.fixedAssetName,
          'Tên loại tài sản': _this.getNameAssetCategory(asset.fixedAssetCategoryId),
          'Bộ phận sử dụng': _this.getNamePart(asset.departmentId),
          'Số lượng': asset.quantity,
          'Nguyên giá': _this.formatCash(asset.cost.toString()),
          'HM/KH lũy kế': _this.formatCash(_this.getAccumulated(asset.cost, asset.depreciationRate).toString()),
          'Giá trị còn lại': _this.formatCash(_this.getResidualValue(asset.cost,asset.depreciationRate).toString()),
        }
        stt++;
        _this.json_data.push(rowData)
      }
    },
    /**
     * hàm tính lũy kế = nguyên giá * tỷ lệ hao mòn năm
     * Tạo bởi: DuongPV(20/12/2022)
     */
    getAccumulated(cost, depreciationRate) {
      return Math.round((cost * depreciationRate) / 100);
    },
    /**
     * hàm tính giá trị giá trị còn lại = nguyên giá - lũy kế
     * Tạo bởi: DuongPV(20/12/2022)
     */
    getResidualValue(cost, depreciationRate) {
      return cost - this.getAccumulated(cost, depreciationRate);
    },
    /**
     * Bât tắt form khi đóng mở thêm mới
     * Tạo bởi: DuongPV(20/12/2022)
     */
    ShowFormAdd() {
      this.isShowForm = true;
      this.mode = Enum.Mode.Add;
    },
    /**
     * Xử lý sự kiện khi click vào từng hàng để sửa thông tin
     * Tạo bởi: DuongPV(20/12/2022)
     */
    ShowFormUpdate(asset) {
      try {
        this.isShowForm = !this.isShowForm;
        this.mode = Enum.Mode.Update;
        this.updateAsset = asset;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Xử lý sự kiện khi click vào từng hàng để sửa thông tin
     * Tạo bởi: DuongPV(20/12/2022)
     */
    ShowFormDuplicate(e, asset) {
      e.stopImmediatePropagation;
      try {
        this.isShowForm = !this.isShowForm;
        this.mode = Enum.Mode.Duplicate;
        this.duplicateAsset = asset;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hiện toast success khi thêm mới hoặc cập nhật
     * Tạo bởi: DuongPV(20/12/2022)
     */
    showToastSuccess() {
      setTimeout(() => {
        this.isShowToastSuccess = true;
        this.loadData();
      }, 500);
      setTimeout(() => {
        this.isShowToastSuccess = false;
      }, 3000);
    },
    /**
     * Hiện toast delete khi thêm xóa thành công
     * Tạo bởi: DuongPV(20/12/2022)
     */
    showToastDelete() {
      this.isShowToastDelete = true;
      setTimeout(() => {
        this.isShowToastDelete = false;
      }, 3000);
    },
    /**
     * Xử lý sự kiện khi đóng mở Option Record
     * Tạo bởi: DuongPV(20/12/2022)
     */
    showOptionNumberRecord(){
      this.isNumberRecord = !this.isNumberRecord;
    },
    /**
     * Xử lý sự kiện khi thay đổi Option Record
     * Tạo bởi: DuongPV(20/12/2022)
     */
    changeNumberRecord(value){
      this.APIFixedAssetFilter.limit = value;
      this.loadData();
      this.isNumberRecord = false;
    },
    /**
     * Xác nhận xóa bản ghi: gọi dialog delete
     * Tạo bởi: DuongPV(20/12/2022)
     */
    checkDeleteData() {
      let ipCheckboxs = this.$refs.ipCheckbox;
      let checkOnlyOne = false;
      // Kiểm tra xem có ô nào chưa tích không
      for (const ipCheckbox of ipCheckboxs) {
        if(ipCheckbox.checked == true){
          checkOnlyOne = true;
          break;
        }
      }
      if(checkOnlyOne){
        // Nếu như có ít nhất 1 ô đã tích => thực hiện xóa nhiều
        this.modeDelete = Enum.Mode.ModeDelete;
        this.isShowDialogDelete = true;
      }else{
        // Nếu như chưa có ô nào tích => show cảnh báo chưa có ô nào được chọn
        this.modeDelete = Enum.Mode.ValueEmpty;
        this.isShowDialogDelete = true;
      }
    },
    deleteDataInline(fixedAssetId){
      this.assetIdDelete = fixedAssetId;
      this.modeDelete = Enum.Mode.ModeDeleteOne;
      this.isShowDialogDelete = true;
    },
    /**
     * Hàm ẩn Form
     * Tạo bởi: DuongPV(20/12/2022)
     */
    hideForm() {
      this.isShowForm = false;
    },
    /**
     * Xóa bản ghi (xóa những ô được tích)
     * Tạo bởi: DuongPV(20/12/2022)
     */
    deleteData() {
      let listIpCheckbox = this.$refs.ipCheckbox;
      for (const ipCheckbox of listIpCheckbox) {
        if (ipCheckbox.checked) {
          axios
            .delete(
              `http://localhost:63515/api/v1/Assets/${ipCheckbox.attributes.data.value}`,
              {}
            )
            .then((res) => {
              console.log(res);
              this.showToastDelete();
              ipCheckbox.checked = false;
            })
            .then(() => {
              this.loadData();
              // Cập nhật lại trạng thái thẻ ip check (bỏ sáng mấy ô đang tích)
              this.changeInputCheckBox();
            });
        }
      }
      this.isShowDialogDelete = false;
    },
    /**
     * Xóa 1 bản ghi (Inline)
     * Tạo bởi: DuongPV(20/12/2022)
     */
    deleteDataOne(){
      axios.delete(`http://localhost:63515/api/v1/Assets/${this.assetIdDelete}`,{})
        .then((res) => {
          console.log(res);
          this.showToastDelete();
        })
        .then(() => {
          this.loadData();
        });
        
      this.isShowDialogDelete = false;
    },
    /**
     * Xóa 1 bản ghi theo id truyền vào
     * Tạo bởi: DuongPV(20/12/2022)
     */
    deleteOne(){
      console.log(this.assetIdDelete);
    },
    /**
     * Đóng dialog
     * Tạo bởi: DuongPV(20/12/2022)
     */
    closeDialogDelete() {
      this.isShowDialogDelete = false;
    },
    /**
     * Bắt sự kiện khi ấn enter ở search
     * Tạo bởi: DuongPV(3/1/2023)
     */
    filterByAssetName(e) {
      try {
        var ipSearch = this.$refs.ipSearch;
        if (e.keyCode === Enum.KeyCode.ENTER) {
          this.APIFixedAssetFilter.keyword = ipSearch.value;
          this.loadData();
        }
        // search xong thì đặt lại offset = 0
        this.APIFixedAssetFilter.offset = 0;
      } catch (error) {
        console.log(error);
      }
    },
    // Bắt sự kiện lọc loại tài sản
    filterCategoryAsset(fixedAssetCategoryId){
      this.APIFixedAssetFilter.fixedAssetCategoryId = fixedAssetCategoryId;
      this.loadData();
    },
    // Bắt sự kiện lọc bộ phận sử dụng
    filterDepartment(departmentId){
      this.APIFixedAssetFilter.departmentId = departmentId;
      this.loadData();
    },
    // Bắt sự kiện khi thay đổi page
    changePage(e, page) {
      let pages = this.$refs.paging;
      // Đạt lại trang hiện tại
      this.currenPage = page;
      // Load lại page phù hợp
      this.APIFixedAssetFilter.offset = (this.currenPage - 1) * this.APIFixedAssetFilter.limit;
      this.loadData();
      // Xóa class active ở tất cả các trang
      for (let i = 0; i < this.totalPage; i++) {
        pages[i].classList.remove("number-of-page-active");
      }
      // Thêm class active cho trang hiện tại (tô đậm)
      e.target.classList.add("number-of-page-active");
      // Hiện lại tất cả paging
      for (let i = 0; i < this.totalPage; i++) {
        pages[i].style.display = "inline-block";
      }
      // Xóa toàn bộ element ...
      let listnode = document.querySelectorAll(".dotNode");
      if (listnode) {
        for (let node of listnode) {
          node.remove();
        }
      }
      // custom paging (xóa những trang ko liền kề đầu, cuối, currentPage)
      if (this.currenPage - 1 > 2) {
        for (let i = 1; i < this.currenPage - 2; i++) {
          pages[i].style.display = "none";
        }
        let html = '<div class="number-of-page dotNode">...</div>';
        pages[0].insertAdjacentHTML("afterend", html);
      }
      if (this.totalPage - this.currenPage > 2) {
        for (let i = this.totalPage - 2; i > this.currenPage; i--) {
          pages[i].style.display = "none";
        }
        let html = '<div class="number-of-page dotNode">...</div>';
        pages[this.totalPage - 1].insertAdjacentHTML("beforebegin", html);
      }
    },
    // Bắt sự kiện khi next page
    nextPage(e) {
      //Lấy vị trí của trang hiện tại
      var page = this.currenPage;
      if (page < this.totalPage) {
        let pages = this.$refs.paging;
        // Đạt lại trang hiện tại
        this.currenPage = page + 1;
        // Load lại page phù hợp
        this.APIFixedAssetFilter.offset = (this.currenPage - 1) * this.APIFixedAssetFilter.limit;
        this.loadData();
        // Xóa class active ở tất cả các trang
        for (let i = 0; i < this.totalPage; i++) {
          pages[i].classList.remove("number-of-page-active");
        }
        // Thêm class active cho trang hiện tại (tô đậm)
        e.target.parentElement.querySelectorAll(".pageNode")[page].classList.add("number-of-page-active");
        // Hiện lại tất cả paging
        for (let i = 0; i < this.totalPage; i++) {
          pages[i].style.display = "inline-block";
        }
        // Xóa toàn bộ element ...
        let listnode = document.querySelectorAll(".dotNode");
        if (listnode) {
          for (let node of listnode) {
            node.remove();
          }
        }
        // custom paging (xóa những trang ko liền kề đầu, cuối, currentPage)
        if (this.currenPage - 1 > 2) {
          for (let i = 1; i < this.currenPage - 2; i++) {
            pages[i].style.display = "none";
          }
          let html = '<div class="number-of-page dotNode">...</div>';
          pages[0].insertAdjacentHTML("afterend", html);
        }
        if (this.totalPage - this.currenPage > 2) {
          for (let i = this.totalPage - 2; i > this.currenPage; i--) {
            pages[i].style.display = "none";
          }
          let html = '<div class="number-of-page dotNode">...</div>';
          pages[this.totalPage - 1].insertAdjacentHTML("beforebegin", html);
        }
      }
    },
    // Bắt sự kiện khi prew page
    prewPage(e) {
      //Lấy vị trí của trang hiện tại
      var page = this.currenPage;
      if (page > 1) {
        let pages = this.$refs.paging;
        // Đạt lại trang hiện tại
        this.currenPage = page - 1;
        // Load lại page phù hợp
        this.APIFixedAssetFilter.offset = (this.currenPage - 1) * this.APIFixedAssetFilter.limit;
        this.loadData();
        // Xóa class active ở tất cả các trang
        for (let i = 0; i < this.totalPage; i++) {
          pages[i].classList.remove("number-of-page-active");
        }
        // Thêm class active cho trang hiện tại (tô đậm)
        e.target.parentElement.querySelectorAll(".pageNode")[page-2].classList.add("number-of-page-active");
        // Hiện lại tất cả paging
        for (let i = 0; i < this.totalPage; i++) {
          pages[i].style.display = "inline-block";
        }
        // Xóa toàn bộ element ...
        let listnode = document.querySelectorAll(".dotNode");
        if (listnode) {
          for (let node of listnode) {
            node.remove();
          }
        }
        // custom paging (xóa những trang ko liền kề đầu, cuối, currentPage)
        if (this.currenPage - 1 > 2) {
          for (let i = 1; i < this.currenPage - 2; i++) {
            pages[i].style.display = "none";
          }
          let html = '<div class="number-of-page dotNode">...</div>';
          pages[0].insertAdjacentHTML("afterend", html);
        }
        if (this.totalPage - this.currenPage > 2) {
          for (let i = this.totalPage - 2; i > this.currenPage; i--) {
            pages[i].style.display = "none";
          }
          let html = '<div class="number-of-page dotNode">...</div>';
          pages[this.totalPage - 1].insertAdjacentHTML("beforebegin", html);
        }
      }
    },
    // Bắt sự kiện khi click vào 1 hàng
    activeRecord(e){
      try {
        if(e.target.type != "checkbox"){
          // Lấy danh sách toàn bộ các ô input checkbox
          let listIpCheckbox = this.$refs.ipCheckbox;
          // Lấy input checkbox hiện tại đang thực hiện click vào
          let ipCheckbox = e.target.parentElement.querySelector(".ip-checkbox");
          // Lưu lại trang thái của hàng đang thwucj hiện click
          let currenInputCheckbox = false;
          if(ipCheckbox.checked === true){
            currenInputCheckbox = true;
          }else{
            currenInputCheckbox = false;
          }
          // Tắt toàn bộ active các ô input khác
          for (const ipCheckbox of listIpCheckbox) {
            ipCheckbox.checked = false;
            ipCheckbox.parentElement.parentElement.classList.remove("active-checked");
          }
          // Nếu ban đâu ô input đang chưa active thì active nó lên
          if(currenInputCheckbox === false){
            ipCheckbox.checked = true;
            ipCheckbox.parentElement.parentElement.classList.add("active-checked");
          }
        }
        
      } catch (error) {
        console.log();
      }
    },
    // Bắt sự kiện khi có sự thay đổi tại ô check box
    changeInputCheckBox() {
      let listIpCheckbox = this.$refs.ipCheckbox;
      // Kiểm tra từng thằng input checkBox, thẻ nào true thì thêm class active-checked và ngược lại
      for (const ipCheckbox of listIpCheckbox) {
        if (ipCheckbox.checked) {
          ipCheckbox.parentElement.parentElement.classList.add(
            "active-checked"
          );
        } else {
          ipCheckbox.parentElement.parentElement.classList.remove(
            "active-checked"
          );
        }
      }
    },
    // Bắt sự kiên ở ô check full
    changeInputCheckFull(){
      let IpCheckboxFull = this.$refs.checkFull;
      let listIpCheckbox = this.$refs.ipCheckbox;
      if(IpCheckboxFull.checked){
        for (const ipCheckbox of listIpCheckbox){
          ipCheckbox.checked = true;
          ipCheckbox.parentElement.parentElement.classList.add(
            "active-checked"
          );
        }
      }else{
        for (const ipCheckbox of listIpCheckbox){
          ipCheckbox.checked = false;
          ipCheckbox.parentElement.parentElement.classList.remove(
            "active-checked"
          );
        }
      }
    }
  },
  computed: {
    /**
     * Tổng số lượng
     * Tạo bởi: DuongPV(20/12/2022)
     */
    sumQuantity() {
      if (this.assets) {
        return this.assets.reduce((total, asset) => total + asset.quantity, 0);
      } else {
        return 0;
      }
    },
    /**
     * Tổng nguyên giá
     * Tạo bởi: DuongPV(20/12/2022)
     */
    sumCost() {
      if (this.assets) {
        return this.assets.reduce((total, asset) => total + asset.cost, 0);
      } else {
        return 0;
      }
    },
    /**
     * Tổng lũy kế
     * Tạo bởi: DuongPV(20/12/2022)getAccumulated(cost, fixedAssetCategoryId)
     */
    sumAccumulated() {
      if (this.assets) {
        return Math.round(
          this.assets.reduce(
            (total, asset) =>
              total + this.getAccumulated(asset.cost, asset.depreciationRate),
            0
          )
        );
      } else {
        return 0;
      }
    },
    /**
     * Tổng giá trị còn lại
     * Tạo bởi: DuongPV(20/12/2022)
     */
    sumResidualValue() {
      if (this.assets) {
        return this.assets.reduce(
          (total, asset) =>
            total + this.getResidualValue(asset.cost, asset.depreciationRate),
          0
        );
      } else {
        return 0;
      }
    },
  },
};
</script>
<style scoped>
:root {
  --bg-color: rgb(176, 219, 229);
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.content__option {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  margin-bottom: 16px;
}
.content__option__left {
  display: flex;
}
.option-search {
  background-color: #fff;
  width: 180px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #afafaf;
  display: flex;
}
.icon-search {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -243px -23px;
  width: 18px;
  height: 18px;
  margin: 9px;
}
.option-search input {
  border: none;
  outline: none;
  width: 140px;
  font-style: normal;
}
.option-search input::placeholder {
  font-style: italic;
}
.option-filter {
  background-color: #fff;
  width: 220px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #afafaf;
  margin-left: 12px;
  display: flex;
  position: relative;
}
.option-filter .icon-filter {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -243px -69px;
  width: 18px;
  height: 18px;
  margin: 9px;
}
select {
  border: none;
  outline: none;
  width: 174px;
  font-weight: 500;
}
.option-filter__content {
  flex: 1;
  line-height: 34px;
  font-size: 14px;
  max-width: 148px;
  cursor: context-menu;
  border: none;
  outline: none;
  cursor: auto;
}
.option-filter .icon-down {
  background: url("../../assets/icon/qlts-icon.png") no-repeat -62px -330px;
  width: 20px;
  height: 20px;
  margin: 7px;
}
.option-filter-items {
  position: absolute;
  margin-top: 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1;
  width: 100%;
  top: 34px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.option-filter-item {
  display: none;
  background-color: #ffffff;
  width: 100%;
  height: 34px;
  font-size: 14px;
  line-height: 30px;
  padding-left: 36px;
}
.option-filter-item:hover {
  background-color: rgb(176, 219, 229);
  cursor: pointer;
}
.content__option__right {
  display: flex;
}
.content__option__right__btn-add-asset {
  width: 120px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #fff;
  padding-left: 14px;
  background-color: #1aa4c8;
  border-radius: 3px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.16);
}
.content__option__right__btn-add-asset:hover {
  cursor: pointer;
  background-color: #1688a6;
}
.content__option__right_btn {
  background-color: #ffffff;
  border-radius: 3px;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.16);
  width: 36px;
  height: 36px;
  overflow: hidden;
  margin-left: 10px;
}
.content__option__right_btn:hover {
  cursor: pointer;
}
.icon-updt {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -287px -111px;
  width: 18px;
  height: 18px;
  margin: 9px;
}
.icon-deleteRed {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -463px -111px;
  width: 18px;
  height: 18px;
  margin: 9px;
  cursor: pointer;
}
.icon-deleteRed:hover {
  opacity: 0.9;
}
.icon-update {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -152px -65px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.mandate {
  padding: 7px 18px 0 18px;
}
.icon-delete {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -463px -111px;
  width: 18px;
  height: 18px;
  cursor: pointer;
}
.w100 .icon-delete {
}
.w100 .icon-delete:hover {
}
.bg-icon{
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: #fff;
}
.bg-icon:hover{ 
    box-shadow: rgb(0 0 0 / 50%) 0px 5px 15px;
}
.icon-duplicate {
  background: url(http://localhost:8080/img/qlts-icon.c1b7328e.svg) no-repeat -461px -108px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.w100 .icon-duplicate {
}
/* Table  */
.content__table {
  /* height: calc(100vh - 158px);
  overflow: auto; */
  background-color: #ffffff;
  margin-right: 20px;
}
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #f4f7ff;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
}
.content__table table {
  width: 100%;
  border-collapse: collapse;
}
.table-body{
  height: calc(100vh - 234px);
  overflow: auto;
}
.table-start {
  width: 100%;
  font-size: 14px;
  height: 38px;
  display: flex;
  justify-content: space-between;
}
thead .table-start,
tfoot .table-start{
  padding: 9px 0 0px;
}
tbody .table-start{
  line-height: 38px;
}
.table-start-not-valid{
  width: 100%;
  font-size: 14px;
  height: 100%;
  line-height: 510px;
  text-align: center;
  align-items: center;
}
.table-start-not-valid:hover{
  background-color: #fff !important;
}
thead {
  /* position: -webkit-sticky;
  position: sticky;
  top: 0; */
}
thead .table-start {
  background-color: #dddddd;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
tbody .table-start {
  border-top: none;
}
tbody {
  height: calc(100vh - 242px);
}
tbody tr:hover {
  background-color: rgb(176, 219, 229) !important;
}
tfoot {
  /* position: -webkit-sticky;
  position: sticky;
  bottom: 0; */
}
tfoot .table-start {
  height: 40px;
  background-color: #ffffff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.table-start {
  border: 1px solid #ccc;
}
.ip-checkbox {
  margin-left: 10px;
}
.pd-left10 {
  padding-left: 10px;
}
.pd-right10 {
  padding-right: 10px;
}
.ta-left {
  text-align: left;
}
.ta-center {
  text-align: center;
}
.ta-right {
  text-align: right;
}
.w5 {
  width: 5px;
}
.w32 {
  width: 32px;
}
.w130 {
  width: 130px;
}
.w200 {
  width: 200px;
}
.w230 {
  width: 230px;
}
.w130 {
  width: 130px;
}
.w180 {
  width: 180px;
}
.w170 {
  width: 170px;
}
.w70 {
  width: 70px;
}
.w60 {
  width: 60px;
}
.w56 {
  width: 56px;
}
.w100 {
  width: 100px;
}
.w100 {
  width: 100px;
}
.w150 {
  width: 150px;
}
.col2 {
  display: flex;
  justify-content: space-around;
}
.active-checked {
  background-color: #d1edf4 !important;
}
.total-records {
}
.total-records b {
  color: #4f4f4f;
}
.line-clamp {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-start .number-records {
  width: 60px;
  height: 24px;
  display: flex;
  justify-content: space-around;
  border: 1px solid #ccc;
  border-radius: 2px;
  position: relative;
  top: -2px;
}
.number-records > .icon-down {
  background: url(http://localhost:8080/img/qlts-icon.c1b7328e.svg) no-repeat -72px -337px;
  width: 8px;
  height: 8px;
  margin-top: 7px;
}
.number-record-text{
  cursor: context-menu;
}
.number-record-selects{
  display: flex;
  flex-direction: column;
  position: absolute;
  max-height: 144px;
  background-color: #fff;
  bottom: 24px;
  box-shadow: rgb(0 0 0 / 20%) 0px 5px 15px;
}
.number-record-select{
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  padding-left: 10px;
  border: 1px solid #ccc;
  border-bottom: none;
}
.number-record-select:hover{
  background-color: rgb(176, 219, 229);
  cursor: pointer;
}
.number-of-pages {
  display: flex;
}
.number-of-page {
  width: 20px;
  height: 20px;
  margin: 0 5px;
  text-align: center;
  cursor: pointer;
}
.number-of-page-active {
  font-weight: 500;
}
.number-of-page.icon-prew {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -29px -242px;
  width: 7px;
  height: 20px;
}
.number-of-page.icon-next {
  background: url("../../assets/icon/qlts-icon.svg") no-repeat -73px -242px;
  width: 7px;
  height: 20px;
}
.w-auto {
  flex-grow: 1;
}
</style>