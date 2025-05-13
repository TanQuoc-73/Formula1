"use client"
import React, { use } from 'react'
import { useDrivers } from "@/hooks/useDriver";
// import { useDriverForm } from "@/hooks/useDriverForm";
// import { DriversTable } from "@/components/DriversTable";
// import { AddDriverForm } from "@/components/AddDriverForm";
// import { UpdateDriverForm } from "@/components/UpdateDriverForm";

// Shadcn UI components
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
// import { useDriverForm } from '@/hooks/useDriverForm';



export default function AdminDriverPage() {
  const { drivers, loading, error, refreshDrivers } = useDrivers();
  // const {
  //   // editingDriver,
  //   // newDriverData,
  //   // addingDriver,
  //   // newDriver,
  //   // updateError,
  //   // addError,
  //   // prediction,
  //   // setAddingDriver,
  //   // handleEditClick,
  //   // handleDeleteClick,
  //   // handleInputChange,
  //   // handleUpdateSubmit,
  //   // handleAddSubmit,
  // }= useDriverForm(refreshDrivers);

  return (
    <div className='space-y-6'>
    </div>
    // <div className='space-y-6'>
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Quản lý Đội</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //       <Button
    //         onClick={() => setAddingDriver(true)}
    //         className="mb-6 bg-green-600 hover:bg-green-700"
    //       >
    //         Thêm Đội Mới
    //       </Button>
    //       {loading && (
    //         <div className="space-y-4">
    //           <Skeleton className="h-6 w-1/2" />
    //           <Skeleton className="h-6 w-1/2" />
    //           <Skeleton className="h-6 w-1/2" />
    //         </div>
    //       )}
    //       {error && (
    //         <Alert variant="destructive"></Alert>
    //           <AlertTitle>Có lỗi xảy ra</AlertTitle>
    //           <AlertDescription>{error}</AlertDescription>
    //         </Alert>
    //       )}
    //       {!loading && !error && (
    //         <div>
    //           <DriversTable
    //             drivers={drivers}
    //             onEditClick={handleEditClick}
    //             onDeleteClick={handleDeleteClick}
    //             onInputChange={handleInputChange}
    //             onUpdateSubmit={handleUpdateSubmit}
    //             onAddSubmit={handleAddSubmit}
    //           />
    //           {editingDriver && (
    //             <UpdateDriverForm
    //               driver={editingDriver}
    //               onInputChange={handleInputChange}
    //               onSubmit={handleUpdateSubmit}
    //               onCancel={() => setEditingDriver(null)}
    //               error={updateError}
    //             />
    //           )}
    //           {addingDriver && (
    //             <AddDriverForm
    //               newDriver={newDriver}
    //               onInputChange={handleInputChange}
    //               onSubmit={handleAddSubmit}
    //               onCancel={() => setAddingDriver(false)}
    //               error={addError}
    //             />
    //           )}


    //           {loading && (
    //             <div className="space-y-4">}
    //               <Skeleton className="h-12 w-full" />
    //               <Skeleton className="h-64 w-full" />
    //             </div>
    //           )}
    //           {error && (
    //             <Alert variant="destructive">
    //               <AlertTitle>Lỗi</AlertTitle>
    //               <AlertDescription>{error}</AlertDescription>
    //             </Alert>
    //           )}
    //           {drivers && drivers.length > 0 ? (
    //             <DriversTable
    //               drivers={drivers}
    //               prediction={prediction}
    //               predictError={predictError}
    //               onEditClick={handleEditClick}
    //               onDeleteClick={handleDeleteClick}
    //               onPredictClick={predictDriverOutcome}
    //             />
    //           ) : (
    //             <p>Không có dữ liệu đội nào.</p>
    //           )}
       
    //   </div>
  )
}
