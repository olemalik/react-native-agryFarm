
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl } from 'react-native';
import RNLocation from 'react-native-location';

const openWeatherKey = `f007b7d28f16f635c4dccd086915ce03`;
let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${openWeatherKey}`;
RNLocation.configure({
  distanceFilter: null
 })
const WeatherForecast = () => {

  const [forecast, setForecast] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  [viewLocation, isViewLocation] = useState([])

  const loadForecast = async () => {
    setRefreshing(true);
    let location;
     let permission=false;
     if(!permission) {
        permission = await RNLocation.requestPermission({
         ios: "whenInUse",
         android: {
           detail: "coarse",
           rationale: {
             title: "We need to access your location",
             message: "We use your location to show where you are on the map",
             buttonPositive: "OK",
             buttonNegative: "Cancel"
           }
         }
       })
       console.log(permission)
       location = await RNLocation.getLatestLocation({timeout: 100})
       console.log(location, location.longitude, location.latitude, 
             location.timestamp)
  } else {
      console.log("Here 7")
      location = await RNLocation.getLatestLocation({timeout: 100})
      console.log(location, location.longitude, location.latitude,   
                  location.timestamp)
  } 
    isViewLocation(location);
    const response = await fetch( `${url}&lat=${viewLocation.latitude}&lon=${viewLocation.longitude}`);
    const data = await response.json();

    if(!response.ok) {
      Alert.alert(`Error retrieving weather data: ${data.message}`); 
    } else {
      setForecast(data);
    }

    setRefreshing(false);
  }

  useEffect(() => { 
    if (!forecast) {
      loadForecast(); 
    }
  })

  if (!forecast) {
    return <SafeAreaView style={styles.loading}>
      <ActivityIndicator size="large" />
      </SafeAreaView>;
  }

  const current = forecast.current.weather[0]; 
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        refreshControl={
          <RefreshControl 
            onRefresh={() => {  loadForecast() }} 
            refreshing={refreshing}
          />}
      >
        <Text style={styles.title}>Today's Weather</Text>
        <View style={styles.current}>
          <Image
            style={styles.largeIcon}
            source={{
              uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
            }}
          />
          <Text style={styles.currentTemp}>{Math.round(forecast.current.temp)}°C</Text>
        </View>
        
        <Text style={styles.currentDescription}>{current.description}</Text>
        <View>
          <Text style={styles.subtitle}>Hourly</Text>
          <FlatList horizontal
            data={forecast.hourly.slice(0, 24)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(hour) => {
              const weather = hour.item.weather[0];
              var dt = new Date(hour.item.dt * 1000);
              return <View style={styles.hour}>
                <Text>{dt.toLocaleTimeString().replace(/:\d+ /, ' ')}</Text>
                <Text>{Math.round(hour.item.temp)}°C</Text>
                <Image
                  style={styles.smallIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
                  }}
                />
                <Text>{weather.description}</Text>
              </View>
            }}
          />
        </View>

        <Text style={styles.subtitle}>Next 5 Days</Text>
        {forecast.daily.slice(0,5).map(d => { 
          const weather = d.weather[0];
          var dt = new Date(d.dt * 1000);
          return <View style={styles.day} key={d.dt}>
            <Text style={styles.dayTemp}>{Math.round(d.temp.max)}°C</Text>
            <Image
              style={styles.smallIcon}
              source={{
                uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
              }}
            />
            <View style={styles.dayDetails}>
              <Text>{dt.toLocaleDateString()}</Text>
              <Text>{weather.description}</Text>
            </View>
          </View>
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 42,
    color: '#009387',
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 12,
    marginLeft: 4,
    color: '#009387',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  current: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  currentTemp: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
  currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginBottom: 24
  },
  hour: {
    padding: 6,
    alignItems: 'center',
  },
  day: {
    flexDirection: 'row',
  },
  dayDetails: {
    justifyContent: 'center',
  },
  dayTemp: {
    marginLeft: 12,
    alignSelf: 'center',
    fontSize: 20
  },
  largeIcon: {
    width: 250,
    height: 200,
  },
  smallIcon: {
    width: 100,
    height: 100,
  }
});

export default WeatherForecast;