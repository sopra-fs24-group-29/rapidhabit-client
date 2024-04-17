interface SettingsHabitProps {
  habit: string;
}

const SettingsHabitBox = (props: SettingsHabitProps) => {
  return (
    <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
      <div className="flex items-center">
        <div className="pl-4">
          <img
            className="h-7 w-7"
            src="/habit.png"
            alt="habit icon"
          />
        </div>
        <div className="ml-4 text-base">
          {props.habit}
        </div>
      </div>
      <div className="pr-4">
        <img
          className="h-3 w-3 cursor-pointer"
          src="/cross.png"
          alt="delete icon"
        />
      </div>
    </div>
  );
};

export default SettingsHabitBox;