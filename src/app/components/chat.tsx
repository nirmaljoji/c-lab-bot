'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { createClient } from '@supabase/supabase-js'
import { FunctionsHttpError } from '@supabase/supabase-js'


interface Message {
  role: 'user' | 'bot';
  content: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function Chat() {

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL and/or anon key are not defined')
  }
  
  const [input, setInput] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])

  const chatParent = useRef<HTMLUListElement>(null)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    if (input.trim() === '') return

    const inputJson = {
      query: input
    }

    console.log(JSON.stringify(inputJson));

    const userMessage: Message = { role: 'user', content: input }
    setMessages([...messages, userMessage])

    const { data, error } = await supabase.functions.invoke( "check", {
      body: JSON.stringify(inputJson)
    })

    if (error && error instanceof FunctionsHttpError) {
      const errorMessage = await error.context.json()
      console.log('Function returned an error', errorMessage)
    }
    if (error) {
        alert(error.message)
    } else {
        const botMessage: Message = { role: 'bot', content: data || '' }
        setMessages((prevMessages) => [...prevMessages, botMessage])
    }

    setInput('')
  }

  useEffect(() => {
    const domNode = chatParent.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  }, [messages])

  return (
    <main className="flex flex-col w-full h-screen max-h-dvh bg-background">
      <header className="p-4 border-b w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold">AI Chat</h1>
      </header>

      <section className="p-4">
        <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto items-center">
          <Input
            className="flex-1 min-h-[40px]"
            placeholder="Type your question here..."
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          <Button className="ml-2" type="submit">
            Submit
          </Button>
        </form>
      </section>

      <section className="container px-0 pb-10 flex flex-col flex-grow gap-4 mx-auto max-w-3xl">
        <ul
          ref={chatParent}
          className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
        >
          {messages.map((m, index) => (
            <>
              {m.role === 'user' ? (
                <li key={index} className="flex flex-row">
                  <div className="rounded-xl p-4 bg-background shadow-md flex">
                    <p className="text-primary">{m.content}</p>
                  </div>
                </li>
              ) : (
                <li key={index} className="flex flex-row-reverse">
                  <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                    <p className="text-primary">
                      <span className="font-bold">Answer: </span>
                      {m.content}
                    </p>
                  </div>
                </li>
              )}
            </>
          ))}
        </ul>
      </section>
    </main>
  )
}
