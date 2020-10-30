
import { ChatMessage } from './chat-message'


export interface ChatState {
  input: string
  messages: ChatMessage[]
}
