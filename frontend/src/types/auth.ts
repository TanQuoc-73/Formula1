export interface FormData {
    name : string;
    email : string;
    password : string;
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