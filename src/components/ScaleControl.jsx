export default function ScaleControl({ scale, onChange }) {
    return (
        <div className="scale-control">
            <span>Zoom</span>
            <button type="button" onClick={() => onChange(scale - 0.1)}>−</button>
            <input
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={scale}
                onChange={(event) => onChange(Number(event.target.value))}
            />
            <button type="button" onClick={() => onChange(scale + 0.1)}>+</button>
            <span className="scale-value">{Math.round(scale * 100)}%</span>
        </div>
    );
}