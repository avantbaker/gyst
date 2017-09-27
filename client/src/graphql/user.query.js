import gql from 'graphql-tag';

export const USER_QUERY = gql`
       query user($id: Int) {
            user(id: $id) {
                id
                email
                categories {
                    id
                    title
                    icon
                }
            }
       }       
`;