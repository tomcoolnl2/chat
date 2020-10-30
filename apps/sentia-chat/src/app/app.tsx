
import React, { useEffect, useState } from 'react'
import { ChatContext, useChatContext } from '@sentia-chat/utils'
import { Message, ChatMessage, ChatState } from '@sentia-chat/models'


const initialState = {
  messages: [
    {
      message: 'Welcome! Type a message and press Send Message to continue the chat.',
      author: 'Bot'
    }
  ],
  input: ''
}

export const App = () => {

  const chatContext = useChatContext()

  const [ thread, setThread ] = useState<ChatState>(initialState)
  const [ m, setMessage ] = useState<Message>({ message: '' })


  useEffect(() => {

    fetch('/api').then(r => r.json()).then(setMessage)

    chatContext.init()

    const observable = chatContext.onMessage()
    observable.subscribe((chatMessage: ChatMessage) => {
      let messages = thread.messages;
      messages.push(chatMessage)
      setThread(state => {
        return {
          ...state,
          messages
        }
      })
    })

    return () => {
      chatContext.disconnect()
    }

  }, [])

  const updateInput = ({ target: { value: input } }: React.ChangeEvent<HTMLInputElement>): void => {
    setThread(state => {
      return {
        ...state,
        input
      }
    })
  }

  const handleMessage = (): void => {

    const author: string = 'Tom Cool'

    if (thread.input !== '') {

      chatContext.send({
        message: thread.input,
        author
      })

      setThread(state => {
        return {
          ...state,
          input: ''
        }
      })
    }
  }

  return (
    <div className="App">
      <p>{m.message}</p>
      {thread.messages &&
        <ol className="App-chatbox">
          {thread.messages.map((msg: ChatMessage, i: number) => {
            return (
              <li key={i}>
                <p>{msg.author}</p>
                <p>
                  {msg.message}
                </p>
              </li>
            )
          })}
        </ol>}
        <input
          className="App-Textarea"
          placeholder="Type your messsage here..."
          onChange={updateInput}
          value={thread.input}
        />
        <p>
          <button onClick={() => { handleMessage() }}>
            Send Message
          </button>
        </p>
      </div>
  )
}
