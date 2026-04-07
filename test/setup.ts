import { rm } from 'fs/promises';
import { join } from 'path';
import { getConnection } from 'typeorm';

// 모든 spec 파일에서 각 테스트를 수행하기 전에 실행
// DB 초기화
global.beforeEach(async () => {
  try {
    await rm(join(__dirname, '..', 'test.sqlite'));
  } catch (err) {}
});

global.afterEach(async () => {
  const conn = getConnection();
  await conn.close();
});
