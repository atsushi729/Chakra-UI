import {Button, ChakraProvider} from "@chakra-ui/react";
import "./styles.css";
import theme from "./theme/theme"

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Button colorScheme="teal">Button</Button>
      <p>hello world</p>
    </ChakraProvider>
  );
}
