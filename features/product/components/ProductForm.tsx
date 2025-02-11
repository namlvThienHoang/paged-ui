"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { productFormSchema, ProductFormData } from '../schemas/productSchema';
import { toast } from '@/hooks/use-toast';
import ProductService from '../services/productService';

interface ProductFormProps {
  initialValues?: ProductFormData; // initialValues có thể không có (tạo mới)
}

export const ProductForm = ({ initialValues }: ProductFormProps) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: initialValues || { title: '', price: 0 }, // Sử dụng defaultValues
  });

  async function onSubmit(data: ProductFormData) {
    try {
      if (initialValues?.id) {
        await ProductService.update(initialValues.id, data);
        toast({ title: "Cập nhật sản phẩm thành công!" });
      } else {
        await ProductService.create(data);
        toast({ title: "Thêm sản phẩm thành công!" });
      }
    } catch (error) {
      toast({ title: "Lỗi khi lưu sản phẩm", description: "Failed to create user.", variant: "destructive" });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tiêu đề" {...field} />
              </FormControl>
              <FormDescription>Nhập tiêu đề sản phẩm.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Nhập giá" {...field} />
              </FormControl>
              <FormDescription>Nhập giá sản phẩm.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{initialValues ? "Cập nhật" : "Thêm mới"}</Button>
      </form>
    </Form>
  );
};
