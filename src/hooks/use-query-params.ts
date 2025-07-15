"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParam = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname, searchParams]
  );

  const setMultipleQueryParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        params.set(key, value);
      });
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname, searchParams]
  );

  const removeQueryParam = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(name);
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname, searchParams]
  );

  const removeMultipleQueryParams = useCallback(
    (names: string[]) => {
      const params = new URLSearchParams(searchParams.toString());
      names.forEach((name) => params.delete(name));
      router.push(pathname + "?" + params.toString());
    },
    [router, pathname, searchParams]
  );

  const getQueryParam = useCallback(
    (name: string) => {
      return searchParams.get(name);
    },
    [searchParams]
  );

  const getAllQueryParams = useCallback(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const clearAllQueryParams = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return {
    setQueryParam,
    setMultipleQueryParams,
    removeQueryParam,
    removeMultipleQueryParams,
    getQueryParam,
    getAllQueryParams,
    clearAllQueryParams,
    searchParams,
  };
}
