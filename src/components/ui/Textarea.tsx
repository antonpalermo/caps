import { TextareaHTMLAttributes } from 'react'
import { useField } from 'formik'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string
  label?: string
}

export default function Textarea({ ...props }: TextareaProps) {
  const [field, meta, _] = useField(props)

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea {...field} {...props} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </div>
  )
}
