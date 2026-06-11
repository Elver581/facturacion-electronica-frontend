import { useEffect, useState } from 'react'

type TypewriterTextProps = {
  words: string[]
  className?: string
}

export function TypewriterText({ words, className = '' }: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[wordIndex]
    const complete = text === word
    const empty = text.length === 0
    const delay = complete ? 1800 : deleting ? 45 : 75

    const timeout = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true)
        return
      }

      if (empty && deleting) {
        setDeleting(false)
        setWordIndex(current => (current + 1) % words.length)
        return
      }

      setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [deleting, text, wordIndex, words])

  return (
    <span className={`typewriter-line ${className}`} aria-label={words[wordIndex]}>
      <span>{text}</span><span className="typewriter-cursor" aria-hidden="true">|</span>
    </span>
  )
}
