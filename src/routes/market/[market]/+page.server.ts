import type { PageServerLoad } from './$types';
import { prisma } from '$lib/+index';

export const load: PageServerLoad = async ({ params }) => {
    const current_item = params.market;
    const items = await prisma.items.findUnique({
        where: { id: current_item },
        include: { messages: true }
    });

    const messages = items?.messages;

    return {
        market: messages,
        item_id: items?.id,
        item_name: items?.name,
        item_description: items?.description,
        item_price: items?.price
    };
};

export const actions = {
    New_bid: async ({ request, params }) => {
        const data = await request.formData();
        const bid = data.get('bid')?.toString() || '';

        let content = bid?.toString() ?? "lol";
        await prisma.bidding.create({ data: { content: content, itemid: params.market } });
    },

    accept_bid: async ({ request }) => {
        const data = await request.formData();
        const bid = data.get('bid')?.toString();
        const itemid = data.get('itemid')?.toString();

        if (itemid && bid) {
            await prisma.items.update({
                where: { id: itemid },
                data: { sold: true, sold_price: parseFloat(bid) }
            });

            return { success: true };
        }
    },

    reject_bid: async ({ request }) => {
        const data = await request.formData();
        const bid = data.get('bid')?.toString();
        const itemid = data.get('itemid')?.toString();

        await prisma.bidding.deleteMany({
            where: {
                content: bid,
                itemid: itemid
            }
        });

        return { success: true };
    }
};
