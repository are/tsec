export type Predicate<T> = (value: T) => boolean
export type Mapper<I, O> = (value: I) => O

export class Its {
  private mapper: Mapper<boolean, boolean>

  constructor(mapper: Mapper<boolean, boolean>) {
    this.mapper = mapper
  }

  private map(predicate: Predicate<string>): Predicate<string> {
    return (value: string) => this.mapper(predicate(value))
  }

  get whitespace(): Predicate<string> {
    return this.map(value => ' \t\n'.indexOf(value) >= 0)
  }

  get newLine(): Predicate<string> {
    return this.map(value => value === '\n')
  }

  get not(): Its {
    return new Its(x => !this.mapper(x))
  }
}

export const its = new Its(x => x)
