import { ComponentProps } from "react";

export function TableRow(props: ComponentProps<"tr">) {
  return (
    <tr {...props} className="border-b border-white/10 hover:bg-white/5" />
  );
}
