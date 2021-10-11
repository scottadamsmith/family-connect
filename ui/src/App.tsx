import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import {
  // Box,
  UnorderedList,
  ListItem,
  // Text,
  // IconButton,
  // Button,
  // Stack,
  // Collapse,
  // Icon,
  // Link,
  // Popover,
  // PopoverTrigger,
  // PopoverContent,
  useColorModeValue,
  // useBreakpointValue,
  // useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,  
} from '@chakra-ui/icons';
import TicTacToe from "./TicTacToe";
import styles from './App.module.css';
import ColorModeButton from './ColorModeButton';


function App() {
  return (
    <Router>
      <header>
        <nav className={styles.nav} aria-label="Primary Navigation">
          <UnorderedList
            display="flex"
            alignItems="center"
            listStyleType="none"
            padding="0"
            margin="0"
            bg={useColorModeValue('gray.200', 'gray.700')}
            color={useColorModeValue('gray.600', 'white')}
            minH="4rem"
            width="100%">
            <ListItem paddingLeft=".5rem">
              <Link color={useColorModeValue('gray.600', 'white')} to="/tictactoe" >TicTacToe</Link>
            </ListItem>
            <ListItem flex="1" display="flex" justifyContent="flex-end">
              <ColorModeButton />
            </ListItem>
          </UnorderedList>
        </nav>
      </header>        
      <main>
        <Switch>
          <Route path="/tictactoe">
            <TicTacToe />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
