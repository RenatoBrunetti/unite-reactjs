import { ComponentProps } from "react";

export function TableHeader(props: ComponentProps<"th">) {
  return (
    <th {...props} className="py-3 px-4 text-sm font-semibold text-left" />
  );
}
