import { Button } from '@nextui-org/react';
import React, { FC, PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  radius?: 'sm' | 'md' | 'lg' | 'none' | 'full';
}

const FormButton: FC<PropsWithChildren<FormButtonProps>> = ({
  children,
  className,
  size,
  variant,
  color,
  radius,
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={className}
      isLoading={pending}
      size={size}
      variant={variant}
      color={color}
      radius={radius}
    >
      {children}
    </Button>
  );
};

export default FormButton;
