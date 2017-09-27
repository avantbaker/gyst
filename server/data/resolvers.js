// server/data/resolvers.js
import { User, Category, Entry, Todo } from './connectors';
import GraphQLDate from 'graphql-date';

export const Resolvers = {
    Date: GraphQLDate,
    Query: {
        user( _, {id}) {
            console.log(id);
            return User.findOne({ where: { id }});
        },
        entry(_, { id, userId }) {
            return Entry.findOne({ where: { id, userId }})
        },
        categories(_, { userId }) {
            return Category.findOne({ where: { userId }})
        },
        allTodos(_, { userId }) {
            return Todo.findAll().then(todos => {
                console.log(todos);
                return todos;
            })
        }
    },
    User: {
        entries(user) {
            return Entry.findAll({
                where: { userId: user.id },
            });
        },
        categories(user) {
            return Category.findAll({
                where: { userId: user.id }
            });
        },
    },
    Entry: {
        todos(entry) {
            return Todo.findAll({ where: { entryId: entry.id } })
        },
        userId(entry) {
            return User.findOne({ where: { id: entry.userId }})
                        .then(user => {
                            return user.id;
                        });
        }
    },
    Todo: {
        title(todo) {
            return Todo.findOne({ where: { id: todo.id }})
                        .then( todo => {
                            return todo.title;
                        });
        },
        description(todo) {
            return Todo.findOne({ where: { id: todo.id }})
                    .then( todo => {
                        return todo.description;
                    });
        },
        // category(todo) {
        //     return Todo.findOne({ where: { id: todo.id } })
        //         .then(todo => {
        //             return todo.category
        //         });
        // },
        entry(todo) {
            return Todo.findOne({ where: { id: todo.id }})
                .then( todo => {
                    console.log(todo);
                    return Entry.findOne({where: {
                        id: todo.entryId
                    }});
                });
        }
    }
};
export default Resolvers;