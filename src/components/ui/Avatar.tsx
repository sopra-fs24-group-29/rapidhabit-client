interface AvatarProps {
  initials: string;
}

const Avatar = (props: AvatarProps) => (
  <div className="rounded-full bg-light-green w-8 h-8 ">
    <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
      {props.initials}
    </span>
  </div>
);

export default Avatar;
