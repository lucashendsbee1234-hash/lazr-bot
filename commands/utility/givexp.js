const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("givexp")
        .setDescription("Admin Only - Give XP to a user")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("User")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("XP amount")
                .setRequired(true)
        ),

    async execute(interaction) {

        const user =
            interaction.options.getUser("user");

        const amount =
            interaction.options.getInteger("amount");

        const data =
            JSON.parse(
                fs.readFileSync("./data/xp.json")
            );

        if (!data[user.id]) {

            data[user.id] = {
                xp: 0,
                level: 1
            };
        }

        data[user.id].xp += amount;

        fs.writeFileSync(
            "./data/xp.json",
            JSON.stringify(data, null, 2)
        );

        interaction.reply(
            `✅ Added ${amount} XP to ${user}`
        );
    }
};