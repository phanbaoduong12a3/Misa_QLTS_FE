export class Department{
    departmentId = "";
    departmentCode = "";
    departmentName = "";
    createdBy = "";
    createdDate = "";
    modifiedBy = "";
    modifiedDate = "";

    // Hàm khởi tạo
    constructor(){
    }

    get departmentId(){
        return this.departmentId;
    }

    get departmentCode(){
        return this.departmentCode;
    }

    get departmentName(){
        return this.departmentName;
    }

    get createdBy(){
        return this.createdBy;
    }

    get createdDate(){
        return this.createdDate;
    }

    get modifiedBy(){
        return this.modifiedBy;
    }

    get modifiedDate(){
        return this.modifiedDate;
    }
}