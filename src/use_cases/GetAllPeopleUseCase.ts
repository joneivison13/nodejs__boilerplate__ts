import { Database } from "../infra/database";

export default class GetAllPeopleUseCase {
  async execute() {
    const people = await Database.person.findMany({
      include: {
        Address: true,
      },
    });
    return people;
  }
}
