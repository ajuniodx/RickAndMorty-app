import RickComponent from "./src/components/RickComponent";
import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/styles/theme";

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        translucent
      />
      <RickComponent />
    </NativeBaseProvider>
  );
}
