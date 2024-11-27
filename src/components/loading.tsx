import { PulseLoader } from "react-spinners";

export function Loading() {
  return (
    <div className="py-5">
      <PulseLoader loading size={15} color="#6ee7b7" />
    </div>
  );
}
