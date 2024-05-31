interface titleProps {
  text: string;
  className?: string;
}

const Title = ({ text, className }: titleProps) => {
  return (
    <div className={className}>
      <h1 className="text-3xl font-bold group-hover:text-customBrownlight transition-all">
        {text}
      </h1>
      <div className="w-80 h-2 bg-customBrownlight rounded-full"></div>
      <div className="w-80 h-2 bg-customBlue rounded-full translate-x-2"></div>
    </div>
  );
};
export default Title;
