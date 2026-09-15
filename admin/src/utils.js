const formatSlot = (date) => {
    if(!(date instanceof Date)) date = new Date(date);
    return new Intl.DateTimeFormat("en-US", {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }).format(date);
};

function getImageUrl(maybe) {
    if(!maybe) return null;
    if(typeof maybe !== 'string') return null;
    if(maybe.startsWith('http://') || maybe.startsWith('https://')) return maybe;
    const cleaned = String(maybe).replace(/^uploads\//, "");
    return `${API_BASE}/uploads/${cleaned}`;
}

function displayDuration(item) {
    if(!item) return;
    if(item.duration && typeof item.duration === 'number'){
        const totalMins = item.duration;
        if(totalMins < 60) return `${totalMins}`;
        const hours = Math.floor(totalMins / 60);
        const mins = totalMins % 60;
        return mins === 0 ? `${hours}h` : `${hours}h ${mins}m`;
    }

    if(item.duration && typeof item.duration === 'object') {
        const h = item.duration.hours ?? 0;
        const m = item.duration.minutes ?? 0;
        if(h && m) return `${h}h ${m}m`;
        if(h) return `${h}h`;
        return `${m}m`;
    }
    return "";
}

function formatSlots(s){
    try {
        const d = s.date ? new Date(s.date + 'T00:00:00') : null;
        const dayName = d ? d.toLocaleDateString(undefined, {weekday: "short"}) : "";
        const dateStr = d ? d.toLocaleDateString() : s.date || "";
        const time = s.time || "";
        const ampm = s.ampm || "";
        return `${dayName} ${dateStr} ● ${time} ${ampm}`.trim();
    } catch (error) {
        return `${s.date || ""} ${s.time || ""} ${s.ampm || ""}`;
    }
}

export {formatSlot, getImageUrl, displayDuration, formatSlots};