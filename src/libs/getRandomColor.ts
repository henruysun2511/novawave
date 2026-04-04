export const getBgColor = (id: string) => {
    const bgColors = [
        "bg-red-600", "bg-blue-600", "bg-purple-600", "bg-pink-600", "bg-indigo-600",
        "bg-teal-600", "bg-orange-600", "bg-cyan-600", "bg-emerald-600", "bg-rose-600"
    ];
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return bgColors[Math.abs(hash) % bgColors.length];
};