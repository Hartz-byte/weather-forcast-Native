import { SafeAreaView, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { theme } from "../theme";

const HomeScreen = () => {
  return (
    <View className="flex-1 relative">
      {/* status bar and background image */}
      <StatusBar style="light" />
      <Image
        blurRadius={60}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />

      <SafeAreaView className="flex flex-1">
        {/* search section */}
        <View style={{ height: "7%" }} className="mx-4 relative z-50">
          <View
            className="flex-row justify-end items-center rounded-full"
            style={{ backgroundColor: theme.bgWhite(0.2) }}
          >
            <TextInput
              placeholder="Search city"
              placeholderTextColor={"lightgray"}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
