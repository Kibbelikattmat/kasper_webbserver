import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/+index';

export const load = (async ({ params }) => {
    let current_forum = params.forum;
    let forum = await prisma.forum.findUnique({
        where:{id: current_forum}, 
        include: {messages:true}
    })

    let messages = forum?.messages

    return { 
        messages: messages,
        forum_name: forum?.name
    };
}) satisfies PageServerLoad;

export const actions = {
    New_message: async ({request, params}) => {
        const data = await request.formData();

        const message = data.get("message")?.toString()

        let content = message?.toString()??"lol"
        await prisma.message.create({ data: {content: content, forumId: params.forum} })
    }
}