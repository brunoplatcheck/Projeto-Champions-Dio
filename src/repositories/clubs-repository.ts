// repositories/clubs-repository.ts
import { PrismaClient, Club } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllClubs = async (): Promise<Club[]> => {
  const clubs = await prisma.club.findMany();
  return clubs;
};

export const findClubById = async (id: number): Promise<Club | null> => {
  const club = await prisma.club.findUnique({
    where: { id: id },
  });
  return club;
};

export const insertClub = async (clubData: { name: string }): Promise<Club> => {
  const newClub = await prisma.club.create({
    data: { name: clubData.name },
  });
  return newClub;
};

export const updateClub = async (id: number, clubData: { name: string }): Promise<Club | null> => {
  try {
    const updatedClub = await prisma.club.update({
      where: { id: id },
      data: { name: clubData.name },
    });
    return updatedClub;
  } catch (error) {
    console.error(`Error updating club with ID ${id}:`, error);
    return null; // Retorna null se não encontrar ou outro erro ocorrer
  }
};

export const deleteClub = async (id: number): Promise<boolean> => {
  try {
    // Nota: Se houver jogadores associados a este clube, e você não tiver
    // CASCADE DELETE configurado no seu schema.prisma, esta operação falhará
    // até que os jogadores sejam deletados ou reassociados.
    await prisma.club.delete({
      where: { id: id },
    });
    return true;
  } catch (error) {
    console.error(`Error deleting club with ID ${id}:`, error);
    return false; // Retorna false se não encontrar ou outro erro ocorrer
  }
};