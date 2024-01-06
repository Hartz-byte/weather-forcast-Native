import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { CalendarDaysIcon } from "react-native-heroicons/outline";
import { theme } from "../theme";

const ForecastForNextDays = ({ weather, weatherImages }) => {
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2">
        <CalendarDaysIcon size="22" color="white" />
        <Text className="text-white text-base">Daily Forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {weather?.forecast?.forecastday?.map((item, index) => {
          let date = new Date(item.date);
          let options = { weekday: "long" };
          let dayName = date.toLocaleDateString("en-US", options);
          dayName = dayName.split(",")[0];

          return (
            <View
              className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
              style={{ backgroundColor: theme.bgWhite(0.15) }}
              key={index}
            >
              <Image
                source={weatherImages[item?.day?.condition?.text]}
                className="h-11 w-11"
              />
              <Text className="text-white">{dayName}</Text>
              <Text className="text-white text-xl font-semibold">
                {item?.day?.avgtemp_c}&#176;
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ForecastForNextDays;
