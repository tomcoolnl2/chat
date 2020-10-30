

import { createServer, Server } from 'http'
import * as express from 'express'
import * as socketIo from 'socket.io'
import * as cors from 'cors'

import { ChatEvent } from '@sentia-chat/models'
import { ChatMessage } from '@sentia-chat/models'


export class ChatServer {

	public static readonly PORT: number = 3333

	private _app: express.Application
	private server: Server
	private io: SocketIO.Server
	private port: string | number

	constructor () {

		this._app = express()
		this.port = process.env.PORT || ChatServer.PORT

		this._app.use(cors())
		this._app.options('*', cors())

		this.server = createServer(this._app)

		this.initSocket()
		this.listen()
	}

	get app(): express.Application {
		return this._app
	}

	private initSocket(): void {
		this.io = socketIo(this.server)
	}

	private listen(): void {

		this.server.listen(this.port, () => {
			console.log('Running server on port %s', this.port)
		})

		this.io.on(ChatEvent.CONNECT, (socket: SocketIO.Socket) => {

			console.log('Connected client on port %s.', this.port)

			socket.on(ChatEvent.MESSAGE, (chatMessage: ChatMessage) => {
				console.log('[server](message): %s', JSON.stringify(chatMessage))
				this.io.emit('message', chatMessage)
			})

			socket.on(ChatEvent.DISCONNECT, () => {
				console.log('Client disconnected')
			})
		})
	}
}
