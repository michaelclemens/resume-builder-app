import { zodResolver } from '@hookform/resolvers/zod'
import { render, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

export const renderUseFormHook = ({ defaultValues, schema }: { defaultValues?: any; schema?: any }) =>
  renderHook(() =>
    useForm({
      resolver: zodResolver(schema),
      defaultValues,
    })
  )

export const renderFormBody = ({
  component: FormBodyComponent,
  editing,
  defaultValues,
  schema,
  onSave,
}: {
  component: any
  editing: boolean
  defaultValues: any
  schema: any
  onSave: any
}) => {
  const hook = renderUseFormHook({ defaultValues, schema })
  const MockFormWrapper = ({ children }: { children: ReactNode }) => (
    <form role="form" onSubmit={hook.result.current.handleSubmit(onSave)}>
      {children}
    </form>
  )
  const formBody = (hook: any) => <FormBodyComponent form={hook.result.current} editing={editing} />
  const component = render(formBody(hook), { wrapper: MockFormWrapper })
  const rerenderHook = () => {
    hook.rerender()
    component.rerender(formBody(hook))
  }

  return { ...component, rerenderHook }
}
