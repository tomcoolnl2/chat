
import io from 'socket.io-client'
import { fromEvent, Observable } from 'rxjs'
import { ChatMessage } from '@sentia-chat/models'


export class SocketService {

	public static readonly PORT: string | number = process.env.PORT || 3333

	private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket

	public init(): SocketService {
		console.log('initiating socket service')
		this.socket = io.connect(`localhost:${SocketService.PORT}`, {transports: ['websocket']})
		return this
	}

	// send a message for the server to broadcast
	public send(message: ChatMessage): void {
		console.log('emitting message:  %o', message)
		this.socket.emit('message', message)
	}

	// link message event to rxjs data source
	public onMessage(): Observable<ChatMessage> {
		return fromEvent(this.socket, 'message')
	}

	// disconnect - used when unmounting
	public disconnect(): void {
		this.socket.disconnect()
	}
}
