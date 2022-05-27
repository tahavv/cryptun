import React, { Component ,useState, useEffect} from 'react';
import ReactCoinsList from './Coins/ReactCoinsList';
import ReactCoinsDetail from './Coins/ReactCoinsDetail';
import ReactHome from './General/ReactHome';
import ReactAbout from './General/ReactAbout';
import ReactEvents from './Events/ReactEvents';
import ReactEmpty from './Empty/ReactEmpty';
import ReactGlobal from './Global/ReactGlobal';
import { Route,Link,Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import ReactHeader from './Navigation/ReactHeader';
import ReactExchangesList from './Exchanges/ReactExchangesList';
import ReactExchangeRates from './ExchangeRates/ReactExchangeRates';
import ReactFooter from './Navigation/ReactFooter';
import Login from './Login/Login'
import Signup from './Signup/Register'
import Contact from './Contact/Contact'
import './App.css'
import ReactStatusUpdates from './StatusUpdates/ReactStatusUpdates';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();



//[NOTE] React prefix used with React.Components in order to differentiate from Ant Design UI components.

function App() {
    const checkAuthenticated = async () => {
        try {
          const res = await fetch("http://localhost:5000/verify/verify", {
            method: "GET",
            headers: {token: localStorage.token }
          });
    
          const parseRes = await res.json();

            parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
        } catch (err) {
          console.error(err.message);
        }
      };
    
      useEffect(() => {
        checkAuthenticated();
      }, []);
    
      const [isAuthenticated, setIsAuthenticated] = useState(false);
    
      const setAuth = boolean => {
        setIsAuthenticated(boolean);
      };


        return (
            <Layout style={{minHeight: '100vh', lineHeight: '1.6rem'}}>    
                <ReactHeader/>
                <Layout>
                    <Route path='/' exact component={ReactHome}/>
                    <Route exact path="/login"
                            render={props => !isAuthenticated ? (<Login {...props} setAuth={setAuth} /> ) : 
                            (<Redirect to="profile" /> )}
                    />

                    <Route exact path="/register"
                            render={props => !isAuthenticated ? (<Signup {...props} setAuth={setAuth} /> ) : 
                            (<Redirect to="profile" /> )}
                    />

                    <Route exact path="/profile"
                           render={props => isAuthenticated ? (<ReactEmpty {...props} setAuth={setAuth} /> ) :
                               (<Redirect to="login" /> )}
                    />
                    <Route path='/about' exact component={ReactAbout}/>
                    <Route path='/contact' exact component={Contact}/>
                    <Route path='/coins' exact component={ReactCoinsList}/>
                    <Route path='/coins/:coinId/' exact component={ReactCoinsDetail}/>
                    <Route path='/exchanges/list' exact component={ReactExchangesList}/>
                    <Route path='/global' exact component={ReactGlobal}/>
                    <Route path='/empty' exact component={ReactEmpty}/>
                    <Route path='/events/list' exact component={ReactEvents}/>
                    <Route path='/exchange-rates' exact component={ReactExchangeRates}/>
                    <Route path='/status/list' exact component={ReactStatusUpdates}/>
                </Layout>
                <ReactFooter/>
            </Layout>
        )
    }


export default App;