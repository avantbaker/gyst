import gql from 'graphql-tag';

export const TODO_QUERY = gql`
       query user($id: Int) {
            user(id: $id) {
                id
                entries {
                  id
                  todos {
                    id
                    title
                    description
                    complete
                    category {
                        id
                    }
                  }
                }
            }
       }       
`;