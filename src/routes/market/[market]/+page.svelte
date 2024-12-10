<script>
    import { goto } from '$app/navigation';
    import { enhance } from '$app/forms';

    export let data;

    // @ts-ignore
    async function acceptBid(bid, itemid) {
        if (!itemid) return;

        if (confirm(`${data.item_name} has been sold for ${bid}$`)) {
            const formData = new FormData();
            formData.append('bid', bid);
            formData.append('itemid', itemid);

            const response = await fetch(`/market/${itemid}?/accept_bid`, { 
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                goto('/market');
            }
        }
    }

    // @ts-ignore
    async function rejectBid(bid, itemid) {
        if (!itemid) return;

        const formData = new FormData();
        formData.append('bid', bid);
        formData.append('itemid', itemid);

        const response = await fetch(`/market/${itemid}?/reject_bid`, { 
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            location.reload();
        }
    }
</script>

<h1>Welcome to the bidding of {data.item_name} --- Description: {data.item_description} --- Price: {data.item_price}$</h1>

<form method="POST" action="?/New_bid" use:enhance> 
    <label>
        Enter a price ($):
        <input name="bid" type="number">
    </label>

    <button>Place bid</button> 
</form>

<ul>
    {#each (data.market ?? []) as message}
        <li>
            {message.content}$
            <button on:click={() => acceptBid(message.content, data.item_id)}>Accept</button>
            <button on:click={() => rejectBid(message.content, data.item_id)}>Reject</button>
        </li>
    {/each}
</ul>
