<script>
    import { enhance } from '$app/forms';

    export let data;
</script>


<form method="POST" action="?/New" use:enhance>
    <label>
        New Forum
        <input name="forum_name" type="text">
    </label>
    <button>Create</button>
</form>

{#each data.forums as forum}
    <li><a href="/forums/{forum.id}">{forum.name}</a></li>
{/each}