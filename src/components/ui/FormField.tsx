interface FormFieldProps {
  label?: string;
  value?: string;
  className?: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

const FormField = (props: FormFieldProps) => {
  return (
    <div className="login field">
      <input
        className="login input"
        placeholder={props.label}
        value={props.value}
        type={props.type}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

export default FormField;
