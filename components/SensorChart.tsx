import { View } from 'react-native';
import Svg, { Polyline, Rect } from 'react-native-svg';

export default function SensorChart({ data }: { data: number[] }) {
  if (!data?.length) return null;
  const width = 260, height = 120, padding = 20;
  const min = Math.min(...data), max = Math.max(...data);
  const points = data.map((v, i) => {
    const x = padding + (i * (width - 2 * padding)) / (data.length - 1);
    const y = height - padding - ((v - min) * (height - 2 * padding)) / (max - min || 1);
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={{ marginVertical: 24 }}>
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} fill="#eaf0f6" rx={16} />
        <Polyline
          points={points}
          fill="none"
          stroke="#234366"
          strokeWidth={3}
        />
      </Svg>
    </View>
  );
}