// import { PrismaClient } from '@prisma/client';

// const prismaSingleton = (() => {
//   let instance: PrismaClient | undefined;
//   return () => {
//     if (!instance) {
//       instance = new PrismaClient();
//     }
//     return instance;
//   };
// })();

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = prismaSingleton();
// }

// export const prisma = globalThis.prisma || prismaSingleton();


import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma