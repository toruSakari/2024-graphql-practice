import { injectable } from "inversify";
import { hashSync, compareSync, genSaltSync } from 'bcrypt'

@injectable()
export class HashService {
  private saltRound = 10;

  hash(password: string) {
    const salt = genSaltSync(this.saltRound)
    return hashSync(password, salt)
  }

  compare(password: string, hash: string) {
    return compareSync(password, hash)
  }
}
