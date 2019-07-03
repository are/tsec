import { Predicate, its } from './Predicate'
import { SourcePosition, Stream, Token } from './types'
import { InputStream } from './InputStream'
import { COMMENT_CHAR, STRING_QUOTE_CHAR } from './consts'

class TokenStream implements Stream<Token> {
  private source: InputStream
  private currentToken: Token | null

  constructor(source: InputStream) {
    this.source = source
  }

  readToken(): Token | null {
    this.source.consumeWhile(its.whitespace)

    if (this.source.eof()) {
      // if source is exhausted, return null token
      return null
    }

    const start = this.source.getCurrentPosition()

    // first we want to skip comments until the end of the line
    this.handleComments()
    this.handleString()
  }

  handleString(): Token | null {
    if (this.source.peek() === STRING_QUOTE_CHAR) {
    }
  }

  handleComments(): Token | null {
    if (this.source.peek() === COMMENT_CHAR) {
      this.source.consumeWhile(its.not.newLine)
    }

    this.source.next() // lets skip the newline character
    return null
  }

  peek(): Token {
    if (!this.currentToken) {
      this.currentToken = this.readToken()
    }

    return this.currentToken
  }

  next(): Token {
    if (!this.currentToken) {
      this.currentToken = this.readToken()
    }

    const currentToken = this.currentToken
    this.currentToken = null

    return currentToken
  }

  eof(): boolean {
    return this.peek() === null
  }
}
