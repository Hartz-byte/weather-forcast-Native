import { SafeAreaView, View, Image } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import * as Progress from "react-native-progress";
import { getData, storeData } from "../utils/asyncStorage";
import { fetchLocations, fetchWeatherForcast } from "../api/weather";
import { weatherImages } from "../constants";
import { debounce } from "lodash";
import SearchSection from "../components/SearchSection";
import ForecastSection from "../components/ForecastSection";
import ForecastNextDays from "../components/ForecastForNextDays";

const HomeScreen = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // setting up the location
  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);

    fetchWeatherForcast({
      cityName: loc.name,
      days: "5",
    }).then((data) => {
      setWeather(data);
      setLoading(false);
      storeData("city", loc.name);
    });
  };

  // handling search function
  const handleSearch = async (value) => {
    try {
      if (value.length > 2) {
        const data = await fetchLocations({ cityName: value });
        setLocations(data);
      }
    } catch (error) {
      setError("Error fetching locations");
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    try {
      let myCity = await getData("city");
      let cityName = await getData("Goa");
      if (myCity) cityName = myCity;

      const data = await fetchWeatherForcast({
        cityName,
        days: "5",
      });

      setWeather(data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching weather data");
      setLoading(false);
    }
  };

  // debounce for the search function
  const handleTextDebounce = useCallback(debounce(handleSearch, 600), []);

  const { current, location } = weather;

  return (
    <View className="flex-1 relative">
      {/* status bar and background image */}
      <StatusBar style="light" />
      <Image
        blurRadius={60}
        source={require("../assets/images/bg.png")}
        className="absolute h-full w-full"
      />

      {/* loading, error, and fetch completion status */}
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="white" />
        </View>
      ) : error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 font-bold">{error}</Text>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1 mt-14">
          {/* Search Section */}
          <SearchSection
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebounce={handleTextDebounce}
            locations={locations}
            handleLocation={handleLocation}
          />

          {/* Forecast Section */}
          <ForecastSection
            current={current}
            location={location}
            weatherImages={weatherImages}
            weather={weather}
          />

          {/* Forecast Next Days */}
          <ForecastNextDays weather={weather} weatherImages={weatherImages} />
        </SafeAreaView>
      )}
    </View>
  );
};

export default HomeScreen;
