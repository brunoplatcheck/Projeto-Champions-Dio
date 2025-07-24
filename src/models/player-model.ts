// models/player-model.ts (DTOs para entrada de requisições)

// DTO para a criação de um jogador (Data Transfer Object)
// O ID não é incluído aqui, pois será gerado pelo banco de dados.
export interface CreatePlayerDTO {
  name: string;
  clubName: string; // Esperamos o nome do clube para conectar/criar
  nationality: string;
  position: string;
  statistics: {
    Overall: number; Pace: number; Shooting: number; Passing: number;
    Dribbling: number; Defending: number; Physical: number;
  };
}

// DTO para atualização de dados gerais do jogador (PATCH)
// Todas as propriedades são opcionais, pois você pode atualizar apenas algumas.
export interface UpdatePlayerDetailsDTO {
  name?: string;
  clubName?: string;
  nationality?: string;
  position?: string;
}

// DTO para atualização de estatísticas do jogador
// Similar ao StatisticsModel, mas aqui como DTO.
export interface UpdatePlayerStatisticsDTO {
  Overall: number;
  Pace: number;
  Shooting: number;
  Passing: number;
  Dribbling: number;
  Defending: number;
  Physical: number;
}