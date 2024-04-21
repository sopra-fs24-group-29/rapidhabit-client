interface AvatarHabitDetailProps {
  initials: string;
}

const AvaterHabitDetail = (props: AvatarHabitDetailProps) => (
  <div className="rounded-full bg-light-green w-10 h-10 ">
    <span className="flex justify-center pt-3 text-dark-green font-semibold text-xs">
      {props.initials}
    </span>
  </div>
);

export default AvaterHabitDetail;
