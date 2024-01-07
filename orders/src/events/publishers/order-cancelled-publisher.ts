import { OrderCancelledEvent, Publisher, Subjects } from "@aspianet/ticketing-common-package";
import { Order } from "../../models/order";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}