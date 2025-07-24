// controllers/clubs-controller.ts
import { Request, Response } from 'express';
import * as clubService from '../services/clubs-services';

export const getClubs = async (req: Request, res: Response) => {
  const result = await clubService.getClubService();
  res.status(result.statusCode).json(result.body);
};

export const getClubById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // Certifique-se de que o ID é um número
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid club ID." });
  }
  const result = await clubService.getClubByIdService(id);
  res.status(result.statusCode).json(result.body);
};

