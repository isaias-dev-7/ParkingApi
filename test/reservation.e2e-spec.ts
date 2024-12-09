import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Reservation (e2e)', () => {
    let app: INestApplication;
    let token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({email: 'mirta@gmail.com', password: 'Hithen=='})
            .expect(201);   

        token = loginResponse.body.token;
    });

    it('make reservation', async () => {
        const response = await request(app.getHttpServer())
            .post('/reservation')
            .set('Authorization', `Bearer ${token}`)
            .send({
                 car_registration:'1234ABD',
                 brand: "toyota",
                 color: "red",
                 date: "2024-12-6",
                 init_hour: "1293",
                 end_hour: "2323",
            })
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});