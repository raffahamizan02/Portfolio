type SectionHeadingProps = {
  title: string;
  description?: string;
};

export default function SectionHeading({
  title = "",
  description = "",
}: SectionHeadingProps) {
  return (
    <div className="max-w-xl mb-14">
      <h2 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.1rem)] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-3.5 text-muted text-[1.02rem] max-w-[52ch]">
          {description}
        </p>
      )}
    </div>
  );
}
