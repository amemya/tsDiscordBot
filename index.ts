import { Client, GatewayIntentBits } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'

import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

const discord_bot_token = process.env.DISCORD_BOT_TOKEN
const prefix = '!'

client.on('clientReady', () => {
    console.log('discord bot is ready!')
    setInterval(() => {
        client.user?.setActivity({
            name: `ping: ${client.ws.ping}ms`
        })
    }, 10000)
})

client.login(discord_bot_token)
