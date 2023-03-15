export default {
    Mode: {
      Add: 0, // Thêm mới
      Update: 1, // Chỉnh sửa
      Delete: 2, // Xóa 1 bản ghi
      DeleteMulti: 3, // Xóa nhiều bản ghi 
      Duplicate: 4, // Nhân bản
      ModeDeleteOne: 5, // xóa 1
      ModeDelete: 6, // xóa nhiều theo tích
      ValueEmpty: 7 // Xóa nhiều nhưng chưa có ô nào được chọn
    },
    ModeRequest: {
      ValidateEmpty: 1, // Validate trống
      ExistCode: 2, // Mã tài sản đã tồn tại
      CheckDepreciationRateLifeTime: 3, // tỷ lệ hao mòn phải bằng 1/số năm sử dụng
    },
    ModeInput: {
      cost: 1,
      valueAtrophyYear: 2,
      quantity: 3,
      depreciationRate: 4,
    },
    ModeType: {
      AssetCategory: 1,
      Department: 2
    },
    ErrorCode: {
      BadRequest: 4, // Yêu cầu đầu vào không hợp lệ
      ValidateCodeError: 5, // Mã tài sản đã tồn tại
    },
    DlgType: {
      RequiredInfo: 0, // Thông tin bắt buộc
      Describe: 1, // Miêu tả thông tin có tính nghiệp vụ
    },
    // Phím tắt
    KeyCode: {
      // Phím Enter
      ENTER: 13,
      // Phím ESC
      ESC: 27,
      // Phím Ctrl
      Ctrl: 17,
      // Phím F3
      F3: 114,
      // Phím F8
      F8: 119,
      // Phím F9
      F9: 120,
      // Phím `
      SelectTable: 115,
    },
    DataType: {
      Text: 0, // Kiểu chuỗi
      Number: 1, // Kiểu số
      Money: 2, // Kiểu tiền
      Year: 3, // Kiểu năm (thời gian)
      Rate: 4, // Kiểu tỉ lệ
    },
  };