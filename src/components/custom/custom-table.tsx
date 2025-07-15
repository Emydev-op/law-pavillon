/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import { cn } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface myComponentProps {
  tableheaderList: string[];
  loading?: boolean;
  tableBodyList?: any;
  hidePagination?: boolean;
  onPageChange?: (param?: any) => void;
  currentPage?: number;
  totalPage?: number;
  perPage?: number;
  onRowClick?: (param?: any) => void;
  defaultBodyList?: any;
  actionButton?: string;
  actionButtonOnClick?: (param?: any) => void;
  dropDown?: boolean;
  dropDownList?: any;
  dynamicDropDownList?: (row?: any) => any[];
  width?: string;
  disabledDropdown?: boolean;
  loadingText?: string;
  emptyText?: string;
}

const CustomTable = ({
  tableheaderList,
  loading,
  actionButtonOnClick,
  actionButton,
  tableBodyList,
  onRowClick,
  defaultBodyList,
  dropDown,
  dropDownList,
  width,
  disabledDropdown,
  totalPage = 0,
  currentPage = 0,
  onPageChange,
  hidePagination,
  loadingText,
  emptyText,
}: myComponentProps) => {
  //   pagination here ------
  // Function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Always show first page
    pageNumbers.push(1);

    // Calculate range of pages to show around current page
    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPage - 1, currentPage + 1);
    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pageNumbers.push("ellipsis-start");
    }
    // Add pages in the calculated range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }
    // Add ellipsis before last page if needed
    if (rangeEnd < totalPage - 1) {
      pageNumbers.push("ellipsis-end");
    }
    // Always show last page if there is more than one page
    if (totalPage > 1) {
      pageNumbers.push(totalPage);
    }

    return pageNumbers;
  };

  const handlePickObjFromDefaultList = (param: any) => {
    if (defaultBodyList?.length > 0) {
      const obj = defaultBodyList?.find((chi: any, idx: any) => idx === param);
      return obj;
    }
  };

  const TableRowComponet = ({
    row,
    children,
    onClick,
  }: {
    row: any;
    children: React.ReactNode;
    onClick: (val: any) => void;
  }) => (
    <TableRow
      className="transition-all duration-300 hover:bg-primary/5"
      key={row?.id}
    >
      {row?.map((cell: any, index: any) => (
        <TableCell
          className="text-black-07 border-white-07 font-normal text-sm border-t-1 border-b-1"
          key={index}
          onClick={onClick}
        >
          {cell}
        </TableCell>
      ))}
      {children}
    </TableRow>
  );

  return (
    <div className="w-full flex flex-col ">
      {/* table component start here ------ */}
      <Table>
        {tableheaderList?.length > 0 && (
          <TableHeader>
            <TableRow>
              {tableheaderList?.map((chi: any, idx: any) => {
                if (chi === "Action") {
                  return (
                    <TableHead
                      key={idx}
                      className="text-[#7C7C7C] bg-white-01 font-medium text-sm text-center whitespace-nowrap capitalize rounded-tr-xm"
                    >
                      {chi || ""}
                    </TableHead>
                  );
                }
                return (
                  <TableHead
                    key={idx}
                    className={cn(
                      "text-[#7C7C7C] bg-white-01 font-medium whitespace-nowrap text-sm capitalize",
                      idx === 0 && "rounded-tl-xm"
                    )}
                  >
                    {chi || ""}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
        )}
        {/* body start here ------ */}

        <TableBody className="bg-white">
          {loading ? (
            <>
              <TableRow>
                <TableCell
                  colSpan={tableheaderList?.length + 1}
                  className="h-60 text-center"
                >
                  <figure className="size-fit mx-auto">
                    <div className="loader" />
                  </figure>
                  {loadingText && <p className="mt-4">{loadingText}</p>}
                </TableCell>
              </TableRow>
            </>
          ) : (
            <>
              {tableBodyList?.length > 0 ? (
                <>
                  {tableBodyList?.map((item: any, rowIndex: any) => {
                    // to ignore some data that might be needed when accessing row object, table row: value Object.values(item) is changed to FORMATTED_DATA?.map((data) => Object.values(data))

                    //  if tableBodyList object has _slug key it will be ignored when rendering table data
                    const FORMATTED_DATA = Object?.entries(item)
                      .filter(([key, _]) => {
                        return key !== "_slug";
                      })
                      ?.map((d) => {
                        return {
                          [d[0]]: d[1],
                        };
                      });
                    return (
                      <TableRowComponet
                        key={rowIndex}
                        row={FORMATTED_DATA?.map(
                          (data) => Object.values(data)[0]
                        )}
                        onClick={() => {
                          if (onRowClick) {
                            defaultBodyList?.length > 0
                              ? onRowClick(
                                  handlePickObjFromDefaultList(rowIndex)
                                )
                              : onRowClick(item);
                          }
                        }}
                      >
                        {dropDown && (
                          <TableCell className="border-b-1 border-t-1 border-white-07">
                            <div
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                              }}
                              className=""
                            >
                              {actionButton ? (
                                <button
                                  type="button"
                                  disabled={disabledDropdown}
                                  onClick={() => {
                                    actionButtonOnClick &&
                                      actionButtonOnClick(item);
                                  }}
                                  className="w-13 h-6 rounded-xm border-[0.5px] border-black-02 text-black-02 font-medium text-sm cursor-pointer"
                                >
                                  {actionButton}
                                </button>
                              ) : (
                                <DropdownMenu>
                                  <DropdownMenuTrigger
                                    asChild
                                    className={cn(
                                      "cursor-pointer px-2",
                                      disabledDropdown && "cursor-not-allowed"
                                    )}
                                    disabled={disabledDropdown}
                                  >
                                    <EllipsisVertical className="size-8" />
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent
                                    className="border rounded-sm"
                                    align="end"
                                    style={{ width: width ? width : "170px" }}
                                  >
                                    {dropDownList?.length > 0 &&
                                      dropDownList?.map(
                                        (child: any, idx: any) => {
                                          return (
                                            <DropdownMenuItem
                                              key={idx}
                                              onClick={() => {
                                                child?.onActionClick &&
                                                  child?.onActionClick(item);
                                              }}
                                              className="font-light text-sm cursor-pointer text-custom-gray-scale-400"
                                            >
                                              {child?.label}
                                            </DropdownMenuItem>
                                          );
                                        }
                                      )}
                                    {/* {dynamicDropDownList &&
                                      dynamicDropDownList(item)?.length > 0 &&
                                      dynamicDropDownList(item)?.map(
                                        (child: any, idx: any) => {
                                          return (
                                            <DropdownMenuItem
                                              key={idx}
                                              onClick={() => {
                                                child?.onActionClick &&
                                                  child?.onActionClick(
                                                    handlePickObjFromDefaultList(
                                                      rowIndex
                                                    ),
                                                    item
                                                  );
                                              }}
                                              className={cn(
                                                "font-light text-sm cursor-pointer text-custom-gray-scale-400",
                                                child?.color,
                                                child?.className
                                              )}
                                            >
                                              {child?.label}
                                            </DropdownMenuItem>
                                          );
                                        }
                                      )} */}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>
                          </TableCell>
                        )}
                      </TableRowComponet>
                    );
                  })}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell
                      colSpan={tableheaderList?.length + 1}
                      className="h-24 text-center"
                    >
                      <span className="inline-block mx-auto mb-1 mt-3">
                        <svg
                          width="31"
                          height="31"
                          viewBox="0 0 31 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.625 5.5H7.375C6.68464 5.5 6.125 6.05964 6.125 6.75V26.75C6.125 27.4404 6.68464 28 7.375 28H23.625C24.3154 28 24.875 27.4404 24.875 26.75V6.75C24.875 6.05964 24.3154 5.5 23.625 5.5Z"
                            stroke="#939393"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11.75 2.99951V6.74951M19.25 2.99951V6.74951M10.5 12.3745H20.5M10.5 17.3745H18M10.5 22.3745H15.5"
                            stroke="#939393"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <p className="text-sm text-black-02">
                        {emptyText ? emptyText : "No results"}.
                      </p>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </>
          )}
        </TableBody>
        {/* body end here ------------------ */}
      </Table>
      {/* table component end here ------ */}
      {/* pagination start here ------ */}
      {totalPage >= 2 && !hidePagination && (
        <div className="inline-flex items-center gap-2 ml-auto mt-3.5">
          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <div key={`ellipsis-${index}`} className="px-2 text-black-02">
                  ...
                </div>
              );
            }

            const isActive = currentPage === page;

            return (
              <button
                key={`page-${page}`}
                onClick={() => {
                  onPageChange && onPageChange(page as number);
                }}
                className={cn(
                  "grid size-[30px] place-content-center rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "bg-transparent text-black-02 hover:bg-gray-100"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomTable;
