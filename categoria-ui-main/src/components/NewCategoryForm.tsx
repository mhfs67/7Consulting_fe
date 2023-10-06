"use client";

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useToast } from "./ui/use-toast";

const formSchema = z.object({
	nome: z.string()
})

export function CategoryForm() {
	const { toast } = useToast()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: "",
		}
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {
		await fetch('https://api-categoria.azurewebsites.net/api/categoria', {
			method: 'POST',
			mode: 'cors',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify(values)
		}).then(() => {
			toast({ title: `Categoria ${values.nome} criada com sucesso!` })
			form.reset()
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="nome"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome</FormLabel>
							<FormControl>
								<Input placeholder="Nome da categoria" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex gap-2 justify-end">
					<Button type="submit" className="w-[25%]">Criar</Button>
					<Button variant="destructive" asChild className="w-[25%]">
						<Link href="/">
							Cancelar
						</Link>
					</Button>
				</div>
			</form>
		</Form>
	)
}

export function NewCategoryForm() {
	return (
		<Card>
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl">Criar Categoria</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-4">
				<CategoryForm />
			</CardContent>
		</Card>
	)
}
