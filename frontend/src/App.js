import React, {Component,  } from 'react';
import {Route, Routes,} from "react-router-dom";

import Navbar from './components/Navigation'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register';
import Profile from './components/Profile'
import Navbar2 from './components/NavigationClient';
import Navbar3 from './components/NavigationAdmin'
import ServiceList from './components/ServicesList'
import UserList from './components/UserList';
import EmployeeList from './components/EmployeeList'
import Location from './components/Trackingpage'
import EmployeeLoginList from './components/EmployeeLoginList'

import StoreCard from './components/StoreCard';
import ProccessOrder from './components/ProccessOrder';
import PaymentMethod from './components/PaymentMethod';
import PlacedOrder from './components/PlacedOrder';
import OrderList from './components/OrderList';


import PaymentList from './components/PayementList'

import ItemList from './components/ItemList';
import CategoryList from './components/CategoryList'
import Suppliers from './components/SupplierList';


import ServicePrintPreview from './components/ServicePrintPreview';


import EmployeeListPreview from './components/EmployeeListPreview';


import SupplierListPrintPreview from './components/SupplierListPrintPreview';
import UserListPrintPreview from './components/UserListPrintPreview';
import OrderListPrintPreview from './components/OrderListPrintPreview'
import EmployeeLoginPrintPreview from './components/EmployeeLoginPrintPreview'

import ItemListPrintPreview from './components/ItemListPrintPreview'
import InsightsService from './components/InsightsService';
import PaymentService from './components/PaymentService';




import Footer from './components/Footer';

class App extends Component {


  render() {

    return(  

      
      
        <div className='App'>
           
          
          <Navbar3/> 
          <div className='container' style={{marginLeft: "13em", marginRight:"0"}}>    
          <Navbar/> 
          <Navbar2/> 
          <div className="content-container"> 
          <Routes >
            <Route path = "/" element={<Landing/>}/>
            <Route path = "/register" element={<Register/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/profile" element={<Profile/>}/>
            <Route path = "/services" element={<ServiceList/>}/>
            <Route path = "/regUser" element={<UserList/>}/>
            <Route path = "/accounts" element={<EmployeeLoginList/>}/>
            <Route path = "/items" element={<ItemList/>}/>
          
            <Route path = "/category" element={<CategoryList/>}/>
            <Route path = "/supplier" element={<Suppliers/>}/>
            <Route path = "/location" element={<Location/>}/>
          
            <Route path = "/orderList" element={<OrderList/>}/>
            <Route path = "/placedOrder" element={<PlacedOrder/>}/>
            <Route path = "/payee" element={<PaymentMethod/>}/>
            <Route path = "/proccess" element={<ProccessOrder/>}/>
            <Route path = "/store" element={<StoreCard/>}/>
           
            <Route path = "/employees" element={<EmployeeList/>}/>

          
            


            <Route path = "/payments" element={<PaymentList/>}/>
            <Route path = "/servicePreview" element={<ServicePrintPreview/>}/>
           
           
          
            <Route path = "/employeePreviewList" element={<EmployeeListPreview/>}/>
           
            <Route path = "/supplierListPrintPreview" element={<SupplierListPrintPreview/>}/>
            <Route path = "/userListPrintPreview" element={<UserListPrintPreview/>}/>
            <Route path = "/orderListPrintPreview" element={<OrderListPrintPreview/>}/>
            <Route path = "/employeeLoginListPreview" element={<EmployeeLoginPrintPreview/>}/>
          
            <Route path = "/itemListPrintPreview" element={<ItemListPrintPreview/>}/>
           

           <Route path = "/insights" element={<InsightsService/>}/>
            <Route path = "/payservice" element={<PaymentService/>}/>
          
           
            

           


           
          </Routes>
          <Footer/>
          </div>  
          </div> 
       </div>
       
      );
  }
}

export default App;







