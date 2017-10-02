// server/data/resolvers.js
import { User, Category, Entry, Todo } from './connectors';
import GraphQLDate from 'graphql-date';
import { _ } from 'lodash';

export const Resolvers = {
    Date: GraphQLDate,
    Query: {
        user( _, args ) {
            return User.findOne({ where: args});
        },
        entry( _, args ) {
            return Entry.findOne({ where: args })
        },
        categories( _, args ) {
            return Category.findAll({ where: args })
        },
    },
    Mutation: {
        createTodo(_, { title, description, userId, categoryId, entryId }){
            return Todo.create({
                title,
                description,
                userId,
                catId: categoryId,
                entryId,
                complete: false
            });
        }

    },
    User: {
        todos(user) {
            return user.getTodos();
        },
        entries(user) {
            return user.getEntries();
        },
        categories(user) {
            return user.getCategories();
        },
        email(user) {
            return user.email;
        },
        username(user) {
            return user.username;
        }
    },
    Entry: {
        todos(entry) {
            return entry.getTodos();
        },
        user(entry) {
            return entry.getUser();
        },
        incompleteTodos(entry) {
            return Todo.findAll({
                where: { entryId: entry.id, complete: { $not: true } }
            });
        }
    },
    Todo: {
        title(todo) {
            return todo.title;
        },
        description(todo) {
            return todo.description
        },
        category(todo) {
            return todo.getCategory();
        },
        entry(todo) {
            return todo.getEntry();
        }
    },
    Category: {
        itemsLeft(category) {
            return Todo.findAll({
                where: { catId: category.id, complete: { $not: true } }
            })
        }
    }
};
export default Resolvers;