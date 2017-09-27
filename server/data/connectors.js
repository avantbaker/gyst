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

const EntryModel = db.define( 'entry', {
    userId: { type: Sequelize.INTEGER }
});

// User has Many Entries
// Entries belong to a User
// UserModel.hasMany(EntryModel); // entry has a user_id column now
// UserModel.hasMany(CategoryModel); // category has a user_id column now
// UserModel.hasMany(TodoModel); // to_do has a user_id column now
//
// EntryModel.hasMany(TodoModel, { through: UserModel });
// EntryModel.belongsTo( UserModel, { through: 'UserEntry' });
// CategoryModel.belongsToMany( UserModel, { through: 'UserCategory' });
//
// //Todos belong to a User
// TodoModel.belongsTo( UserModel, { through: 'TodoUser' });
//
// // Todos belong to an Entry
// TodoModel.belongsTo( EntryModel, { through: 'TodoEntry' });
//
// // Todos belong to a Category
// TodoModel.belongsTo( CategoryModel, { through: 'TodoCategory', as: 'todocategory' });

// Entry belongs to a user
EntryModel.belongsTo( UserModel, { through: 'EntryUser' });

// Category belongs to a user
CategoryModel.belongsTo( UserModel, { through: 'CategoryUser' });

//Todos belong to a User
TodoModel.belongsTo( UserModel, { through: 'TodoUser' });

// Todos belong to an Entry
TodoModel.belongsTo( EntryModel, { through: 'TodoEntry' });

// Todos belong to a Category
TodoModel.belongsTo( CategoryModel, { through: 'TodoCategory', as: 'todocategory' });

const USERS = 1;
const ENTRIES_PER_USER = 4;
const TODOS_PER_ENTRY = 13;
const PASSWORD = faker.internet.password();
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
            const user_categories = [];
            const CATEGORIES_PER_USER = data.length;
            const buildCategories = Promise.resolve();

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
            }

            buildCategories.then(() => {
                return Promise.all(_.map(data, category => {
                    category.userId = 1;
                    return CategoryModel.create(category).then(category => {
                        return category;
                    })
                })).then(categories => {
                    _.times(ENTRIES_PER_USER, () => {
                        return EntryModel.create({
                            userId: user.id
                        }).then(entry => {
                            _.times(13, () => {
                                return TodoModel.create({
                                    title: faker.lorem.words(3),
                                    description: faker.lorem.sentence(),
                                    entryId: entry.id,
                                    categoryId: getRandomInt(0,9),
                                    user: user
                                });
                            });
                        })
                    });
                });
            });
            return user;
        })
    })
});

const Entry = db.models.entry;
const Category = db.models.category;
const Todo = db.models.todo;
const User = db.models.user;

export { Entry, Category, Todo, User };
