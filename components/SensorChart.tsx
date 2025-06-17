import { View } from 'react-native';
import Svg, { Polyline, Rect, Circle, G, Line } from 'react-native-svg';

export default function SensorChart({
  data,
  minValue,
  maxValue,
}: {
  data: number[];
  minValue?: number;
  maxValue?: number;
}) {
  if (!data?.length) return null;
  const width = 260, height = 120, padding = 20;
  const min = Math.min(...data), max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - ((v - min) * (height - 2 * padding)) / (max - min || 1);
    return { x, y, v };
  });

  const alertRadius = 9;
  const exclamationHeight = 7;
  const exclamationYOffset = -0.5;

  return (
    <View style={{ marginVertical: 24 }}>
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#eaf0f6" rx={16} />
        <Polyline
          points={points.map(p => `${p.x},${p.y}`).join(' ')}
          fill="none"
          stroke="#234366"
          strokeWidth={3}
        />
        {minValue !== undefined && maxValue !== undefined &&
          points.map((p, i) =>
            (p.v < minValue || p.v > maxValue) ? (
              <G key={i}>
                <Circle
                  cx={p.x}
                  cy={p.y}
                  r={alertRadius}
                  fill="#ffc107"
                  stroke="#fff"
                  strokeWidth={2}
                />
                <Line
                  x1={p.x}
                  y1={p.y - exclamationHeight / 2 + exclamationYOffset}
                  x2={p.x}
                  y2={p.y + exclamationHeight / 2 + exclamationYOffset - 2}
                  stroke="#fff"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                <Circle
                  cx={p.x}
                  cy={p.y + exclamationHeight / 2 + exclamationYOffset + 1}
                  r={1.5}
                  fill="#fff"
                />
              </G>
            ) : null
          )
        }
        {points.map((p, i) =>
          (minValue !== undefined && maxValue !== undefined && (p.v < minValue || p.v > maxValue))
            ? null
            : (
              <Circle
                key={`normal-${i}`}
                cx={p.x}
                cy={p.y}
                r={5}
                fill="#234366"
              />
            )
        )}
      </Svg>
    </View>
  );
}