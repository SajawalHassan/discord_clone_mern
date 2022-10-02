interface Props {
  Svg: any;
  text: string;
  description: string;
  className?: string;
}

const HomeExample = ({ Svg, text, description, className }: Props) => {
  return (
    <div
      className={`md:flex md:items-center md:justify-center w-full my-20 md:my-0 md:min-h-[35rem] ${className}`}
    >
      <div className="min-w-[23rem] sm:min-w-[30rem] max-w-[40rem]">
        <Svg height={"100%"} width={"100%"} />
      </div>
      <div className="px-8 md:-mt-3 md:space-y-5 md:max-w-[45rem]">
        <h1 className="font-bold text-[25px] lg:text-4xl sm:text-center md:text-left xl:text-5xl">
          {text}
        </h1>
        <p className="text-[15px] mt-2 text-gray-600 lg:text-lg sm:px-8 sm:text-center md:text-left md:px-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default HomeExample;
