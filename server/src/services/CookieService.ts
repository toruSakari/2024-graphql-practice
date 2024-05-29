import { injectable } from "inversify"

@injectable()
export class CookieService {

  constructor() { }

  public getAll(req: Request) {
    return req.cookieStore?.get()
  }

  public get(req: Request, key: string) {
    return req.cookieStore?.get(key)
  }

  public set(req: Request, key: string, value: string) {
    return req.cookieStore?.set(key, value)
  }

  public delete(req: Request, key: string) {
    return req.cookieStore?.delete(key)
  }
}
