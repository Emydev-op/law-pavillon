"use client";

import React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { CircleAlert, EyeIcon, EyeOffIcon } from "lucide-react";

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  name: string;
  passwordToggle?: boolean; // Add this new prop
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      className,
      label,
      error,
      endIcon,
      containerClassName,
      labelClassName,
      errorClassName,
      type = "text",
      name,
      passwordToggle = false, // Add default value
      ...props
    },
    ref
  ) => {
    // Add state to track password visibility
    const [showPassword, setShowPassword] = React.useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    // Determine the actual input type
    const inputType = passwordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "text-xs font-normal text-black-01 leading-[30px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pb-0.5",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={name}
            name={name}
            type={inputType}
            ref={ref}
            className={cn(
              "flex h-12 w-full rounded-md border border-white-01 bg-white-01 px-5 py-2.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder-black-02 placeholder:text-sm",
              error &&
                "border-red-01 bg-white-04 !ring-0 shadow-[0px_0px_0px_2px_#F846461F] border-[1px]",
              (endIcon || passwordToggle || error) && "pr-10",
              className
            )}
            {...props}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {passwordToggle && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            )}
            {endIcon && <div className="text-muted-foreground">{endIcon}</div>}
            {error && !passwordToggle && (
              <div className="text-destructive">
                <CircleAlert className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>
        {error && (
          <p
            className={cn(
              "text-[11px] font-medium text-red-01 -mt-1",
              errorClassName
            )}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export { CustomInput };
