<template>
  <div class="input-filter">
    <div class="icon-filter"></div>
    <input
      class="input-filter__content"
      value=""
      ref="ipFilter"
      :placeholder="placeholderInput"
      @click.stop="showOption()"
      @keyup="searchFilter()"
      @keyup.enter="searchFilterAsset"
    />
    <div class="icon-down" @click.stop="showOption()"></div>
    <div class="input-filter-items" v-if="isShowOption">
      <div
        class="input-filter-item"
        ref="inputFilteritem"
        v-for="(typeRecord, index) in searchTypeRecords"
        :key="index"
        @click.stop="changeOption(typeRecord.name, typeRecord.id)"
      >
        {{ typeRecord.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";

export default {
  name: "inputFilter",
  components: {},
  props: {
    modeFilter: Number,
  },
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      Tooltip: Resource.Tooltip, //Tooltip gọi từ file resource.js
      Placeholder: Resource.Placeholder, //Placeholder gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      isShowOption: false,
      searchTypeRecords: [],
      FilterAll: [],
      placeholderInput: ""
    };
  },
  created() {
    let _this = this;

    // Sự kiện khi click ra ngoài thì đóng thẻ select
    window.addEventListener("click", function () {
      try {
        _this.isShowOption = false;
      } catch (error) {
        console.log(error);
      }
    });

    switch (this.modeFilter) {
      case 1:
        // Thay đổi placehoder
        this.placeholderInput = this.Placeholder.CategoryAsset;

        // load danh sách loại tài sản
        try {
          fetch("http://localhost:63515/api/AssetCategorys/filter?keyword=")
            .then((response) => {
              return response.json();
            })
            .then((AssetCategory) => {
                this.searchTypeRecords = AssetCategory.data.map(function(assetCategory){
                  return {
                    id: assetCategory.fixedAssetCategoryId,
                    code: assetCategory.fixedAssetCategoryCode,
                    name: assetCategory.fixedAssetCategoryName
                  }
                });
                this.FilterAll = this.searchTypeRecords;
            });
        } catch (error) {
          console.log(error);
        }
        break;

      case 2:
        // Thay đổi placehoder
        this.placeholderInput = this.Placeholder.Department;

        // load danh sách loại bộ phạn sử dụng
        try {
          fetch("http://localhost:63515/api/v1/Departments/filter?keyword=")
            .then((response) => {
              return response.json();
            })
            .then((Departments) => {
                this.searchTypeRecords = Departments.data.map(function(department){
                  return {
                    id: department.departmentId,
                    code: department.departmentCode,
                    name: department.departmentName
                  }
                });
                this.FilterAll = this.searchTypeRecords;
            });
        } catch (error) {
          console.log(error);
        }
        break;
      default:

        break;
    }
    
  },
  methods: {
    // Hiện các option khi click vào filter
    showOption() {
      this.isShowOption = true;
    },

    //Ẩn option khi chọn xong option
    hideOption() {
        this.isShowOption = false;
    },

    // Thay đổi option và ẩn nó đi khi chọn xong
    changeOption(fixedAssetCategoryName, fixedAssetCategoryId) {
      let _input = this.$refs.ipFilter;

      _input.value = fixedAssetCategoryName;

      // Thực hiện lọc
      this.$emit("filter", fixedAssetCategoryId);

      // Đóng option
      this.isShowOption = false;
    },

    //  Bắt sự kiện search trên ô filter
    searchFilter(){
      let _input = this.$refs.ipFilter;

      this.searchTypeRecords = this.FilterAll.filter(function(Record){
        return Record.name.includes(_input.value);
      });
    },

    // Bắt sự kiện ấn enter khi search
    searchFilterAsset(){
      let _input = this.$refs.ipFilter;

      // Thực hiện lọc 
      this.$emit("filter", _input.value)

      // Đóng option
      this.isShowOption = false;
    }
  },
};
</script>

<style scoped>
.input-filter {
  background-color: #fff;
  width: 220px;
  height: 34px;
  border-radius: 4px;
  display: flex;
  position: relative;
}

.input-filter .icon-filter {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -243px -69px;
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

.input-filter__content {
  flex: 1;
  line-height: 34px;
  font-size: 14px;
  max-width: 148px;
  cursor: context-menu;
  border: none;
  outline: none;
  cursor: auto;
}

.input-filter .icon-down {
  background: url("../../../assets/icon/qlts-icon.png") no-repeat -62px -330px;
  width: 20px;
  height: 20px;
  margin: 7px;
}

.input-filter-items {
  position: absolute;
  margin-top: 2px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 1;
  width: 100%;
  top: 35px;
  max-height: 180px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.input-filter-item {
  display: flex;
  background-color: #ffffff;
  width: 100%;
  height: 34px;
  font-size: 14px;
  line-height: 30px;
  padding-left: 36px;
}

.input-filter-item:hover {
  background-color: rgb(176, 219, 229);
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #f4f7ff;
}

::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>