import { ExpirationCompleteEvent, Publisher, Subjects } from "@aspianet/ticketing-common-package";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}