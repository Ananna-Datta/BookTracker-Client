"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddBookMutation } from "@/redux/api/BookCreateApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";

// 1. Define your schema with preprocessing for copies:
const copiesSchema = z.preprocess(
  (val) => Number(val),
  z.number().min(0, { message: "Copies cannot be negative." })
);

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  author: z.string().min(1, { message: "Author is required." }),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().min(1, { message: "ISBN is required." }),
  description: z.string().optional(),
  copies: copiesSchema,
  available: z.boolean().optional(),
});

// 2. Infer form data type
type FormData = z.infer<typeof formSchema>;

// 3. Cast resolver to proper Resolver<FormData> type
const resolver = zodResolver(formSchema) as unknown as Resolver<FormData>;

export default function BookForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [addBook, { isLoading }] = useAddBookMutation();

  // 4. Setup useForm with consistent types
  const form = useForm<FormData>({
    resolver,
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      available: true,
    },
  });

  // 5. Submit handler
  async function onSubmit(values: FormData) {
    try {
      const res = await addBook(values);
      console.log("Add Book response:", res);
      if ("data" in res && res.data?.success) {
        if (onSuccess) onSuccess();
        form.reset(); // reset form after success
      }
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <select className="w-full border px-3 py-2 rounded" {...field}>
                    <option value="FICTION">Fiction</option>
                    <option value="NON_FICTION">Non-Fiction</option>
                    <option value="SCIENCE">Science</option>
                    <option value="HISTORY">History</option>
                    <option value="BIOGRAPHY">Biography</option>
                    <option value="FANTASY">Fantasy</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ISBN number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of copies"
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Available */}
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                    <span>Available</span>
                  </div>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
