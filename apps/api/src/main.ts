
import { ChatServer } from './app/ChatServer'
import { Message } from '@sentia-chat/models'


let app = new ChatServer().app

const greeting: Message = { message: 'Welcome to api!' }

app.get('/api', (req, res) => {
  res.send(greeting);
});

export { app }
