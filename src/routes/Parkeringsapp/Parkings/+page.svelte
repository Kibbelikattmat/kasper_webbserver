<script lang="ts">
    export let data;

    async function startParking(event: Event) {
        // Prevent the default form submission
        event.preventDefault();

        const form = document.querySelector<HTMLFormElement>('#startParkingForm');
        
        if (!form) {
            console.error('Form element not found.');
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch('?/startParking', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to start parking');
            }

            location.reload();
        } catch (error) {
            console.error(error);
            alert('An error occurred while starting the parking.');
        }
    }

    async function endParking(parkingId: string) {
        const formData = new FormData();
        formData.append('id', parkingId);

        try {
            const response = await fetch('?/endParking', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to end parking');
            }
            location.reload();
        } catch (error) {
            console.error(error);
            alert('An error occurred while ending the parking.');
        }
    }
</script>

<div class="container">
    <a href="/Parkeringsapp/Veichles">Vehicles</a>
    <a href="/Parkeringsapp/Parkingspace">Parking Spaces</a>
    <a href="/Parkeringsapp/Parkings">Parkings</a>

    <h2>Start New Parking</h2>
    <form id="startParkingForm" on:submit={startParking}>
        <label>
            Select Vehicle:
            <select name="vehicleId" required>
                {#each data.vehicles as vehicle}
                    <option value={vehicle.id}>{vehicle.name}</option>
                {/each}
            </select>
        </label>

        <label>
            Select Parking Space:
            <select name="parkingSpaceId" required>
                {#each data.parkingSpaces as space}
                    <option value={space.id}>{space.location}</option>
                {/each}
            </select>
        </label>

        <label>
            Hourly Rate ($):
            <input name="hourlyRate" type="number" step="0.01" required>
        </label>

        <button type="submit">Start Parking</button>
    </form>

    <h2>Active Parkings</h2>
    <ul>
        {#each data.activeParkings as parking}
            <li>
                Vehicle: {parking.vehicle.name} <br/>
                Location: {parking.parkingSpace.location} <br/>
                Start Time: {new Date(parking.startTime).toLocaleString()} <br/>
                <button on:click={() => endParking(parking.id)}>End Parking</button>
            </li>
        {/each}
    </ul>

    <h2>Parking History</h2>
    <ul>
        {#each data.completedParkings as parking}
            <li>
                Vehicle: {parking.vehicle.name} <br/>
                Location: {parking.parkingSpace.location} <br/>
                Start Time: {new Date(parking.startTime).toLocaleString()} <br/>
                End Time: {new Date(parking.endTime).toLocaleString()} <br/>
                Total Cost: ${parking.totalCost.toFixed(2)}
            </li>
        {/each}
    </ul>
</div>

<style>
    a {
        margin-right: 10px;
        text-decoration: none;
        color: #007bff;
        font-weight: bold;
    }
    a:hover {
        text-decoration: underline;
    }

    form {
        margin: 20px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        max-width: 400px;
        background-color: #f9f9f9;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    input[type="number"], select {
        width: calc(100% - 10px);
        padding: 5px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    button {
        margin: 5px 0;
        padding: 6px 12px;
        border: none;
        border-radius: 4px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        font-size: 14px;
    }

    button:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
    }

    button:hover:not(:disabled) {
        background-color: #0056b3;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin: 10px 0;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fff;
        max-width: 400px;
    }

    li button {
        margin-right: 5px;
    }

    .container {
        max-width: 600px;
        margin: auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }
</style>
