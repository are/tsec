import { Stream, SourcePosition } from './types'
import { NEWLINE_CHAR } from './consts'
import { Predicate } from './Predicate'

export class InputStream implements Stream<string> {
  private fileName: string
  private source: string
  private cursor: number = 0

  private line: number = 0
  private column: number = 0

  constructor(fileName: string, source: string) {
    this.fileName = fileName
    this.source = source
  }

  consumeWhile(predicate: Predicate<string>): string {
    let output = ''

    while (!this.eof() && predicate(this.peek())) {
      output += this.next()
    }

    return output
  }

  getCurrentPosition(): SourcePosition {
    return {
      line: this.line,
      column: this.column
    }
  }

  peek() {
    return this.source.charAt(this.cursor)
  }

  next() {
    const character = this.peek()

    this.cursor += 1

    if (character === NEWLINE_CHAR) {
      this.line += 1
      this.column = 0
    } else {
      this.column += 1
    }

    return character
  }

  eof() {
    return this.peek() === ''
  }

  croak(message: string) {
    throw new Error(`${message} (${this.fileName}:${this.line}:${this.column}).`)
  }
}
