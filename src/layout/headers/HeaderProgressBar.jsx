export default function HeaderProgressBar({ scrollProgress }) {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent overflow-hidden">
      <div
        className="h-full bg-linear-to-r from-transparent via-red-500 to-red-600 transition-all duration-200 ease-out shadow-[0_0_10px_#ef4444]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}