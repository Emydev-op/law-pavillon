import { cn } from "@/lib/utils";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";

interface MetricCardProps {
  title: string;
  value: string;
  transactions?: string;
  href?: string;
  icon?: "buy" | "sell";
  desc?: string;
  showArrow?: boolean;
  loading?: boolean;
}

export const MetricCard = ({
  title,
  value,
  transactions,
  href,
  icon,
  desc,
  showArrow,
  loading,
}: MetricCardProps) => {
  return (
    <Link href={href || "#"} className="bg-white-01 rounded-xm">
      <div className="flex justify-between items-center">
        <div
          className={cn(
            "px-[26px] pb-[9px] pt-6 space-y-1",
            !transactions && "pb-6",
            desc && "pb-4.5 px-5"
          )}
        >
          <h5 className="text-sm font-medium text-black-02 capitalize inline-flex gap-x-1.5">
            {title}
          </h5>
          <p className="text-2xl font-bold text-black tracking-basic">
            {value}
          </p>
          {desc && <p className="text-xs text-black-02">{desc}</p>}
        </div>
        {showArrow &&
          (loading ? (
            <Loader className="animate-spin duration-1000 size-4 text-gray-03 mr-[26px]" />
          ) : (
            <ArrowRight className="size-4 text-gray-03 mr-[26px] group-hover:translate-x-1 ease-linear transition-all" />
          ))}
      </div>
      {transactions && (
        <div className="px-[26px] group py-[11px] pr-6 border-t-[0.5px] border-gray-01 flex justify-between items-center">
          <p className="text-xs text-black-02">{transactions}</p>
          <ArrowRight className="size-4 text-gray-03 group-hover:translate-x-1 ease-linear transition-all" />
        </div>
      )}
    </Link>
  );
};
