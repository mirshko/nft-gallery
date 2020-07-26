import { useRouter } from "next/router";
import { useEffect } from "react";

export function useRedirect(path = "/") {
  const { replace } = useRouter();

  useEffect(() => {
    replace(path);
  }, []);
}

export default function Redirect() {
  useRedirect();

  return null;
}
