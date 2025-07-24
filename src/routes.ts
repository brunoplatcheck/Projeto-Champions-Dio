// routes.ts
import { Router } from "express";
import * as PlayerController from "./controllers/players-controller";
import * as ClubsController from "./controllers/clubs-controller";

const router = Router();

// Rotas de Jogadores
router.get("/players", PlayerController.getPlayer);
router.post("/players", PlayerController.postPlayer);
router.delete("/players/:id", PlayerController.deletePlayer);
router.patch("/players/:id", PlayerController.updatePlayer); // Agora este PATCH é mais inteligente
router.get("/players/:id", PlayerController.getPlayerById);

// Rotas de Clubes
router.get("/clubs", ClubsController.getClubs);


export default router;