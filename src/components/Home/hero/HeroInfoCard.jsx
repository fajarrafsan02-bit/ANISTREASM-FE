import { memo } from "react";
import { motion } from "motion/react";

function StarRating({ rating }) {
  const num = parseFloat(rating) || 0;
  const stars = Math.min(5, Math.round(num / 2));
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3 h-3 ${s <= stars ? "text-yellow-400 drop-shadow-[0_0_4px_rgba(250,204,21,0.5)]" : "text-gray-500/30"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function StatusDot({ status }) {
  const isOngoing = status === "ONGOING" || status === "Ongoing";
  return (
    <span className="flex items-center gap-1.5">
      <span className="relative flex h-2 w-2">
        {isOngoing && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${
            isOngoing ? "bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" : "bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]"
          }`}
        />
      </span>
      <span className="text-[10px] font-semibold tracking-wider">
        {isOngoing ? "Ongoing" : "Complete"}
      </span>
    </span>
  );
}

const cardVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default memo(function HeroInfoCard({ current, isDark, animationKey }) {
  if (!current) return null;

  const hasSeason = current.season || current.episode;
  const hasRating = current.rating && current.rating !== "0.0";
  const hasDuration = current.duration;
  const hasStatus = current.status;
  const showDesktop = hasSeason || hasRating || hasDuration || hasStatus;

  if (!showDesktop) return null;

  const ratingNum = parseFloat(current.rating) || 0;

  return (
    <>
      {/* Desktop */}
      <motion.div
        key={`desktop-card-${animationKey}`}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className={`absolute top-28 right-6 md:right-16 lg:right-24 z-[5] hidden md:block rounded-2xl p-5 w-56 border shadow-2xl backdrop-blur-xl transition-colors duration-500 group hover:scale-[1.03] hover:-translate-y-1 ${
          isDark
            ? "bg-black/40 border-white/[0.06] shadow-black/30"
            : "bg-white/60 border-gray-200/40 shadow-black/5"
        }`}
      >
        {/* Animated accent gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500/0 via-red-500 to-red-500/0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Subtle glow on hover */}
        <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isDark ? 'shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'shadow-[0_0_30px_rgba(239,68,68,0.08)]'}`} />

        {/* Season + Episode */}
        {hasSeason && (
          <div className="mb-4 relative">
            {current.season && (
              <p
                className={`text-[10px] uppercase tracking-[0.2em] font-semibold transition-colors ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {current.season}
              </p>
            )}
            {current.episode && (
              <p
                className={`text-lg font-bold mt-0.5 transition-colors ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {current.episode}
              </p>
            )}
          </div>
        )}

        {/* Rating bar */}
        {hasRating && (
          <div
            className={`rounded-xl p-3 mb-3 border backdrop-blur-sm transition-colors ${
              isDark
                ? "bg-white/[0.04] border-white/[0.06]"
                : "bg-black/[0.02] border-black/[0.06]"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <StarRating rating={current.rating} />
              <span
                className={`text-sm font-black font-mono ${
                  isDark ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                {current.rating}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300"
                initial={{ width: "0%" }}
                animate={{
                  width: `${Math.min(100, ratingNum * 10)}%`,
                }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  boxShadow: "0 0 6px rgba(250,204,21,0.4)",
                }}
              />
            </div>
          </div>
        )}

        {/* Duration + Status */}
        <div className="flex items-center justify-between">
          {hasDuration && (
            <p
              className={`text-[11px] font-medium transition-colors flex items-center gap-1 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <svg className="w-3 h-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {current.duration}
            </p>
          )}
          {hasStatus && <StatusDot status={current.status} />}
        </div>
      </motion.div>

      {/* Mobile */}
      <motion.div
        key={`mobile-card-${animationKey}`}
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute top-2.5 right-2.5 xs:top-3 xs:right-3 sm:top-4 sm:right-4 z-[5] md:hidden rounded-lg sm:rounded-xl px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 border shadow-xl backdrop-blur-xl transition-all duration-700 ${
          isDark
            ? "bg-black/40 border-white/[0.06] shadow-black/20"
            : "bg-white/60 border-gray-200/40 shadow-black/5"
        }`}
      >
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
          {current.season && (
            <>
              <div>
                <p
                  className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {current.season}
                </p>
                {current.episode && (
                  <p
                    className={`text-[10px] sm:text-xs font-bold mt-0.5 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {current.episode}
                  </p>
                )}
              </div>
              <div className="w-px h-6 sm:h-7 bg-current opacity-15" />
            </>
          )}
          {hasRating && (
            <>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span
                    className={`text-[10px] sm:text-xs font-black font-mono ${
                      isDark ? "text-yellow-400" : "text-yellow-600"
                    }`}
                  >
                    {current.rating}
                  </span>
                </div>
                {hasDuration && (
                  <span
                    className={`text-[8px] sm:text-[9px] ${
                      isDark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {current.duration}
                  </span>
                )}
              </div>
              <div className="w-px h-6 sm:h-7 bg-current opacity-15" />
            </>
          )}
          {hasStatus && <StatusDot status={current.status} />}
        </div>
      </motion.div>
    </>
  );
});
