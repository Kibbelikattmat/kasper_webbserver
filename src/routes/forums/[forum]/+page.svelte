<script>
    import { enhance } from '$app/forms';

    export let data;
</script>


<h1>Welcome to {data.forum_name}</h1>

<form method="POST" action="?/New_message" use:enhance>
    <label>
        New Message
        <input name="message" type="text">
    </label>
    <button>Send</button>
</form>

{#each (data.messages ?? []) as message}
    <p>{message.content}</p>
{/each}