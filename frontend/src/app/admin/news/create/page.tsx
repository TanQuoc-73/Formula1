// "use client";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useNews } from "@/hooks/useNews";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { toast } from "@/components/ui/use-toast";
// import * as z from "zod";
// import { Loader2 } from "lucide-react";

// const formSchema = z.object({
//   title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
//   content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
//   publishedDate: z.string().optional(),
// });

// export default function CreateNewsPage() {
//   const { createNews } = useNews();
//   const router = useRouter();

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       content: "",
//       publishedDate: new Date().toISOString().split('T')[0],
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       await createNews(values);
//       toast({
//         title: "Thành công",
//         description: "Đã tạo tin tức mới thành công",
//         variant: "default",
//       });
//       router.push("/admin/news");
//     } catch (error) {
//       toast({
//         title: "Lỗi",
//         description: "Tạo tin tức thất bại",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Tạo tin tức mới</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Tiêu đề</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Nhập tiêu đề tin tức" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="content"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Nội dung</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     placeholder="Nhập nội dung tin tức"
//                     rows={10}
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <FormField
//             control={form.control}
//             name="publishedDate"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Ngày đăng</FormLabel>
//                 <FormControl>
//                   <Input type="date" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           <div className="flex space-x-4">
//             <Button type="submit" disabled={form.formState.isSubmitting}>
//               {form.formState.isSubmitting && (
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               )}
//               Tạo tin tức
//             </Button>
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => router.push("/admin/news")}
//             >
//               Hủy bỏ
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }