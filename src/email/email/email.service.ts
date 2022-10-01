import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {


    async send(){
        try {
            
            return true;
        } catch (error) {
            return false;
        }
    }
}
