"use client";
import { routePath } from "@/utils/routes";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Authenticated({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = Cookies.get("token");

  useEffect(() => {
    if (!accessToken || accessToken === "undefined") {
      return redirect(routePath.AUTH.LOGIN);
    }
  }, [accessToken]);

  return children;
}
