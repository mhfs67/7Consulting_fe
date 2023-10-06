import { EditCategoryForm } from "@/components/EditCategoryForm";
import { Category, CategoryRequest } from "@/types/category";

async function getSelectedCategory(id: string) {
		const res = await fetch(`https://api-categoria.azurewebsites.net/api/categoria/${id}`);
		const data = await res.json() as CategoryRequest

  const category: Category = {
		id: data.id.toString(),
		name: data.nome
	}

	return category;
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
	const category = await getSelectedCategory(params.id);

	return <EditCategoryForm category={category} />
}

