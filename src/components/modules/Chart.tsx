
import { useState, type SetStateAction , type Dispatch } from "react";

type chartProps = {
    chart : boolean;
    setChart : Dispatch<SetStateAction<boolean>>
}
export default function Chart({chart , setChart} : chartProps) {
 
  if (!chart) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal container */}
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-xl p-6 w-[400px] text-center border border-white/30">
        <h2 className="text-xl font-semibold text-white mb-4">Modal Title</h2>
        <p className="text-white/90 mb-6">این محتوا داخل مودال هست 🎉</p>
        <button
          onClick={() => setChart(false)}
          className="px-4 py-2 rounded-xl bg-white/30 hover:bg-white/40 text-white transition-colors"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
