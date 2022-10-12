import { User } from './user.model'
import { Ticket } from './ticket.model'

export class Gain {
  id: any ;
  taux: string;
  libelle: string;
  date: Date;
  reception: number;
  gagnant:number;
  user: User = new User();
  ticket: Ticket = new Ticket();
  ticketId: any;
  userId: any;
}
