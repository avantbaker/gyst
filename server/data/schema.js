export const Schema = [`
    scalar Date
    
    type Category {
        id: Int!
        title: String,
        icon: String
        itemsLeft: [[Todo]]
    }
    
    type Entry {
        id: Int!
        incompleteTodos: [Todo]
        user: User!
        todos: [Todo]
    }
    
    type User {
        id: Int!
        email: String
        username: String
        categories: [Category]!
        entries: [Entry]
        todos: [Todo]
    }
    
    type Todo {
        id: Int!
        entry: Entry!
        category: Category!
        user: User!
        title: String!
        description: String
        complete: Boolean
    }
    
    type Query {
        user(email: String, id: Int): User
        entry(id: Int, userId: Int!, date: Date): Entry
        categories(userId: Int!): [Category]
        allTodos(userId: Int!): [Todo]
        allEntries(userId: Int!): [Entry]
    }
        
    schema {
        query: Query
    }
`];

export default Schema;