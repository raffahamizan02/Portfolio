type SectionHeadingProps = {
  title: string;
};

export default function SectionHeading({
  title,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-16 text-center px-2">
      <h2 className="font-display font-semibold text-[clamp(1.65rem,4.8vw,2.9rem)] leading-tight tracking-tight break-words [text-wrap:balance]">
        {title}
      </h2>
    </div>
  );
}