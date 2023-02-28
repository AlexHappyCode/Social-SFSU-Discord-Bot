import fs from 'node:fs'
import path from 'node:path'
import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  InteractionType,
  Message,
  REST,
  Routes,
} from 'discord.js'
import * as dotenv from 'dotenv'

dotenv.config()

// load the command files from the commands folder
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith('.js') || file.endsWith('.ts'))

// Create a new collection for the commands
const commands = new Collection<string, any>()
const commands_JSON = []

for (const file of commandFiles) {
  // load the command from the command file
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  // store the command in the collection
  commands.set(command.data.name, command)

  // store the json representation of the command in the array
  commands_JSON.push(command.data.toJSON())
  console.log(`Loaded command ${command.data.name} from ${filePath}`)
}

// push the commands to the discord api
new REST({version: '10'})
  .setToken(process.env.TOKEN || '')
  .put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID || '',
      process.env.GUILD_ID || '',
    ),
    {body: commands_JSON},
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error)

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]})

/* Register a listener for the ClientReady event.
 This event is emitted when the client is ready to start interacting with the Discord API. */
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN)
