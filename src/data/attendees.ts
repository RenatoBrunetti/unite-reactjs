import { faker } from "@faker-js/faker";
import { Attendee } from "../type/attendee";

export const attendees: Attendee[] = Array.from({ length: 200 }).map(() => ({
  id: faker.string.uuid(),
  code: faker.number.int({ min: 10000, max: 20000 }),
  name: faker.person.fullName(),
  email: faker.internet.email().toLocaleLowerCase(),
  createdAt: faker.date.recent({ days: 30 }),
  checkedInAt: faker.date.recent({ days: 7 }),
}));
