// services/clubs-services.ts
import * as HttpResponse from "../utils/http-helper";
import * as repository from "../repositories/clubs-repository";
import { Club } from '@prisma/client'; // Importa o tipo Club do Prisma

export const getClubService = async () => {
  try {
    const clubs: Club[] = await repository.findAllClubs();

    if (clubs.length === 0) {
      return HttpResponse.noContent();
    }

    return HttpResponse.ok(clubs);
  } catch (error) {
    console.error("Error in getClubService:", error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while fetching clubs." });
  }
};

export const getClubByIdService = async (id: number) => {
  try {
    const club: Club | null = await repository.findClubById(id);

    if (!club) {
      return HttpResponse.notFound({ message: `Club with ID ${id} not found.` });
    }

    return HttpResponse.ok(club);
  } catch (error) {
    console.error(`Error in getClubByIdService for ID ${id}:`, error);
    return HttpResponse.internalServerError({ message: "An unexpected error occurred while fetching the club." });
  }
};

// Exemplo de serviço para criar um clube (se precisar de um endpoint POST para clubes)
export const createClubService = async (clubName: string) => {
  try {
    if (!clubName) {
      return HttpResponse.badRequest({ message: "Club name is required." });
    }
    const newClub = await repository.insertClub({ name: clubName });
    return HttpResponse.created(newClub);
  } catch (error: any) {
    if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
      return HttpResponse.badRequest({ message: `Club with name '${clubName}' already exists.` });
    }
    console.error("Error in createClubService:", error);
    return HttpResponse.internalServerError({ message: "Failed to create club." });
  }
};