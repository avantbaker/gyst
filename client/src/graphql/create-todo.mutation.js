import gql from 'graphql-tag';

export const CREATE_TODO_MUTATION = gql`
    mutation createTodo($title: String!, $description: String, $userId: Int!, $categoryId: Int!, $entryId: Int!) {
        createTodo(title: $title, description: $description, userId: $userId, categoryId: $categoryId, entryId: $entryId) {
            id
            title,
                description,
                category {
                id
            }
            entry {
                id
            }
        }
    }
`;