type Props = {
  index: string;
  title: string;
  description?: string;
};

export default function SectionHeading({ index, title, description }: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="mono-label text-red">{index}</div>
        <h2 className="mt-4 font-display text-[clamp(36px,5vw,56px)] font-medium leading-none tracking-[-0.04em]">
          {title}
        </h2>
      </div>
      {description ? <p className="body-copy max-w-[34ch]">{description}</p> : null}
    </div>
  );
}
