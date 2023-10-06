import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Category } from "@/types/category";
import Link from "next/link";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";

interface CategoryTableProps {
  categories: Category[]
}

export function CategoryTable({ categories }: CategoryTableProps) {
  const renderCategory = (category: Category) => (
    <TableRow key={category.id}>
      <TableCell className="font-medium">{category.id}</TableCell>
      <TableCell className="text-right">{category.name}</TableCell>
      <TableCell className="text-right">
        <Button>
          <Link href={`/category/${category.id}`}>
            Editar
          </Link>
        </Button>
      </TableCell>
      <TableCell className="text-right">
        <DeleteCategoryDialog category={category}>
          <Button variant="destructive">Deletar</Button>
        </DeleteCategoryDialog>
      </TableCell>
    </TableRow>
  )

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <Table>
        <TableCaption>Lista de Categorias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">ID</TableHead>
            <TableHead className="text-right">Categoria</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            renderCategory(category)
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
