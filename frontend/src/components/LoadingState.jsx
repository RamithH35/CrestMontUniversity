function LoadingState({ label = "Loading..." }) {
  return (
    <div className="surface p-6">
      <div className="flex items-center justify-center gap-3 text-sm text-slate-300">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
        {label}
      </div>
    </div>
  );
}

export default LoadingState;
