import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'time', nullable: true })
  start_time: string | null;

  @Column({ type: 'time', nullable: true })
  end_time: string | null;

  @Column({ default: 'active' })
  status: string;

  @Column()
  type: string;
}
