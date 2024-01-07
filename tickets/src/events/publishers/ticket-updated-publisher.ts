import { Publisher, Subjects, TicketUpdatedEvent } from "@aspianet/ticketing-common-package";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}