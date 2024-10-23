interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  children: React.ReactNode
}

export const Label = ({ children, ...props }: LabelProps) => {
  return (
    <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white" {...props}>
      {children}
    </label>
  )
}