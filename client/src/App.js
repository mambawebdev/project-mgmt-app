import Header from "./components/Header"
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Home from "./pages/Home"
import Project from "./pages/Project"
import NotFound from "./pages/NotFound"


const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){
            return incoming
          }
        },
        projects: {
          merge(existing, incoming){
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache
})

const App = () => {
  // Fetch client
  return (
    <>
      <ApolloProvider client={client}>
        <Router basename="/project-mgmt-app">
          <Header/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/projects/:id" element={<Project/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
            {/* <AddClientModal/>   
            <Projects/>     
            <Clients/> */}
          </div>
        </Router>
      </ApolloProvider>
    </>
  )
}

export default App