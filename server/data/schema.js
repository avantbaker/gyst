export const Schema = [`
    scalar Date
    
    type Category {
        id: Int!
        title: String, 
        icon: String
    }
    
    type Entry {
        id: Int!
        userId: Int!
        todos: [Todo]
    }
    
    type User {
        id: Int!
        categories: [Category]!
        entries: [Entry]
        email: String
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
    }
        
    schema {
        query: Query
    }
`];

export default Schema;