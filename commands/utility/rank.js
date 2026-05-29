const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("View your rank"),

    async execute(interaction) {

        const data =
            JSON.parse(
                fs.readFileSync("./data/xp.json")
            );

        const user =
            data[interaction.user.id];

        if (!user) {

            return interaction.reply({
                content: "No XP yet.",
                ephemeral: true
            });
        }

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Rank`)
            .addFields(
                {
                    name: "Level",
                    value: `${user.level}`,
                    inline: true
                },
                {
                    name: "XP",
                    value: `${user.xp}`,
                    inline: true
                }
            );

        interaction.reply({
            embeds: [embed]
        });
    }
};