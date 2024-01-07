import { Publisher, Subjects, TicketCreatedEvent } from "@aspianet/ticketing-common-package";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}