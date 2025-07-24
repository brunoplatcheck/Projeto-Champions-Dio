// services/players-services.ts
import { Player } from '@prisma/client'; // Importa o tipo Player do Prisma
import { CreatePlayerDTO, UpdatePlayerDetailsDTO, UpdatePlayerStatisticsDTO } from '../models/player-model'; // Importa os DTOs
import * as PlayerRepository from "../repositories/players-repository";
import * as HttpResponse from "../utils/http-helper";

export const getPlayerService = async () => {
  try {
    const players: Player[] = await PlayerRepository.findAllPlayers();

    if (players.length === 0) {
      return HttpResponse.noContent();
    }

    return HttpResponse.ok(players);
  } catch (error) {
    console.error("Error in getPlayerService:", error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while fetching players." });
  }
};

export const getPlayerByIdService = async (id: number) => {
  try {
    const player: Player | null = await PlayerRepository.findPlayerById(id);

    if (!player) {
      return HttpResponse.notFound({ message: `Player with ID ${id} not found.` });
    }

    return HttpResponse.ok(player);
  } catch (error) {
    console.error(`Error in getPlayerByIdService for ID ${id}:`, error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while fetching the player." });
  }
};

export const createPlayerService = async (playerData: CreatePlayerDTO) => {
  try {
    if (!playerData.name || !playerData.clubName || !playerData.nationality || !playerData.position || !playerData.statistics) {
      return HttpResponse.badRequest({ message: "Missing required player data." });
    }

    const newPlayer = await PlayerRepository.insertPlayer(playerData);
    return HttpResponse.created(newPlayer);
  } catch (error: any) {
    console.error("Error in createPlayerService:", error);
    if (error.code === 'P2002') { // Exemplo de tratamento de erro de unicidade do Prisma (se o schema for ajustado)
      return HttpResponse.badRequest({ message: "A player with similar unique data might already exist." });
    }
    return HttpResponse.internalServerError({ message: "Failed to create player." });
  }
};

export const deletePlayerService = async (id: number) => {
  try {
    const isDeleted = await PlayerRepository.deleteOnePlayer(id);

    if (isDeleted) {
      return HttpResponse.ok({ message: "Player deleted successfully." });
    } else {
      return HttpResponse.notFound({ message: `Player with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(`Error in deletePlayerService for ID ${id}:`, error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while deleting the player." });
  }
};

export const updatePlayerStatisticsService = async (
  id: number,
  statisticsData: UpdatePlayerStatisticsDTO
) => {
  try {
    if (!statisticsData || Object.keys(statisticsData).length === 0) {
      return HttpResponse.badRequest({ message: "Statistics data is empty." });
    }

    const updatedPlayer = await PlayerRepository.updatePlayerStatistics(id, statisticsData);

    if (!updatedPlayer) {
      return HttpResponse.notFound({ message: `Player with ID ${id} not found for statistics update.` });
    }

    return HttpResponse.ok(updatedPlayer);
  } catch (error) {
    console.error(`Error in updatePlayerStatisticsService for ID ${id}:`, error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while updating player statistics." });
  }
};

export const updatePlayerDetailsService = async (
  id: number,
  playerData: UpdatePlayerDetailsDTO
) => {
  try {
    if (!playerData || Object.keys(playerData).length === 0) {
      return HttpResponse.badRequest({ message: "No player details provided for update." });
    }

    const updatedPlayer = await PlayerRepository.updatePlayerDetails(id, playerData);

    if (!updatedPlayer) {
      return HttpResponse.notFound({ message: `Player with ID ${id} not found for details update.` });
    }

    return HttpResponse.ok(updatedPlayer);
  } catch (error) {
    console.error(`Error in updatePlayerDetailsService for ID ${id}:`, error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while updating player details." });
  }
};