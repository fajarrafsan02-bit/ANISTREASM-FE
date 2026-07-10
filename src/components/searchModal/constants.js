import { Tv2, Film, Clapperboard } from "lucide-react";

export const TYPE_ICON = {
    TV: Tv2,
    Movie: Film,
    OVA: Clapperboard,
    ONA: Clapperboard,
    Special: Clapperboard,
};

export const TYPE_GRADIENT = {
    TV: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/20",
    Movie:
        "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/20",
    OVA: "from-violet-500/20 to-purple-500/20 text-violet-400 border-violet-500/20",
    ONA: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/20",
    Special: "from-rose-500/20 to-pink-500/20 text-rose-400 border-rose-500/20",
};
