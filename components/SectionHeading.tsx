type SectionHeadingProps = {
  title: string;
};

export default function SectionHeading({
  title,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl mx-auto mb-16 text-center">
      <h2 className="font-display font-semibold text-[clamp(2rem,4.2vw,2.9rem)] leading-tight">
        {title}
      </h2>
    </div>
  );
}