export default {
  FixedAsset: {
    fixedAssetId: "", //Id tài sản
    fixedAssetCode: "", //Mã tài sản
    fixedAssetName: "", //Tên tài sản
    departmentId: "", //Id phòng ban
    fixedAssetCategoryId: "", //Id loại tài sản
    purchaseDate: new Date(), //Ngày mua
    useDate: new Date(), //Ngày sử dụng 
    cost: 0, //nguyên giá
    quantity: 0, //Số lượng
    depreciationRate: 0, //Tỷ lệ hao mòn (%)
    trackedYear: new Date().getFullYear(), //Năm bắt đầu theo dõi tài sản trên phần mềm
    lifeTime: 0, //Số năm sử dụng
    productionYear: new Date().getFullYear(), //Năm sử dụng
    valueAtrophyYear: 0, // Giá trị hao mòn năm
  },
};

// AssetCode: "", // Mã tài sản - binding lên form
// AssetName: "", // Tên tài sản - binding lên form
// PartCode: "", // Mã bộ phận sử dụng - binding lên form
// TypeAssetCode: "", // Mã loại tài sản - binding lên form
// Amount: 0, // Số lương - binding lên form
// OriginalPrice: 0, // Nguyên giá - binding lên form
// ValueAtrophyYear: 0, // Giá trị hao mòn năm - binding lên form
// YearTracking: 0, // Năm theo dõi - binding lên form
// BuyDate: new Date(), // Ngày mua - binding lên form
// DateOfUse: new Date(), // Ngày sử dụng - binding lên form
// NumberYearOfUse: 0, // Số năm sử dụng - Lấy tương ứng với loại tài sản
// WearRate: 0, // Tỷ lệ hao mòn năm - Lấy tương ứng với loại tài sản
