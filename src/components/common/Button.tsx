import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'light' | 'dark';
};

const Button = ({
  type = 'button',
  onClick,
  children,
  className = '',
  disabled = false,
  variant = 'light',
}: ButtonProps) => {
  const baseStyles =
    'min-w-[131px] h-[54px] !capitalize px-[15px] !text-h2 font-bold text-sherpalPrimaryText rounded-[120px] transition-colors duration-300 cursor-pointer';
  const disabledStyles =
    '!bg-sherpalAccentBgColor hover:!bg-sherpalInvertBgColor hover:!text-sherpalPrimaryInvertText !cursor-not-allowed';

  const variantStyles = {
    dark: 'bg-sherpalSecondaryButtonColor text-sherpalPrimaryButtonColor border-sherpalPrimaryButtonColor hover:!bg-sherpalPrimaryButtonColor border hover:!border-sherpalSecondaryButtonColor hover:!text-sherpalSecondaryButtonColor ',
    light:
      'bg-sherpalPrimaryButtonColor border border-sherpalSecondaryButtonColor text-sherpalSecondaryButtonColor hover:!bg-sherpalSecondaryButtonColor hover:!text-sherpalPrimaryButtonColor hover:!border-sherpalInvertBgColor',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        baseStyles,
        variantStyles[variant],
        disabled && disabledStyles,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
