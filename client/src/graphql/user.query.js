import gql from 'graphql-tag';

export const USER_QUERY = gql`
       query user($id: Int) {
            user(id: $id) {
                categories {
                  id
                  title
                  icon
                }
                entries {
                  id
                  incompleteTodos {
                    category {
                      id
                    }
                    complete
                  }
                }
            }
       }       
`;