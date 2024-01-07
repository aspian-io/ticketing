import { Listener, Subjects, TicketCreatedEvent } from "@aspianet/ticketing-common-package";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage ( data: TicketCreatedEvent[ 'data' ], msg: Message ) {
    const { id, title, price } = data;
    const ticket = Ticket.build( { id, title, price } );
    await ticket.save();

    msg.ack();
  }
}