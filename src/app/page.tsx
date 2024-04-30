"use client";
import { useFetch } from "@/Utilities/useFetch";
interface productsType {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
interface dataType {
  limit: number;
  products: productsType[];
  skip: number;
  total: number;
}
export default function Home() {
  const { data, isLoading, error } = useFetch<dataType>(
    "https://dummyjson.com/products",
  );
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Products List:</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data &&
        data.products.map((product) => <p key={product.id}>{product.title}</p>)}
    </main>
  );
}
