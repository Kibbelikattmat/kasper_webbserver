<script lang="ts">
    export let data: { character: { name: string, picture: string, description: string, winRate?: number, highestWinStreak?: number, currentWinStreak?: number } };
    const { character } = data;
</script>

<style>
    .character-page {
        max-width: 800px;
        margin: 20px auto;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
    }

    .character-page img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .character-page h1 {
        font-size: 2rem;
        margin-bottom: 10px;
    }

    .character-page p {
        font-size: 1.2rem;
        margin-bottom: 15px;
    }

    .character-page .stats {
        margin-top: 20px;
        font-size: 1.1rem;
    }

    .character-page .stats div {
        margin-bottom: 10px;
    }
</style>

<div class="character-page">
    <img src={character.picture} alt={character.name} />
    <h1>{character.name}</h1>
    <p>{character.description}</p>

    <div class="stats">
        <div><strong>Win Rate:</strong> {character.winRate ? character.winRate + '%' : 'N/A'}</div>
        <div><strong>Highest Win Streak:</strong> {character.highestWinStreak ?? 'N/A'}</div>
        <div><strong>Current Win Streak:</strong> {character.currentWinStreak ?? 'N/A'}</div>
        <div><strong>Wins:</strong> {character.wins ?? 'N/A'}</div>
        <div><strong>Losses:</strong> {character.losses ?? 'N/A'}</div>
    </div>
</div>
