import React from "react";
import { View, Text, Image } from "react-native";
import { theme } from "../theme";

const ForecastSection = ({ current, location, weatherImages, weather }) => {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-2">
      {/* location */}
      <Text className="text-white text-center text-2xl font-bold">
        {location?.name},
        <Text className="text-lg font-semibold text-gray-300">
          {" " + location?.country}
        </Text>
      </Text>

      {/* weather image */}
      <View className="flex-row justify-center">
        <Image
          source={weatherImages[current?.condition?.text]}
          className="w-52 h-52"
        />
      </View>

      {/* degree Celsius */}
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {current?.temp_c}&#176;
        </Text>
        <Text className="text-center text-white text-xl tracking-widest">
          {current?.condition?.text}
        </Text>
      </View>

      {/* other stats */}
      <View className="flex-row justify-between mx-4">
        {/* wind */}
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/wind.png")}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">
            {current?.wind_kph}km
          </Text>
        </View>

        {/* drop */}
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require("../assets/icons/drop.png")}
            className="h-6 w-6"
          />
          <Text className="text-white font-semibold text-base">
            {current?.humidity}%
          </Text>
        </View>

        {/* sunrise */}
        <View className="flex-row space-x-2 items-center">
          <Image source={require("../assets/icons/sun.png")} className="h-6 w-6" />
          <Text className="text-white font-semibold text-base">
            {weather?.forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForecastSection;
