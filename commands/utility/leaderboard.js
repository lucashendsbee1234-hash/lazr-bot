const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View the server XP leaderboard"),

    async execute(interaction) {

        const data = JSON.parse(
            fs.readFileSync("./data/xp.json")
        );

        const sorted = Object.entries(data)
            .sort(
                (a, b) =>
                    b[1].level - a[1].level ||
                    b[1].xp - a[1].xp
            )
            .slice(0, 10);

        let leaderboard = "";

        sorted.forEach(([id, stats], index) => {

            let medal = "🔹";

            if (index === 0) medal = "🥇";
            if (index === 1) medal = "🥈";
            if (index === 2) medal = "🥉";

            leaderboard +=
                `${medal} **#${index + 1}** <@${id}>\n` +
                `↳ Level **${stats.level}** • ${stats.xp} XP\n\n`;
        });

        const embed = new EmbedBuilder()
            .setColor("#a855f7")
            .setTitle("🏆 LazR Hub Leaderboard")
            .setDescription(
                leaderboard || "No leaderboard data yet."
            )
            .setFooter({
                text: "Keep chatting to earn XP!"
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};