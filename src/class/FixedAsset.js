export class FixedAsset {
    fixedAssetId = ""; //Id tài sản
    fixedAssetCode = ""; //Mã tài sản
    fixedAssetName = ""; //Tên tài sản
    departmentId = ""; //Id phòng ban
    fixedAssetCategoryId = ""; //Id loại tài sản
    purchaseDate = new Date(); //Ngày mua
    useDate = new Date(); //Ngày sử dụng 
    cost = 0; //nguyên giá
    quantity = 0; //Số lượng
    depreciationRate = 0; //Tỷ lệ hao mòn (%)
    trackedYear = new Date().getFullYear(); //Năm bắt đầu theo dõi tài sản trên phần mềm
    lifeTime = 0; //Số năm sử dụng
    productionYear = new Date().getFullYear(); //Năm sử dụng
    valueAtrophyYear = 0; // Giá trị hao mòn năm

    // Hàm khởi tạo
    constructor(){
    }

    get fixedAssetId(){
        return this.fixedAssetId;
    }

    get fixedAssetCode(){
        return this.fixedAssetCode;
    }

    get fixedAssetName(){
        return this.fixedAssetName;
    }

    get departmentId(){
        return this.departmentId;
    }

    get fixedAssetCategoryId(){
        return this.fixefixedAssetCategoryIddAssetId;
    }

    get purchaseDate(){
        return this.purchaseDate;
    }

    get useDate(){
        return this.useDate;
    }

    get cost(){
        return this.cost;
    }

    get quantity(){
        return this.quantity;
    }

    get depreciationRate(){
        return this.depreciationRate;
    }

    get trackedYear(){
        return this.trackedYear;
    }

    get lifeTime(){
        return this.lifeTime;
    }
    
    get productionYear(){
        return this.productionYear;
    }

    get valueAtrophyYear(){
        return this.valueAtrophyYear;
    }
}