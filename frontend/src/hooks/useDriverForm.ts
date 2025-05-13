// import {useState} from "react";
// import {Driver} from "@/types/driver";
// import {createDriverAPI, updateDriverAPI, deleteDriverAPI} from "@/services/driversService";
// // import {INITIAL_DRIVER} from "@/constants/driver";
// // import {predictDriverOutcomeAPI} from "@/services/aiService";

// interface UseDriverFormReturn {
//     editingDriver: Driver | null;
//     newDriverData: Driver | null;
//     addingDriver: boolean;
//     newDriver: Driver;
//     updateError: string;
//     addError: string; // Thêm state lỗi
//     prediction: { [key: number]: string };
//     setAddingDriver: (value: boolean) => void;
//     handleEditClick: (driver: Driver) => void;
//     handleDeleteClick: (driverId: number) => Promise<void>;
//     handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     handleUpdateSubmit: (e: React.FormEvent) => Promise<void>;
//     handleAddSubmit: (e: React.FormEvent) => Promise<void>;
//     predictDriverOutcome: (driver: Driver) => Promise<void>;
// }
// export const useDriverForm = (refreshDrivers: () => void): UseDriverFormReturn => {
//     const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
//     const [newDriverData, setNewDriverData] = useState<Driver | null>(null);
//     const [addingDriver, setAddingDriver] = useState(false);
//     const [newDriver, setNewDriver] = useState("");
    
//     const handleEditClick = (driver: Driver) => {
//         setEditingDriver(driver);
//         setNewDriverData({...driver});
//     };

//     const handleDeleteClick = async (driverId: number) => {
//         if (window.confirm("Bạn có chắc muốn xóa đội này không?")) {
//             try {
//                 await deleteDriverAPI(driverId);
//                 refreshDrivers();
//             } catch (err: any) {
//                 alert("Xóa đội thất bại: " + err.message);
//             }
//         }
//     }; 

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const {name, value, type} = e.target;
//         const updatedValue = type === "number" ? Number(value) : value;

//         if (editingDriver && newDriverData) {
//             setNewDriverData({...newDriverData, [name]: updatedValue});
//         } else {
//             setNewDriver({...newDriver, [name]: updatedValue});
//         }
//     };

//     const handleUpdateSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (editingDriver && newDriverData) {
//             try {
//                 await updateDriverAPI(editingDriver.id, newDriverData);
//                 refreshDrivers();
//                 setEditingDriver(null);
//             } catch (err: any) {
//                 alert("Cập nhật đội thất bại: " + err.message);
//             }
//         }
//     };

//     const handleAddSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         try {
//             await createDriverAPI(newDriver);
//             refreshDrivers();
//             setAddingDriver(false);
//         } catch (err: any) {
//             alert("Thêm đội thất bại: " + err.message);
//         }
//     };

//     return {
//         editingDriver,
//         newDriverData,
//         addingDriver,
//         newDriver,
//         updateError: "",
//         addError: "",
//         prediction: {},
//         setAddingDriver,
//         handleEditClick,
//         handleDeleteClick,
//         handleInputChange,
//         handleUpdateSubmit,
//         handleAddSubmit,
//         // predictDriverOutcome: async (driver: Driver) => {
//         //     // const prediction = await predictDriverOutcomeAPI(driver);
//         //     // setPrediction((prev) => ({...prev, [driver.id]: prediction}));
//         // },
//     };