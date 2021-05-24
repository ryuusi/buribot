import mineflayer from 'mineflayer'
import dotenv from 'dotenv'
import { getEvent } from './src/scrayping/getEvent.js';
import { mineflayer as mineflayerViewer } from 'prismarine-viewer'

dotenv.config()
const { HOST,USER_NAME,PASSWORD,EVENT_URL } = process.env

const bot = mineflayer.createBot({
  host: HOST,
  username: USER_NAME,
  password: PASSWORD
})

bot.on('chat', async(username, message) => {
  if (username === bot.username) return

  if(message === 'buri イベント'){
    let message = await getEvent(EVENT_URL).catch(err => { throw new Error(err.message) });
    bot.chat(message);
  }
  
})

bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true })
})

bot.on('kicked', console.log)
bot.on('error', console.log)