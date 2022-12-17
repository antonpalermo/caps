import { InputHTMLAttributes } from 'react'
import { useField } from 'formik'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string
  label?: string
}

export default function Input({ ...props }: InputProps) {
  const [field, meta, _] = useField(props)

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input {...field} {...props} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </div>
  )
}
