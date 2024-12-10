<script>
    import { enhance } from '$app/forms';

    export let data;

    let isFormValid = false;

    // Check form validity
    function validateForm() {
        const form = document.querySelector('form');
        // @ts-ignore
        const inputs = form.querySelectorAll('input');
        isFormValid = true; // Assume form is valid
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isFormValid = false; // If any input is empty, form is not valid
            }
        });

        // Find the button and check if it exists
        const button = document.querySelector('button');
        if (button) { // Check if the button exists to avoid null errors
            button.disabled = !isFormValid;
        }
    }
</script>

<form method="POST" action="?/Add_item" use:enhance on:input={validateForm}>
    <label>
        Create item name:
        <input name="Add item" type="text" on:input={validateForm} required>
    </label>

    <label>
        Description:
        <input name="Description" type="text" on:input={validateForm} required>
    </label>

    <label>
        Price:
        <input name="Price" type="number" on:input={validateForm} required>
    </label>

    <button disabled>Add Item</button> <!-- Button is initially disabled -->
</form>

<ul>
    {#each data.items.filter(item => !item.sold) as item}
        <li><a href="/market/{item.id}">Name: {item.name}---Description: {item.description}---Price: {item.price}$</a></li>
    {/each}
</ul>