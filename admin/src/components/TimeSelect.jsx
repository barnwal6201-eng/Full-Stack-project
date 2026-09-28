const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

const TimeSelect = ({ value, onChange, className }) => {
    const [h = '', m = ''] = (value || '').split(':');

    return (
        <div className="flex items-center gap-2">
            <select
                value={h}
                onChange={(e) => onChange(`${e.target.value}:${m || '00'}`)}
                className={className}
            >
                <option value="" disabled className="bg-gray-950 text-gray-200">HH</option>
                {HOURS.map((x) => (
                    <option key={x} value={x} className="bg-gray-950 text-gray-200">{x}</option>
                ))}
            </select>

            <span className="text-gray-400">:</span>

            <select
                value={m}
                onChange={(e) => onChange(`${h || '01'}:${e.target.value}`)}
                className={className}
            >
                <option value="" disabled className="bg-gray-950 text-gray-200">MM</option>
                {MINUTES.map((x) => (
                    <option key={x} value={x} className="bg-gray-950 text-gray-200">{x}</option>
                ))}
            </select>
        </div>
    );
};
export default TimeSelect