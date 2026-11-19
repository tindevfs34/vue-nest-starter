import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/modules/users/entities/user.entity';

/**
 * AuditLog — Lưu vết hoạt động và giám sát hệ thống (Monitoring & Audit - Lớp 8 ERD).
 */
@Entity('audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 36, nullable: true })
  @Index()
  userId: string | null;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User | null;

  @Column({ type: 'varchar', length: 100 })
  @Index()
  action: string;

  @Column({ name: 'target_id', type: 'varchar', length: 36, nullable: true })
  targetId: string | null;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string;

  @CreateDateColumn({ name: 'created_at' })
  @Index()
  createdAt: Date;
}
