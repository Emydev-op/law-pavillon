import { Bell } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";

export default function HeaderNav() {
  return (
    <header className="bg-white border-b border-white-07 sticky z-[4] top-0 w-full py-3 px-3 lg:px-9 flex items-center justify-between">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex items-center gap-x-[23px]">
        <figure className="size-10 grid place-content-center relative rounded-full bg-white-02">
          <Bell className="size-5 text-primary" />
        </figure>

        <hr className="border-[0.5px] border-gray-01 h-9 lg:h-11" />

        <div className="flex items-center gap-x-3">
          <Avatar className="lg:size-[42px] size-10">
            <AvatarImage />
            <AvatarFallback className="bg-primary text-white font-medium">
              OC
            </AvatarFallback>
          </Avatar>
          <div className="-space-y-0.5 hidden md:block">
            <h4 className="tracking-basic font-medium text-base text-black-07">
              Osegbo Chukwuemeka
            </h4>
            <p className="text-black-02 hidden lg:block text-sm font-medium italic tracking-basic items-center">
              IT Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
