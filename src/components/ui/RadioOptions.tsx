import Option from "./Option";

interface RadioOptionsProps<T extends string | number | symbol> {
  options: Record<T, string>;
  value: T;
  onSelect: (selectedValue: T) => void;
}

const RadioOptions = <T extends string | number | symbol = string>(
  props: RadioOptionsProps<T>
) => (
  <div className="flex gap-2">
    {Object.keys(props.options).map((value) => {
      const label = props.options[value as T];
      const isSelected = props.value === value;
      return (
        <Option
          key={value}
          isSelected={isSelected}
          onSelect={() => props.onSelect(value as T)}
        >
          {label}
        </Option>
      );
    })}
  </div>
);

export default RadioOptions;
