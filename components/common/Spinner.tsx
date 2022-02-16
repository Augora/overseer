interface ISpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'teal' | 'gray';
}

const colorsBorder = {
  teal: 'border-teal-500',
  gray: 'border-gray-500',
};

const sizesH = {
  xs: 'h-2',
  sm: 'h-4',
  md: 'h-8',
  lg: 'h-16',
  xl: 'h-32',
};

const sizesW = {
  xs: 'w-2',
  sm: 'w-4',
  md: 'w-8',
  lg: 'w-16',
  xl: 'w-32',
};

const sizesBorder = {
  xs: 'border-2',
  sm: 'border-2',
  md: 'border-2',
  lg: 'border-4',
  xl: 'border-4',
};

export default function Spinner(props: ISpinnerProps) {
  const height = sizesH[props.size || 'md'];
  const width = sizesW[props.size || 'md'];
  const border = sizesBorder[props.size || 'md'];
  const borderColor = colorsBorder[props.color || 'teal'];

  return (
    <div
      className={`${height} ${width} border-solid ${border} border-t-transparent ${borderColor} rounded-full animate-spin`}
    />
  );
}
