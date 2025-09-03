import clsx from 'clsx';

interface Color {
  name: string;
  value: string;
}

interface Props {
  colors: Color[];
  selectedColor: string;
  onSelectedColor: (color: string) => void;
  disabled?: boolean;
}

function ColorPalette({ colors, selectedColor, onSelectedColor }: Props) {
  return (
    <ul className="flex flex-col flex-wrap pl-0.5 gap-2 md:gap-2">
      {colors.map(({ name, value }, i) => (
        <li key={i}>
          <button
            type="button"
            onClick={() => {
              onSelectedColor(value);
            }}
            aria-label={name}
            className={clsx(
              'w-6 h-6 rounded-full',
              name === '흰색' ? 'border-1 border-black' : '',
              selectedColor === value && 'ring-2 ring-black',
            )}
            style={{ backgroundColor: value }}
          ></button>
        </li>
      ))}
    </ul>
  );
}
export default ColorPalette;
