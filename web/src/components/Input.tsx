export default function Input({
  id,
  label,
  type,
  required,
  className,
}: {
  id: string;
  label: string;
  type: string;
  required: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        required={required}
        className="bg-[#181818] border-[#353535] border-1 rounded-md py-0.5"
      />
    </div>
  );
}
