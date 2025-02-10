import { z } from 'zod';

export const productFormSchema = z.object({
  id: z.number(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  price: z.preprocess((val) => Number(val), z.number().min(0, "Price must be a non-negative number")),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  rating: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Rating must be at least 0").max(5, "Rating cannot exceed 5")
  ),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Stock must be a non-negative number")
  ),
  thumbnail: z.string().url("Thumbnail must be a valid URL"),
});


export type ProductFormData = z.infer<typeof productFormSchema>;


  
