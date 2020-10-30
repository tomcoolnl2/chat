
import { Context, createContext, useContext } from 'react'
import { SocketService } from './SocketService'


export const ChatContext: Context<SocketService> = createContext(new SocketService())

export const useChatContext = () => useContext(ChatContext)
