export interface Stream<T> {
  next: () => T
  peek: () => T
  eof: () => boolean
  croak?: (message: string) => void
}

export interface SourcePosition {
  line: number
  column: number
}

export enum TokenType {}

export interface Token {
  type: TokenType
  source: string
  start: SourcePosition
  end: SourcePosition
}
