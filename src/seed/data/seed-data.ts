
interface SeedUser {

    fullname: string;

    email: string; 

    password: string;

    phone_number: string;

    roles?: string[];

}

interface SeedData {
    
    users: SeedUser[];
}

export const initialData: SeedData = {
  users:[
    {
     fullname: "Isaias",
     email: 'isaias@gmail.com',
     password: 'Hithen==',
     phone_number:'5353323222',
     roles: ['admin']
    },
    {
     fullname: "Marian",
     email: 'marian@gmail.com',
     password: 'Hithen==',
     phone_number:'5353785222',
     roles: ['employee']
    },
    {
     fullname: "Pepe",
     email: 'pepe@gmail.com',
     password: 'Hithen==',
     phone_number:'5350965222',
     roles: ['client']
    },
    {
     fullname: "Mirta",
     email: 'mirta@gmail.com',
     password: 'Hithen==',
     phone_number:'5307365222',
     roles: ['client']
    },
    {
     fullname: "Coret",
     email: 'coret@gmail.com',
     password: 'Hithen==',
     phone_number:'5350964422',
     roles: ['client']
    },
    {
     fullname: "Mercedez",
     email: 'mercedez@gmail.com',
     password: 'Hithen==',
     phone_number:'5307365214',
     roles: ['client']
    },
  ]
}