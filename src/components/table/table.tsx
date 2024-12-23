import { ComponentProps } from "react";

export function Table(props: ComponentProps<"table">) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className="w-full" />
    </div>
  );
}
