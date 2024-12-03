import {Checkbox} from '@/components/ui/checkbox'
import {cn} from '@/lib/utils'
import {Todo} from '@/lib/type'
import {updateTodo as updateTodoAction} from './actions'
import {toast} from 'sonner'
import {useOptimistic, startTransition} from 'react'

type TodoOptimistic = Todo & {
  sending?: boolean
}

type OptimisticFields = {isCompleted: boolean; sending: boolean}

export default function TodoItem({todo}: {todo: Todo}) {
  const [optimisticTodo, updateOptimisticTodo] = useOptimistic<
    TodoOptimistic,
    OptimisticFields
  >(todo, (state, {isCompleted, sending}) => {
    return {...state, isCompleted, sending}
  })

  const handleChange = async (isCompleted: boolean) => {
    updateOptimisticTodo({isCompleted, sending: true})
    try {
      await updateTodoAction({
        ...todo,
        isCompleted,
      })
    } catch (error) {
      toast.error(`Failed to update todo.${error}`)
    }
    updateOptimisticTodo({isCompleted, sending: false})
  }
  return (
    <>
      <div className="flex items-center gap-4" key={optimisticTodo.id}>
        <Checkbox
          checked={optimisticTodo.isCompleted}
          id={`${optimisticTodo.id}`}
          onCheckedChange={(checked) =>
            startTransition(() => handleChange(checked as boolean))
          }
        />
        <label
          className={cn('flex-1 text-sm font-medium', {
            'line-through': optimisticTodo.isCompleted,
            'animate-color-cycle': optimisticTodo.sending,
          })}
          htmlFor={`${optimisticTodo.id}`}
        >
          {optimisticTodo.title}
        </label>

        <span
          className={cn('text-sm text-gray-500 dark:text-gray-400 ', {
            'line-through': optimisticTodo.isCompleted,
          })}
        >
          {optimisticTodo.updadtedAt}
        </span>
      </div>
    </>
  )
}
