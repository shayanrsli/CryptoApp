import { Dispatch, SetStateAction } from "react";

type PageProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
};

export default function Pagination({ page, setPage }: PageProps) {
  const totalPages = 10; // میتونی اینو داینامیک کنی
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const previousHandler = () => {
    if (page <= 1) return;
    setPage((p) => p - 1);
  };

  const nextHandler = () => {
    if (page >= totalPages) return;
    setPage((p) => p + 1);
  };

  return (
    <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 px-2 bg-gray-900 rounded-lg">
      <button
        onClick={previousHandler}
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={page === 1}
      >
        Prev
      </button>

      {pages.map((p) => {
        // ellipsis برای صفحات وسط
        if (p !== 1 && p !== totalPages && Math.abs(p - page) > 1) {
          if (p === page - 2 || p === page + 2) return <span key={p} className="text-gray-300">...</span>;
          return null;
        }

        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-1 rounded font-semibold transition ${
              page === p
                ? "bg-blue-500 text-white shadow-lg scale-105" // صفحه فعلی برجسته و کمی بزرگ‌تر
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {p}
          </button>
        );
      })}

      <button
        onClick={nextHandler}
        className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
