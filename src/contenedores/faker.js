import { faker } from '@faker-js/faker';
faker.locale = "es"

export default function generateId (){
    let id = faker.random.alpha(10)
    return id
}

generateId()