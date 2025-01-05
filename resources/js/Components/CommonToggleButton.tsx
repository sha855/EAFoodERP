export default function ToggleButton({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <label className=" cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div
        className={`w-10 h-6 rounded-full ${checked ? 'bg-gradient-org-red' : 'bg-gray-300'} transition-colors duration-200 ease-in-out relative`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white absolute top-1 left-1 transition-transform duration-200 ease-in-out ${checked ? 'transform translate-x-4' : ''}`}
        />
      </div>
      <span className="ml-0 text-sm font-medium">{label}</span>
    </label>
  );
}
