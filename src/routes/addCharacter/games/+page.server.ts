import { prisma } from '$lib/+index';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const characters = await prisma.character.findMany();
    return { characters };
};

export const actions: Actions = {
    battle: async ({ request }) => {
        const data = await request.formData();
        const character1Id = data.get('character1')?.toString();
        const character2Id = data.get('character2')?.toString();

        if (!character1Id || !character2Id) {
            return { status: 400, body: { error: 'Characters not selected' } };
        }

        // Check if the same character is selected for both slots
        if (character1Id === character2Id) {
            return { status: 400, body: { error: 'Please select two different characters for the battle.' } };
        }

        const char1 = await prisma.character.findUnique({ where: { id: character1Id } });
        const char2 = await prisma.character.findUnique({ where: { id: character2Id } });

        if (!char1 || !char2) {
            return { status: 400, body: { error: 'Characters not found' } };
        }

        // Randomly determine the winner
        const winner = Math.random() < 0.5 ? char1 : char2;
        const loser = winner.id === char1.id ? char2 : char1;

        // Update winner's stats
        await prisma.character.update({
            where: { id: winner.id },
            data: {
                wins: winner.wins + 1,
                currentWinStreak: winner.currentWinStreak + 1,
                highestWinStreak: Math.max(winner.highestWinStreak, winner.currentWinStreak + 1),
                winRate: ((winner.wins + 1) / (winner.wins + winner.losses + 1)) * 100
            }
        });

        // Update loser's stats
        await prisma.character.update({
            where: { id: loser.id },
            data: {
                losses: loser.losses + 1,
                currentWinStreak: 0,
                winRate: (loser.wins / (loser.wins + loser.losses + 1)) * 100
            }
        });

        // Return the winner's name as part of the result
        return { status: 200, body: { winner: { name: winner.name } } };
    }
};
