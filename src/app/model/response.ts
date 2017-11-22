import { User } from './user';

export class Response {
  constructor(
    public page?: number,
    public perPage?: number,
    public total?: number,
    public totalPages?: number,
    public users?: User[]
  ) {}

}
