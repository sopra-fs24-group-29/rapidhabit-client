interface FormFieldProps {
  label?: string;
  value?: string;
  className?: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className="w-full">
      <input
        placeholder={props.label}
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
        className="rounded-lg bg-input w-full h-7 px-2 placeholder-gray-600"
      />
    </div>
  );
};

export default FormField;
