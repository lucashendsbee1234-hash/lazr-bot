const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View XP leaderboard"),

    async execute(interaction) {

        const data =
            JSON.parse(
                fs.readFileSync("./data/xp.json")
            );

        const sorted =
            Object.entries(data)
            .sort(
                (a, b) =>
                    b[1].level - a[1].level ||
                    b[1].xp - a[1].xp
            )
            .slice(0, 10);

        let text = "";

        for (let i = 0; i < sorted.length; i++) {

            const [id, stats] = sorted[i];

            text +=
                `#${i + 1} <@${id}> — Level ${stats.level}\n`;
        }

        interaction.reply({
            content:
                `🏆 **Leaderboard**\n\n${text}`
        });
    }
};