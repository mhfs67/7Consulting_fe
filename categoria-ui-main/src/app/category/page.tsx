
import { CategoryTable } from "@/components/CategoryTable";
import { Category, CategoryRequest } from "@/types/category";

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch('https://api-categoria.azurewebsites.net/api/categoria', {
      next: {
        revalidate: 0
      }
  })
  const data = await res.json() as CategoryRequest[]

  const categories = data.map(d => { return {
    id: d.id.toString(),
    name: d.nome
  }}) as Category[]

  return categories
}

export default async function CategoryPage() {
  const categories = await getCategories();

  return <CategoryTable categories={categories} />
}
