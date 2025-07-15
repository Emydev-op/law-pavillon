import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { LoaderIcon } from "lucide-react";

export interface CustomInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  loading?: boolean;
}

export default function SelectInput({
  label,
  error,
  containerClassName,
  labelClassName,
  errorClassName,
  name,
  value,
  onChange,
  options,
  loading,
  placeholder = "Select",
}: CustomInputProps) {
  return (
    <div className="w-full space-y-2">
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
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger
          className={cn(
            "w-full min-h-[46px] text-black-01 border-0 bg-white-01 rounded-[10px] py-2 px-5",
            containerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="pr-5 overflow-y-auto">
          {loading ? (
            <div className={cn("ml-5 py-2 text-black-01 rounded-none mt-1")}>
              <LoaderIcon className="animate-spin text-primary mx-auto" />
            </div>
          ) : (options?.length ?? 0) < 1 ? (
            <div className="ml-5 py-2 text-black-02 rounded-none mt-1">
              No options available
            </div>
          ) : (
            options?.map((item, idx) => (
              <SelectItem
                key={idx}
                value={item.value}
                className={cn(
                  "ml-5 py-2 text-black-01 rounded-none mt-1",
                  (options?.length ?? 0) - 1 === idx
                    ? ""
                    : " border-b-1 border-gray-01"
                )}
              >
                {item.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
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
