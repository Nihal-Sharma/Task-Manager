import React from "react";

/**
 * Filter tabs for switching between All , Completed , Pending.
 * @param {Object} props
 * @param {string} props.currentFilter - Currently selected filter key.
 * @param {Object} props.filters - Map of filter key -> label.
 * @param {Function} props.onChange - Called when filter changes.
 */
export default function FilterTabs({ currentFilter, filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(filters).map(([key, label]) => {
        const isActive = currentFilter === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-400"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
