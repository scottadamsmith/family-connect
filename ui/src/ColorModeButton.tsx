import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode(); 
  const isDark = colorMode === "dark";
  return (
    <Button
      size={"xs"}
      leftIcon={isDark ? <SunIcon /> : <MoonIcon />} 
      onClick={toggleColorMode}>{isDark ? "Light Mode" : "Dark Mode"}</Button>
  )
}

export default ColorModeButton