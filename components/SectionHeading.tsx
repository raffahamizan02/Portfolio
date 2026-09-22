type SectionHeadingProps = {
  title: string;
};

export default function SectionHeading({
  title = "",
}: SectionHeadingProps) {
  return (
    <div className="max-w-xl mb-14">
      <h2 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.1rem)] leading-tight text-accent ">
        {title}
      </h2>
    </div>
  );
}
