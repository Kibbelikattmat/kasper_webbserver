import { prisma } from '$lib/+index';
import { promises as fs } from 'fs';
import path from 'path';
import type { Actions, PageServerLoad } from './$types';

const UPLOAD_DIR = 'static/uploads';

export const load: PageServerLoad = async () => {
    const characters = await prisma.character.findMany();
    return { characters };
};

export const actions: Actions = {
    addCharacter: async ({ request }) => {
        const data = await request.formData();

        const name = data.get('name')?.toString() ?? 'Unnamed';
        const description = data.get('description')?.toString() ?? 'No description';

        // Handle the image upload
        const pictureFile = data.get('picture') as File;
        let picturePath = '';
        let fileName = '';

        if (pictureFile && pictureFile.size > 0) {
            const uploadDirAbsolutePath = path.resolve(UPLOAD_DIR);
            try {
                await fs.mkdir(uploadDirAbsolutePath, { recursive: true });
            } catch (err) {
                console.error('Error creating upload directory', err);
                throw new Error('Failed to create upload directory');
            }

            fileName = `${Date.now()}_${pictureFile.name}`;
            picturePath = path.join(UPLOAD_DIR, fileName);

            try {
                await fs.writeFile(path.resolve(picturePath), Buffer.from(await pictureFile.arrayBuffer()));
            } catch (err) {
                console.error('Error saving file', err);
                throw new Error('Failed to save uploaded file');
            }
        }

        // Save the character with the image path
        await prisma.character.create({
            data: {
                name: name,
                description: description,
                picture: picturePath ? `/uploads/${fileName}` : null,
                winRate: 50.0,
                highestWinStreak: 0,
                currentWinStreak: 0
                
            }
        });

        return { success: true };
    }
};
