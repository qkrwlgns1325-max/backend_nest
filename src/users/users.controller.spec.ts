import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  // Partial 어노테이션을 통해 테스트할 때 필요한 속성만 사용할 수 있도록 함
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'asdf@asdf.com', password: 'asdf' } as User);
      }, 
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdf' } as User])
      }, 
      // remove: () => {}, 
      // update: () => {}, 
    };
    fakeAuthService = {
      // signup: () => {}, 
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      }, 
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],   // UsersControoler 생성 시 UsersService 의존성 사용, 객체 제공
      providers: [
        {
          provide: UsersService, 
          useValue: fakeUsersService
        }, 
        {
          provide: AuthService, 
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers return a list of users with the given email', async () => {  // 컨트롤러 메서드 호출, 올바른 email 항목 하나가 있는지 확인   
    const users = await controller.findAllUsers('asdf@asdf.com');
    // 찾으려는 이메일과 같은지 확인
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  })

  it('findUser return a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = (id: number) => {
      return Promise.resolve(null);
    };
    await expect(controller.findUser('1')).rejects.toThrowError(NotFoundException);
  });

  it('signin update session object and return user', async () => {
    // 세션 객체 업데이트 및 사용자 반환
    const session = { userId: -10 }; 
    const user = await controller.signin({ email: 'asdf@asdf.com', password: 'asdf' }, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
