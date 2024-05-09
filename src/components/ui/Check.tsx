import clsx from "clsx";

interface CheckProps {
  isChecked?: boolean;
  textColor?: string;
  fillColor?: string;
  borderColor?: string;
}

const Check = (props: CheckProps) => {
  const textClassName = props.textColor ?? "text-light-green";
  const fillClassName = props.fillColor ?? "bg-light-green";
  const borderClassName = props.borderColor ?? "border-light-green";
  return (
    <div
      className={clsx(
        "w-6 h-6 rounded-full flex items-center justify-center border-2 shrink-0",
        borderClassName,
        props.isChecked && fillClassName,
        props.isChecked ? "text-black" : textClassName
      )}
    >
      <svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.39587 3.29166L5.04171 6.83332L10.875 1.16666"
          stroke="currentColor"
          stroke-with="2"
          strokeLinecap="round"
          strokeWidth="round"
        />
      </svg>
    </div>
  );
};

export default Check;
