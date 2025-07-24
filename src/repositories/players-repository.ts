// repositories/players-repository.ts
import { PrismaClient, Player, Statistics } from '@prisma/client';
import { CreatePlayerDTO, UpdatePlayerDetailsDTO, UpdatePlayerStatisticsDTO } from '../models/player-model'; // Importa os DTOs para tipagem de entrada

const prisma = new PrismaClient();

export const findAllPlayers = async (): Promise<Player[]> => {
  const players = await prisma.player.findMany({
    include: {
      statistics: true, // Inclui o objeto Statistics relacionado
      club: true,       // Inclui o objeto Club relacionado
    },
  });
  return players;
};

export const findPlayerById = async (id: number): Promise<Player | null> => {
  const player = await prisma.player.findUnique({
    where: { id: id },
    include: {
      statistics: true,
      club: true
    },
  });
  return player;
};

export const insertPlayer = async (playerData: CreatePlayerDTO): Promise<Player> => {
  const newPlayer = await prisma.player.create({
    data: {
      name: playerData.name,
      nationality: playerData.nationality,
      position: playerData.position,
      club: {
        connectOrCreate: {
          where: { name: playerData.clubName },
          create: { name: playerData.clubName },
        },
      },
      statistics: {
        create: playerData.statistics,
      },
    },
    include: { statistics: true, club: true },
  });
  return newPlayer;
};

export const deleteOnePlayer = async (id: number): Promise<boolean> => {
  try {
    // Deleta as estatísticas antes de deletar o jogador se não houver CASCADE DELETE no schema
    await prisma.statistics.deleteMany({
      where: { playerId: id },
    });

    const result = await prisma.player.delete({
      where: { id: id },
    });
    return !!result;
  } catch (error) {
    console.error(`Error deleting player with ID ${id}:`, error);
    return false;
  }
};

export const updatePlayerStatistics = async (
  id: number,
  statisticsData: UpdatePlayerStatisticsDTO // Usando o DTO para o que esperamos receber
): Promise<Player | null> => {
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: id },
      data: {
        statistics: {
          upsert: {
            create: statisticsData, // Cria se não existir
            update: statisticsData, // Atualiza se existir
          },
        },
      },
      include: { statistics: true, club: true },
    });
    return updatedPlayer;
  } catch (error) {
    console.error(`Error updating player statistics for ID ${id}:`, error);
    return null;
  }
};

export const updatePlayerDetails = async (
  id: number,
  playerData: UpdatePlayerDetailsDTO // Usando o DTO para os detalhes do jogador
): Promise<Player | null> => {
  try {
    const updatedPlayer = await prisma.player.update({
      where: { id: id },
      data: {
        name: playerData.name,
        nationality: playerData.nationality,
        position: playerData.position,
        ...(playerData.clubName && { // Atualiza o clube apenas se clubName for fornecido
          club: {
            connectOrCreate: {
              where: { name: playerData.clubName },
              create: { name: playerData.clubName },
            },
          },
        }),
      },
      include: { statistics: true, club: true },
    });
    return updatedPlayer;
  } catch (error) {
    console.error(`Error updating player details for ID ${id}:`, error);
    return null;
  }
};