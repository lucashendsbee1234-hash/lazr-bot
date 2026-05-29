const {
    SlashCommandBuilder
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("resetlevel")
        .setDescription("Admin Only - Reset a user's level")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("User")
                .setRequired(true)
        ),

    async execute(interaction) {

        const user =
            interaction.options.getUser("user");

        const data =
            JSON.parse(
                fs.readFileSync("./data/xp.json")
            );

        data[user.id] = {
            xp: 0,
            level: 1
        };

        fs.writeFileSync(
            "./data/xp.json",
            JSON.stringify(data, null, 2)
        );

        interaction.reply(
            `🔄 Reset ${user}'s level.`
        );
    }
};