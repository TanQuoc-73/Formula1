export interface FormData {
    email: string; 
    firstName: string; 
    lastName: string; 
    userName: string; 
    password: string;  
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