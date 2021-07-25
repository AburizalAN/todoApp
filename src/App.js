import Todo from "./pages/Todo";
import Blog from "./pages/Blog";
import DetailBlog from "./pages/DetailBlog";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./components/Navbar";
import { useRef, useEffect, useState } from 'react';
import Maps from "./pages/Maps";

function App() {

  const navRef = useRef();
  const [ navHeight, setNavHeight ] = useState(0);

  return (
    <div className="App">
      <Router>
        <div className="d-flex flex-column" style={{height: '100vh'}}>
          <Navbar setNavHeight={setNavHeight} />
          <div style={{ height: `${navHeight}px`}}></div>
          <div style={{flex: 1, minHeight: 0}}>
            <Switch>
              <Route path="/blog" component={Blog} />
              <Route path="/detail/:id?" component={DetailBlog} />
              <Route path="/maps" component={Maps} />
              <Route path="/" component={Todo} />
            </Switch>  
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
