import faker from 'faker';

export const Mocks = {
    Date: () => new Date(),
    Int: () => parseInt(Math.random() * 100, 10),
    String: () => 'It Works',
    Query: () => ({
        user: (root, args) => ({
            email: args.email,
            entries: [{
                user: faker.internet.email(),
                createdAt: new Date()
            }]
        })
    }),
    User: () => ({
        email: faker.internet.email(),
    }),
    Entry: () => ({
        user: faker.internet.email(),
        createdAt: new Date(),
    }),
    Category: () => ({
        title: faker.lorem.words(4)
    })
};

export default Mocks;