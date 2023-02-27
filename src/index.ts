import * as dotenv from 'dotenv'
import {Client, Events, GatewayIntentBits} from 'discord.js'
dotenv.config()

// Create a new client instance
const client = new Client({intents: [GatewayIntentBits.Guilds]})

/* Register a listener for the ClientReady event.
 This event is emitted when the client is ready to start interacting with the Discord API. */
client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`)
})

// Log in to Discord with your client's token
client.login(process.env.TOKEN)
