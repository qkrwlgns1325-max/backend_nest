import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecryptController } from './decrypt.controller';
import { DecryptService } from './decrypt.service';
import { Decrypt } from './decrypt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Decrypt])],
  controllers: [DecryptController],
  providers: [DecryptService],
})
export class DecryptModule {}
