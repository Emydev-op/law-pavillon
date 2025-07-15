"use client";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Download, RotateCw, Search } from "lucide-react";
import { useDebounce } from "react-haiku";

interface FilterProp {
  title?: string;
  desc?: string | ReactNode;
  containerClass?: string;
  hasSearch?: boolean;
  hasRefresh?: boolean;
  hasDateRange?: boolean;
  hasExport?: boolean;
  hasExportPlus?: boolean;
  exportText?: string;
  onRrefresh?: () => void;
  onSearch?: (val: string) => void;
  onExport?: () => void;
}

export default function FilterBarInput({
  title,
  desc,
  containerClass,
  hasExport = true,
  hasSearch = true,
  exportText,
  onRrefresh,
  hasRefresh,
  onExport,
  onSearch,
  hasExportPlus,
}: FilterProp) {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 1000);
  const ref = useRef<HTMLInputElement>(null);

  // Handle Change After Debounce
  useEffect(() => {
    onSearch && onSearch(debouncedValue);
  }, [debouncedValue]);

  return (
    <section
      className={cn("flex justify-between items-center", containerClass)}
    >
      <div className="space-y-0.5 tracking-basic">
        {title && <h5 className="font-medium">{title}</h5>}
        <p className="text-xs text-black-02">{desc}</p>
      </div>
      <div className="inline-flex gap-x-2 items-center">
        {/* refresh */}
        {hasRefresh && (
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              onRrefresh && onRrefresh();
            }}
            className="h-[34px] px-2.5 py-2 text-xs text-black-02 rounded-[3px] shadow-none"
          >
            <RotateCw className="size-4.5" />
            Refresh
          </Button>
        )}
        {/* search */}
        {hasSearch && (
          <div className="size-fit relative">
            <figure className="size-fit absolute h-[35px] rounded-full grid place-content-center px-2.5">
              <Search className="text-gray-03 size-5" />
            </figure>
            <input
              ref={ref}
              id="search"
              name="search"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              // placeholder="Search                Ctrl + K"
              // Dont remove the ^^^^ empty spaces here Its part of the search input
              placeholder="Search"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="flex h-[35px] w-full rounded-xm border border-white-01 min-w-[200px] bg-white-01 px-3 pl-[35px] py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 placeholder-black-02 placeholder:text-sm"
            />
          </div>
        )}
        {hasExport && (
          <Button
            variant={"default"}
            className="h-8 rounded-[5px] text-xs gap-1.5"
            onClick={() => {
              onExport && onExport();
            }}
          >
            {exportText ? exportText : "Export"}
            <Download />
          </Button>
        )}
      </div>
    </section>
  );
}
