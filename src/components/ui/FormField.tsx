interface FormFieldProps {
  label?: string;
  value?: string;
  maxLength?: number;
  className?: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className="w-full">
      <input
        placeholder={props.label}
        value={props.value}
        type={props.type}
        maxLength={props.maxLength}
        onChange={(e) => props.onChange(e.target.value)}
        onKeyDown={props.onKeyDown}
        className="rounded-lg bg-input w-full h-7 px-2 placeholder-input-outline focus:border focus:border-input-outline"
      />
    </div>
  );
};

export default FormField;
