interface ISpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'teal' | 'gray';
}

export default function Spinner(props: ISpinnerProps) {
  const borderColor = {
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
  return (
    <div
      className={`${sizesH[props.size || 'md']} ${
        sizesW[props.size || 'md']
      } border-solid border-4 border-t-transparent ${
        borderColor[props.color || 'teal']
      } rounded-full animate-spin`}
    />
  );
}
