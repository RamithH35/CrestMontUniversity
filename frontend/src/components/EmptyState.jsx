function EmptyState({ title, description }) {
  return (
    <div className="surface border-dashed p-8 text-center">
      <p className="text-lg font-semibold text-slate-100">{title || "No events available"}</p>
      <p className="mt-2 text-sm text-slate-300">
        {description || "No events available"}
      </p>
    </div>
  );
}

export default EmptyState;
