import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import Weatherblock from "./WeatherComponent/weather";

const theme = createTheme({
  primaryColor: "blue",
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <div
        style={{
          minHeight: "100vh",
          background: "#101113",
          padding: "20px 0",
        }}
      >
        <Weatherblock />
      </div>
    </MantineProvider>
  );
}

export default App;
