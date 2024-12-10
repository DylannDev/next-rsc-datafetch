'use server'
import {
  deleteProduct as deleteProductDao,
  getProducts as getProductsDao,
  persistProduct as persistProductDao,
} from '@/db/sgbd'

import {revalidatePath} from 'next/cache'
import {Product} from '@/lib/type'
import {formSchema, FormSchemaType} from './schema'

type ValidationError = {
  field: keyof FormSchemaType
  message: string
}

export type FormState = {
  success: boolean
  errors?: ValidationError[]
  message?: string
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData
): Promise<FormState> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)

  if (!parsed.success) {
    logZodError(data)

    const validationErrors: ValidationError[] = parsed.error.errors.map(
      (error) => ({
        field: error.path[0] as keyof FormSchemaType,
        message: `zod server error ${error.message}`,
      })
    )

    return {
      success: false,
      errors: validationErrors,
      message: 'Server Error',
    }
  }

  try {
    await persistProductDao(parsed.data as Product)
    revalidatePath('/exercises/shop-admin')
    return {success: true, message: 'Product saved successfully'}
  } catch (error) {
    return {success: false, message: `Server Error ${error}`}
  }
}

function logZodError(data: FormData) {
  const formData = Object.fromEntries(data)
  const parsed = formSchema.safeParse(formData)
  const errorMessages = parsed?.error?.errors
    .map((err) => `${err.path} ${err.message}`)
    .join(', ')
  console.error('Zod errorMessages', errorMessages)
}

export const getProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  const products = await getProductsDao()
  return products
}

export const persistProduct = async (product: Product) => {
  await persistProductDao(product)
  revalidatePath('/exercises/shop-admin')
}

export const deleteProduct = async (product: Product) => {
  await deleteProductDao(product.id)
  revalidatePath('/exercises/shop-admin')
}
