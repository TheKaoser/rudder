const colors = [
  "#ff00000",
  "#ff6b00",
  "#ffcb00",
  "#7dff00",
  "#00ffcf",
  "#00b9ff",
  "#9924ff",
  "#9d00ff",
  "#ff99b6",
];

export const ColorPicker = ({ onChange }) => {
  return (
    <View>
      <View className="flex-row">
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[0],
          }}
          onPress={() => onChange(colors[0])}
        />
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[1],
          }}
          onPress={() => onChange(colors[1])}
        />
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[2],
          }}
          onPress={() => onChange(colors[2])}
        />
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[3],
          }}
          onPress={() => onChange(colors[3])}
        />
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[4],
          }}
          onPress={() => onChange(colors[4])}
        />

        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[5],
          }}
          onPress={() => onChange(colors[5])}
        />
      </View>
      <View className="flex-row">
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[6],
          }}
          onPress={() => onChange(colors[6])}
        />
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[7],
          }}
          onPress={() => onChange(colors[7])}
        />
        <TouchableOpacity
          className="h-12 w-12 rounded-full"
          style={{
            backgroundColor: colors[8],
          }}
          onPress={() => onChange(colors[8])}
        />
      </View>
    </View>
  );
};