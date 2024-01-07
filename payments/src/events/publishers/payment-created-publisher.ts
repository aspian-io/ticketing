import { PaymentCreatedEvent, Publisher, Subjects } from "@aspianet/ticketing-common-package";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}