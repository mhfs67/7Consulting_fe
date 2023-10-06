"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Category } from "@/types/category"
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export function DeleteCategoryDialog({
  children,
  category
}: {
    children: React.ReactNode,
    category: Category
  }) {

  const router = useRouter()

  const handleOnClick = async (id: string) => {
		await fetch(`https://api-categoria.azurewebsites.net/api/categoria/${id}`, {
			method: 'DELETE',
			mode: 'cors',
      cache: 'no-cache',
			headers: {
				"Content-Type": 'application/json'
			},
		}).then(() => {
      router.push('/category')
			toast({ title: 'Categoria deletada com sucesso!' })
		})
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        { children }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza que deseja deletar a categoria {category.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a
            categoria de nossos servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => handleOnClick(category.id)}>Deletar</AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

