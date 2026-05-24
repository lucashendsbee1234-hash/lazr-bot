const {
    Events,
    REST,
    Routes
} = require('discord.js');

const fs = require('fs');

module.exports = {
    name: Events.ClientReady,
    once: true,

    async execute(client) {

        console.log(`${client.user.tag} is online.`);

        const commands = [];

        const commandFolders = fs.readdirSync('./commands');

        for (const folder of commandFolders) {

            const commandFiles = fs
                .readdirSync(`./commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {

                const command = require(`../commands/${folder}/${file}`);

                commands.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' })
            .setToken(process.env.TOKEN);

        try {

            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );

            console.log('Slash commands registered.');

        } catch (error) {
            console.error(error);
        }
    }
};