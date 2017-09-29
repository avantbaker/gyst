import Sequelize from 'sequelize';
import { _ } from 'lodash';
import faker from 'faker';
import Promise from 'bluebird';

// initalize our database
const db = new Sequelize('gyst', null, null, {
    dialect: 'sqlite',
    storage: './gyst.sqlite',
    logging: false
});

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfuly');
    })
    .catch(() => {
        console.error("Unable to connect to the database: ", err);
    });

const TodoModel = db.define('todo', {
    title: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    complete: { type: Sequelize.BOOLEAN }
});

const TodoCategory = db.define( 'TodoCategory', {
    itemsLeft: { type: Sequelize.INTEGER }
});

const CategoryModel = db.define( 'category', {
    title: { type: Sequelize.STRING },
    icon: { type: Sequelize.STRING }
});

const UserModel = db.define('user', {
    email: { type: Sequelize.STRING },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
});

const EntryModel = db.define( 'entry' );

UserModel.belongsToMany( CategoryModel, { through: 'UserCategory' });        // category has a user_id column now

UserModel.hasMany(EntryModel);                                               // entry has a user_id column now

UserModel.hasMany(TodoModel);

CategoryModel.hasOne(TodoModel, { as: 'Category', foreignKey: 'catId' });

CategoryModel.belongsToMany( UserModel, { through: 'UserCategory' });

EntryModel.belongsToMany( TodoModel, { through: TodoCategory } );

TodoModel.belongsTo( EntryModel, { through: TodoCategory } );

TodoModel.belongsTo( CategoryModel, { foreignKey: 'catId' } );


const USERS = 1;
const ENTRIES_PER_USER = 4;
const PASSWORD = faker.internet.password();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomizeBoolean() {
    const randomNumber = getRandomInt(0,100);
    return !!(randomNumber % 2);
}

faker.seed(123);


db.sync({ force: true }).then(() => {
    return _.times(USERS, () => {
        return UserModel.create({
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: PASSWORD
        }).then(user => {

            const data = [
                {
                    icon: "users",
                    title: "Family",
                    itemsLeft: 3
                },
                {
                    icon: "odnoklassniki",
                    title: "Fitness",
                    itemsLeft: 1
                },
                {
                    icon: "leaf",
                    title: "Health",
                    itemsLeft: 0
                },
                {
                    icon: "home",
                    title: "Home",
                    itemsLeft: 1
                },
                {
                    icon: "shopping-bag",
                    title: "Fashion",
                    itemsLeft: 1
                },
                {
                    icon: "reddit",
                    title: "Personal",
                    itemsLeft: 2
                },
                {
                    icon: "heart",
                    title: "Love",
                    itemsLeft: 0
                },
                {
                    icon: "code-fork",
                    title: "Work",
                    itemsLeft: 1
                },
                {
                    icon: "btc",
                    title: "Finance",
                    itemsLeft: 3
                }
            ];
            const buildCategories = Promise.resolve();

            buildCategories.then(() => {
                return Promise.all(_.map(data, category => {
                    category.userId = 1;
                    return user.createCategory(category).then(category => {
                        return category;
                    })
                })).then(categories => {
                    _.times(ENTRIES_PER_USER, () => {
                        let TODOS_PER_ENTRY = getRandomInt(0, 20);
                        return user.createEntry({
                            userId: user.id,
                        }).then(entry => {
                            _.times(TODOS_PER_ENTRY, () => {
                                return user.createTodo({
                                    title: faker.lorem.words(3),
                                    description: faker.lorem.sentence(),
                                    complete: randomizeBoolean(),
                                    entryId: entry.id,
                                    catId: categories[getRandomInt(0, 8)].id
                                })
                            });
                        })
                    });
                });
            });
            //
            // buildCategories.then(() => {
            //     _.times(ENTRIES_PER_USER, () => {
            //         let TODOS_PER_ENTRY = getRandomInt(0, 20);
            //         return user.createEntry({
            //             userId: user.id,
            //         }).then(entry => {
            //             Promise.all(_.map(data, category => {
            //                 category.userId = user.id;
            //                 return user.createCategory(category).then(category => {
            //                     return category;
            //                 })
            //             })).then(categories => {
            //                 _.times(TODOS_PER_ENTRY, () => {
            //                     return user.createTodo({
            //                         title: faker.lorem.words(3),
            //                         description: faker.lorem.sentence(),
            //                         complete: randomizeBoolean(),
            //                         entryId: entry.id,
            //                         catId: categories[getRandomInt(0, 8)].id
            //                     })
            //                 });
            //             })
            //         })
            //     });
            // });


            return user;
        })
    })
});

const Entry = db.models.entry;
const Category = db.models.category;
const Todo = db.models.todo;
const User = db.models.user;

export { Entry, Category, Todo, User };
