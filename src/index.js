import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// apollo client

import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import gql from 'graphql-tag'

const endPointUrl = 'http://localhost:9000/graphql'
const client = new ApolloClient({
   link: new HttpLink({uri:endPointUrl}),
   cache:new InMemoryCache()
});

async function loadStudentsAsync() {
   const query = gql`
   {
    studentDetails{
         studID
         firstName
         lastName
         college{
            name
         }
      }
   }
   `
   const {data} = await client.query({query}) ;
   return data.studentDetails;
}

class  App  extends Component {
   constructor(props) {
      super(props);
      this.state = {
         studentList:[]
      }
      this.studentTemplate =  [];
   }
   async loadStudents() {
      const studentDetails =  await loadStudentsAsync();
      this.setState({
         studentList: studentDetails
      })
      console.log("loadStudents", studentDetails)
   }
   render() {
      return(
         <div>
            <input type = "button"  value = "loadStudents" onClick = {this.loadStudents.bind(this)}/>
            <div>
               <br/>
               <hr/>
               <table border = "3">
                  <thead>
                     <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>college Name</td>
                     </tr>
                  </thead>
                  
                  <tbody>
                     {
                        this.state.studentList.map(s => {
                           console.log('StudID:',s.studID);
                           return (
                              <tr key = {s.studID}>
                                 <td>
                                    {s.firstName}
                                 </td>
                                 <td>
                                    {s.lastName}
                                 </td>
                                 <td>
                                    {s.college.name}
                                 </td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      )
   }
}
ReactDOM.render(<App/>, document.getElementById('root'));
