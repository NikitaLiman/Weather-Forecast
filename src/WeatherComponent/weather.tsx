import React from "react";
import {
  Container,
  TextInput,
  Button,
  Group,
  Paper,
  Text,
  Title,
  Loader,
  Box,
  Stack,
  rem,
} from "@mantine/core";
import { weatherCall } from "../services/weather-api";

const Weatherblock: React.FC = () => {
  const [city, setCity] = React.useState<string>("");
  const [weather, setWeather] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const cachedData = localStorage.getItem("Weather_Value");
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      if (Date.now() - parsedData.timestamp < 5 * 60 * 1000) {
        setWeather(parsedData.data);
      }
    }
  }, []);

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const data = await weatherCall(city);
      setWeather(data);
      localStorage.setItem(
        "Weather_Value",
        JSON.stringify({ data, timestamp: Date.now() })
      );
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error fetching weather data");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Paper
        p="md"
        radius="md"
        bg="dark.7"
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(35, 35, 35, 0.5) 49%, rgba(35, 35, 35, 0.5) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(35, 35, 35, 0.5) 49%, rgba(35, 35, 35, 0.5) 51%, transparent 52%)
            `,
            backgroundSize: "20px 20px",
            opacity: 0.4,
            zIndex: 0,
          }}
        />

        <Box style={{ position: "relative", zIndex: 1 }}>
          <Title order={4} mb="md" c="white">
            Weather Forecast
          </Title>

          <Group gap="sm" grow>
            <TextInput
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              placeholder="Enter city name"
              error={error}
              disabled={loading}
              styles={{
                input: {
                  background: "rgba(40, 40, 40, 0.8)",
                  color: "white",
                },
              }}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
            />

            <Button
              onClick={getWeather}
              loading={loading}
              color="blue"
              h={rem(36)}
            >
              Search
            </Button>
          </Group>

          {loading && (
            <Box ta="center" p="xl">
              <Loader color="blue" />
            </Box>
          )}

          {weather && !loading && (
            <Paper p="md" radius="sm" mt="md" bg="dark.8">
              <Stack gap="md">
                <Title order={3} ta="center">
                  {weather.name}, {weather.sys.country}
                </Title>

                <Group justify="center" gap="md">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <div>
                    <Title order={2}>{Math.round(weather.main.temp)}°C</Title>
                    <Text tt="capitalize">
                      {weather.weather[0].description}
                    </Text>
                  </div>
                </Group>

                <Group justify="space-between" wrap="wrap">
                  <Text size="sm">Humidity: {weather.main.humidity}%</Text>
                  <Text size="sm">Wind: {weather.wind.speed} m/s</Text>
                  <Text size="sm">
                    Feels like: {Math.round(weather.main.feels_like)}°C
                  </Text>
                </Group>
              </Stack>
            </Paper>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Weatherblock;
