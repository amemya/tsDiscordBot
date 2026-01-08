import { REST, Routes } from 'discord.js'
import type { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord-api-types/v10'
import fs from 'node:fs'
import dotenv from 'dotenv'

dotenv.config()

const discord_bot_token = process.env.DISCORD_BOT_TOKEN!
const clientID = process.env.CLIENT_ID!
const guildID = process.env.GUILD_ID!

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
const commandFiles = fs.readdirSync('./commands').filter((file: string) => file.endsWith('.ts'))

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(discord_bot_token);

(async () => {
    try {
        console.log(`${commands.length} commands to deploy`)

        const data = await rest.put(
            Routes.applicationCommands(clientID),
            { body: commands },
        )
        console.log(`${commands.length} commands deployed`)
    } catch (error) {
        console.error(error)
    }
})()