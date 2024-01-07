import { OrderCreatedEvent, Publisher, Subjects } from "@aspianet/ticketing-common-package";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}