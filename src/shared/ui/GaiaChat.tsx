import { useState } from 'react'
import type { FormEvent } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'
import { HiSparkles } from 'react-icons/hi2'
import gaia from '../../assets/gaia.png'

type Message = {
  from: 'gaia' | 'user'
  text: string
}

const quickReplies = [
  'Necesito software a medida',
  'Quiero automatizar un proceso',
  'Conocer Gaia',
]

function getReply(message: string) {
  const normalized = message.toLowerCase()

  if (normalized.includes('gaia') || normalized.includes('factur')) {
    return 'Gaia será nuestro copiloto para facturación y gestión financiera. Está en desarrollo y puedes unirte a la lista de espera.'
  }

  if (normalized.includes('automat')) {
    return 'Podemos analizar tu proceso actual e identificar integraciones, automatizaciones e IA que reduzcan trabajo manual.'
  }

  if (normalized.includes('software') || normalized.includes('proyecto')) {
    return 'Excelente. Cuéntame qué proceso quieres mejorar, quiénes usarán la solución y cuál es el principal resultado esperado.'
  }

  return 'Puedo orientarte sobre desarrollo de software, integraciones, automatización o nuestro producto Gaia. ¿Qué reto quieres resolver?'
}

export function GaiaChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { from:'gaia', text:'Hola, soy Gaia. Puedo ayudarte a explorar nuestros servicios y orientar tu proyecto.' },
  ])

  const sendMessage = (text: string) => {
    const cleanText = text.trim()
    if (!cleanText) return

    setMessages(current => [
      ...current,
      { from:'user', text:cleanText },
      { from:'gaia', text:getReply(cleanText) },
    ])
    setInput('')
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-[70]">
      {open && (
        <section className="gaia-chat-panel mb-3 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/25" aria-label="Chat con Gaia">
          <header className="flex items-center justify-between bg-[#081525] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="gaia-chat-avatar overflow-hidden rounded-full border border-blue-300/30 bg-blue-950">
                <img src={gaia} alt="" className="h-full w-full object-cover" />
              </span>
              <div>
                <p className="text-sm font-black text-white">Gaia</p>
                <p className="flex items-center gap-1 text-[10px] text-blue-300"><HiSparkles /> Asistente de STARKTECH</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white" aria-label="Cerrar chat">
              <FiX />
            </button>
          </header>

          <div className="max-h-72 space-y-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <p className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.from === 'user' ? 'rounded-br-md bg-[#0099ff] text-white' : 'rounded-bl-md border border-slate-200 bg-white text-slate-600'}`}>
                  {message.text}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {quickReplies.map(reply => (
                <button key={reply} onClick={() => sendMessage(reply)} className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700 transition-colors hover:bg-blue-100">
                  {reply}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="flex gap-2">
              <input value={input} onChange={event => setInput(event.target.value)} placeholder="Escribe tu pregunta..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-xs outline-none transition-colors focus:border-blue-400" />
              <button className="flex w-10 items-center justify-center rounded-xl bg-[#0099ff] text-white transition-colors hover:bg-blue-600" aria-label="Enviar mensaje"><FiSend /></button>
            </form>
          </div>
        </section>
      )}

      <button onClick={() => setOpen(current => !current)} className="ml-auto flex items-center gap-3 rounded-full border border-blue-300/20 bg-[#0b2037] p-2.5 pr-4 text-white shadow-xl shadow-slate-950/30 transition-transform hover:-translate-y-1" aria-expanded={open} aria-label={open ? 'Cerrar chat con Gaia' : 'Abrir chat con Gaia'}>
        <span className="gaia-chat-avatar overflow-hidden rounded-full border border-blue-300/30 bg-blue-950">
          <img src={gaia} alt="" className="h-full w-full object-cover" />
        </span>
        <span className="text-left"><span className="block text-xs font-black">Habla con Gaia</span><span className="block text-[9px] text-blue-300">¿En qué podemos ayudarte?</span></span>
        <FiMessageCircle className="ml-1 text-blue-300" />
      </button>
    </div>
  )
}
