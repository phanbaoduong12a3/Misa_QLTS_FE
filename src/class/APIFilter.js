export class APIFilter{
    keyword = "";
    limit = 50;
    offset = 0;
    departmentId = "";
    fixedAssetCategoryId = "";

    constructor(){
    }

    get Keyword(){
        return this.keyword;
    }

    get Limit(){
        return this.limit;
    }

    get Offset(){
        return this.offset;
    }

    get DepartmentId(){
        return this.departmentId;
    }

    get FixedAssetCategoryId(){
        return this.fixedAssetCategoryId;
    }


}