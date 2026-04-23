import fs from 'fs'
import path from 'path'

export type QuizOption = {
  label: string
  text: string
}

export type JsQuestion = {
  number: number
  title: string
  code: string | null
  options: QuizOption[]
  answer: string
  explanation: string
}

export const QUESTIONS_PER_PAGE = 20

function parseExplanation(raw: string): string {
  // Remove the "#### Answer: X" line, strip HTML tags (except code), trim
  return raw
    .replace(/####\s+Answer:\s+[A-E]\n*/g, '')
    .replace(/<img[^>]*>/g, '')
    .replace(/<\/?[a-z][^>]*>/gi, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim()
}

function parseMarkdown(): JsQuestion[] {
  const filePath = path.join(process.cwd(), 'public', 'source', 'js-questions.md')
  const raw = fs.readFileSync(filePath, 'utf-8')
  // Normalize Windows CRLF to LF
  const content = raw.replace(/\r\n/g, '\n')

  // Split into blocks separated by "---" on its own line
  const blocks = content.split(/\n---\n/)

  const questions: JsQuestion[] = []

  for (const block of blocks) {
    const trimmed = block.trim()

    // A question block starts with ###### N.
    const headingMatch = trimmed.match(/^#{6}\s+(\d+)\.\s+(.+)/)
    if (!headingMatch) continue

    const number = parseInt(headingMatch[1], 10)
    const title = headingMatch[2].trim()

    // Extract code block (javascript or js)
    const codeMatch = trimmed.match(/```(?:javascript|js)\n([\s\S]*?)```/)
    const code = codeMatch ? codeMatch[1].trimEnd() : null

    // Extract options: lines like "- A: text"
    const optionMatches = [...trimmed.matchAll(/^-\s+([A-E]):\s+(.+)$/gm)]
    const options: QuizOption[] = optionMatches.map((m) => ({
      label: m[1],
      text: m[2].trim(),
    }))

    // Extract answer letter from <details> block
    const answerMatch = trimmed.match(/####\s+Answer:\s+([A-E])/)
    const answer = answerMatch ? answerMatch[1] : 'A'

    // Extract explanation: text between "#### Answer: X" and "</p>"
    const detailsMatch = trimmed.match(/<details[\s\S]*?<\/details>/i)
    let explanation = ''
    if (detailsMatch) {
      const innerMatch = detailsMatch[0].match(/<p>([\s\S]*?)<\/p>/i)
      if (innerMatch) {
        explanation = parseExplanation(innerMatch[1])
      }
    }

    questions.push({ number, title, code, options, answer, explanation })
  }

  return questions.sort((a, b) => a.number - b.number)
}

let _cache: JsQuestion[] | null = null

export function getAllJsQuestions(): JsQuestion[] {
  if (!_cache) {
    _cache = parseMarkdown()
  }
  return _cache
}

export function getJsQuestionsPage(page: number): JsQuestion[] {
  const all = getAllJsQuestions()
  const start = (page - 1) * QUESTIONS_PER_PAGE
  return all.slice(start, start + QUESTIONS_PER_PAGE)
}

export function getTotalPages(): number {
  const total = getAllJsQuestions().length
  return Math.ceil(total / QUESTIONS_PER_PAGE)
}
