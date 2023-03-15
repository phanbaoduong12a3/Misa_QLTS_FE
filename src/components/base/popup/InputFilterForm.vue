<template>
  <div class="input-filter">
    <input
      class="input-filter__content"
      value=""
      ref="ipFilter"
      :placeholder="placeholderInput"
      @change="updateValue()"
      @click.stop="showOption($event)"
      @keyup.enter="changeEnter($event)"
      @keyup.down="selectOptionDown()"
      @keyup.up="selectOptionUp()"
      @keyup="searchFilter()"
    />
    <div class="icon-down" @click.stop="showOption($event)"></div>
    <div class="input-filter-items" v-if="isShowOption">
      <div
        class="input-filter-item"
        ref="inputFilteritem"
        v-for="(typeRecord, index) in searchTypeRecords"
        :key="index"
        :id="typeRecord.id"
        @click.stop="changeOption(typeRecord.name, typeRecord.id)"
      >
        <b>{{ typeRecord.code }} -</b>   {{ typeRecord.name }}
      </div>
    </div>
  </div>
</template>

<script>
import Resource from "@/js/resource.js";

export default {
  name: "inputFilterForm",
  components: {},
  props: {
    modeFilter: Number,
    valueFirst: String,
    value: String,
  },
  data() {
    return {
      ContentText: Resource.ContentText, //Table content gọi từ file resource.js
      Tooltip: Resource.Tooltip, //Tooltip gọi từ file resource.js
      Placeholder: Resource.Placeholder, //Placeholder gọi từ file resource.js
      Title: Resource.Title, //Tiêu đề gọi từ file resource.js
      isShowOption: false,
      isAcive: false,
      searchTypeRecords: [],
      FilterAll: [],
      placeholderInput: "",
      fillterName: "",
      parts: [{
      "departmentId": "142cb08f-7c31-21fa-8e90-67245e8b283e",
      "departmentCode": "PB99560",
      "departmentName": "Phòng kinh doanh",
    },
    {
      "departmentId": "17120d02-6ab5-3e43-18cb-66948daf6128",
      "departmentCode": "PB34076",
      "departmentName": "Phòng tài chính",
    },
    {
      "departmentId": "2bbbd485-6df2-536a-7e32-6a1673ffca7c",
      "departmentCode": "PB96084",
      "departmentName": "Phòng hành chính",
    },
    {
      "departmentId": "11452b0c-768e-5ff7-0d63-eeb1d8ed8cef",
      "departmentCode": "PB36876",
      "departmentName": "Phòng quản lý",
    },
    {
      "departmentId": "4577565a-7e3e-493a-74dd-867949feb8b5",
      "departmentCode": "PB05375",
      "departmentName": "Phòng thiết kế",
    },
    {
      "departmentId": "469b3ece-744a-45d5-957d-e8c757976496",
      "departmentCode": "PB24299",
      "departmentName": "Phòng điều hành",
    },
    {
      "departmentId": "4e272fc4-7875-78d6-7d32-6a1673ffca7c",
      "departmentCode": "PB21998",
      "departmentName": "Phòng sản xuất",
    },
    {
      "departmentId": "59d19422-6657-452e-a7db-e5d54223c257",
      "departmentCode": "PB14587",
      "departmentName": "Phòng nghiên cứu",
    },
    {
      "departmentId": "7686595d-16d5-33b3-0080-e8e2a817c80e",
      "departmentCode": "PB64347",
      "departmentName": "Phòng công nghệ",
    },
    {
      "departmentId": "768f8e64-7d10-20c9-967d-e8c757976496",
      "departmentCode": "PB30803",
      "departmentName": "Phòng kế toán",
    }
    ], // Department gọi từ API
      typeAssets:[
        {
      "fixedAssetCategoryId": "148ed882-32b8-218e-9c20-39c2f00615e8",
      "fixedAssetCategoryCode": "LTS62733",
      "fixedAssetCategoryName": "Điện lạnh",
    },
    {
      "fixedAssetCategoryId": "1b691e79-236d-5b5a-9d20-39c2f00615e8",
      "fixedAssetCategoryCode": "LTS42727",
      "fixedAssetCategoryName": "Máy tính",
    },
    {
      "fixedAssetCategoryId": "25c6c36e-1668-7d10-6e09-bf1378b8dc91",
      "fixedAssetCategoryCode": "LTS95657",
      "fixedAssetCategoryName": "Công nghệ",
    },
    {
      "fixedAssetCategoryId": "354f1b13-17bf-1b52-87d5-ba100c6f7bce",
      "fixedAssetCategoryCode": "LTS12687",
      "fixedAssetCategoryName": "Gia dụng",
    },
    {
      "fixedAssetCategoryId": "3700cc49-55b5-69ea-4929-a2925c0f334d",
      "fixedAssetCategoryCode": "LTS14584",
      "fixedAssetCategoryName": "Công cụ",
    },
    {
      "fixedAssetCategoryId": "3b86d2ed-446c-5fce-56be-406293204378",
      "fixedAssetCategoryCode": "LTS38989",
      "fixedAssetCategoryName": "Laptop",
    }
    
      ], // Loại tài sản gọi từ API
      FirstName: ""
    };
  },
  created() {
    this.fillterName = this.valueFirst;

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

        // Thay đổi value ban đầu(nếu có)
        if(this.valueFirst){
          for (const typeAsset of this.typeAssets) {
            if(typeAsset.fixedAssetCategoryId == this.valueFirst){
              this.FirstName = typeAsset.fixedAssetCategoryName;
            }
          }
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
        
        // Thay đổi value ban đầu(nếu có)
        if(this.valueFirst){
          for (const part of this.parts) {
            if(part.departmentId == this.valueFirst){
              this.FirstName = part.departmentName;
            }
          }
        }

        break;
      default:

        break;
    }
  },
  mounted(){
    var _this = this;

    switch (this.modeFilter) {
      case 1:
        // Thay đổi value ban đầu(nếu có)
        if(this.valueFirst){
          for (const typeAsset of this.typeAssets) {
            if(typeAsset.fixedAssetCategoryId == this.valueFirst){
              _this.$refs.ipFilter.value = typeAsset.fixedAssetCategoryName;
            }
          }
        }
        break;
    
      case 2:
        // Thay đổi value ban đầu(nếu có)
        if(this.valueFirst){
          for (const part of this.parts) {
            if(part.departmentId == this.valueFirst){
              _this.$refs.ipFilter.value = part.departmentName;
            }
          }
        }
        break;
      default:
        break;
    }
  },
  methods: {

    // Hiện các option khi click vào filter
    showOption(e) {
      e.stopImmediatePropagation();
      this.isShowOption = true;
    },

    changeEnter(e){
      let _this = this;

      if(this.isShowOption == false){
        e.stopImmediatePropagation();
        this.isShowOption = true;
      }else{
        let ipFilters = this.$refs.inputFilteritem;

        for (const ipFilter of ipFilters) {
          // kiểm tra xem thẻ option đó không phải thẻ dưới cùng và là thẻ đang đc active mới thực hiện
          if(ipFilter.classList.contains('active')){
            for(let searchTypeRecord of _this.FilterAll) {
              if(ipFilter.id == searchTypeRecord.id){
                _this.changeOption(searchTypeRecord.name, searchTypeRecord.id)
              }
            }
            break;
          }
        }
        _this.isAcive = false;
      }
    },

    // Chọn option bằng mũi tên xuống
    selectOptionDown(){
      let ipFilters = this.$refs.inputFilteritem;

      if(this.isAcive){
        for (const ipFilter of ipFilters) {
          // kiểm tra xem thẻ option đó không phải thẻ dưới cùng và là thẻ đang đc active mới thực hiện
          if(ipFilter.nextElementSibling != null && ipFilter.classList.contains('active')){
            ipFilter.classList.remove("active");
            ipFilter.nextElementSibling.classList.add("active");
            break;
          }
        }
      }else{
        ipFilters[0].classList.add("active")
        this.isAcive = true;
      }
    },

    // Chọn option bằng mũi tên lên
    selectOptionUp(){
      let ipFilters = this.$refs.inputFilteritem;

      if(this.isAcive){
        for (const ipFilter of ipFilters) {
          // kiểm tra xem thẻ option đó không phải thẻ trên cùng và là thẻ đang đc active mới thực hiện
          if(ipFilter.previousElementSibling != null && ipFilter.classList.contains('active')){
            ipFilter.classList.remove("active");
            ipFilter.previousElementSibling.classList.add("active");
            break;
          }
        }
      }else{
        ipFilters[ipFilters.length - 1].classList.add("active")
        this.isAcive = true;
      }
    },

    //Ẩn option khi chọn xong option
    hideOption() {
        this.isShowOption = false;
    },

    // Thay đổi option và ẩn nó đi khi chọn xong
    changeOption(Name, Id) {
      let _input = this.$refs.ipFilter;

      _input.value = Name;

      // Thực hiện lọc
      this.$emit("filter", Id);

      // Đóng option
      this.isShowOption = false;
    },

    updateValue(){
    },

    // 
    searchFilter(){
      let _input = this.$refs.ipFilter;

      this.searchTypeRecords = this.FilterAll.filter(function(Record){
        return Record.name.includes(_input.value);
      });
    },

    // // 
    // getData : async() => {
    //   var _this = this;
    //   // load danh sách phòng ban
    //   try {
    //     // axios({
    //       //   method: 'get',
    //       //   url: 'http://localhost:63515/api/v1/Departments/filter?keyword=',
    //       //   responseType: 'stream'
    //       // })
    //       //   .then(function (response) {
    //       //     console.log(response.data);
    //       //   });
    //     axios.get("http://localhost:63515/api/v1/Departments/filter?keyword=")
    //       .then((response) => {
    //         _this.parts = response.data.data;
    //         console.log(_this.parts);
    //       });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  },
};
</script>

<style scoped>
.input-filter {
  background-color: #fff;
  width: 100%;
  height: 34px;
  border-radius: 4px;
  display: flex;
  position: relative;
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
  flex: 1;
  padding-left: 10px;
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
  padding-left: 10px;
}

b{
    margin-right: 3px;
}

.input-filter-item:hover {
  background-color: rgb(176, 219, 229);
  cursor: pointer;
}

.active{
  background-color: rgb(176, 219, 229);
}

.input-filter-item:focus {
  background-color: #000;
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