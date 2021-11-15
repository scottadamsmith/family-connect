import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Flex,
  Grid,
  // Box
} from "@chakra-ui/react"
import { useForm } from 'react-hook-form';
import * as engine from "./engine"

type StartGameForm = {
  playerOneName: string;
  playerTwoName: string;
};

function TicTacToe() {
  const [board, setBoard] = useState<engine.Board | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<StartGameForm>({
    mode: 'onChange'
  });

  const startGame = (data: StartGameForm) => {
    const newboard: engine.Board = new engine.Board(data.playerOneName);
    newboard.joinGame(data.playerTwoName);
    setBoard(newboard);
  };

  return (
    <Flex justifyContent="center">
      {board === null ? 
        <Grid as="form" onSubmit={handleSubmit(startGame)} gridTemplateColumns="1fr" gridAutoRows="min-content" rowGap="1rem" marginTop="1rem" width={{ base: "100%", md: "50%" }}>
          <FormControl isRequired isInvalid={errors.playerOneName !== undefined}>
            <FormLabel>Player One Name</FormLabel>
            <Input {...register("playerOneName", { required: "This is required." })} />
            <FormErrorMessage>{errors.playerOneName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={errors.playerTwoName !== undefined}>
            <FormLabel>Player Two Name</FormLabel>
            <Input {...register("playerTwoName", { required: "This is required." })} />
            <FormErrorMessage>{errors.playerTwoName?.message}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" marginTop=".5rem" disabled={!isValid}>
            Start Game
          </Button>
        </Grid> : <div>Start the game (coming soon)!</div>
      }
    </Flex>
  );
}

export default TicTacToe;
