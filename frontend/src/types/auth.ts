export interface FormData {
    firstName: string; // Tách name thành firstName
    lastName: string;  // Tách name thành lastName
    userName: string;  // Đổi từ email thành userName
    password: string;  // Đổi từ password thành passWord
}
export interface AuthBody {
    userName: string;
    password?: string;
    firstName?: string;
    lastName?: string;

}

export interface User {
    role: 'Admin' | 'QuanLy'| 'ThanhVien'| string;

}