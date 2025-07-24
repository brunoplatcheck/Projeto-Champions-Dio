// controllers/players-controller.ts
import { Request, Response } from 'express';
import * as playerService from '../services/players-services';
import { CreatePlayerDTO, UpdatePlayerDetailsDTO, UpdatePlayerStatisticsDTO } from '../models/player-model';

export const getPlayer = async (req: Request, res: Response) => {
  const result = await playerService.getPlayerService();
  res.status(result.statusCode).json(result.body);
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid player ID." });
  }
  const result = await playerService.getPlayerByIdService(id);
  res.status(result.statusCode).json(result.body);
};

export const postPlayer = async (req: Request, res: Response) => {
  const playerData: CreatePlayerDTO = req.body; // Assume que o corpo da requisição corresponde ao DTO
  const result = await playerService.createPlayerService(playerData);
  res.status(result.statusCode).json(result.body);
};

export const deletePlayer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid player ID." });
  }
  const result = await playerService.deletePlayerService(id);
  res.status(result.statusCode).json(result.body);
};

// Este endpoint PATCH agora pode lidar com atualização de estatísticas OU de detalhes do jogador
export const updatePlayer = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid player ID." });
  }

  const updateData = req.body;

  if (updateData.statistics) {
    // Se o corpo da requisição tem um campo 'statistics', assume que é uma atualização de estatísticas
    const statisticsData: UpdatePlayerStatisticsDTO = updateData.statistics;
    const result = await playerService.updatePlayerStatisticsService(id, statisticsData);
    return res.status(result.statusCode).json(result.body);
  } else {
    // Caso contrário, assume que é uma atualização de detalhes do jogador
    const playerData: UpdatePlayerDetailsDTO = updateData;
    const result = await playerService.updatePlayerDetailsService(id, playerData);
    return res.status(result.statusCode).json(result.body);
  }
};