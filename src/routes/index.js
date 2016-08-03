import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Layout from '../containers/layout';
import Home from '../components/home';
import Customers from '../containers/customers';
import CustomerDetail from '../containers/customer-detail';
import CustomerEdit from '../containers/customer-edit';
import Orders from '../containers/orders';
import OrderDetail from '../containers/order-detail';
import OrderEdit from '../containers/order-edit';
import OrderItemEdit from '../containers/order-item-edit';
import Products from '../containers/products';
import ProductDetail from '../containers/product-detail';
import ProductEdit from '../containers/product-edit';
import Vendors from '../containers/vendors';
import VendorEdit from '../containers/vendor-edit';
import SupplyEdit from '../containers/supply-edit';
import VendorDetail from '../containers/vendor-detail';
import NotFound from '../components/404';
import NotAuthenticated from '../containers/403';

export default function(store) {
    
    function authRequired(nextState, replace) {
        let state = store.getState();
        
        if (!state.user.isAuthenticated) {
            store.dispatch({type: 'NOT_AUTHED', location: nextState.location.pathname});
            replace('/Unauthorized');
        }
    }

    return (
        <Router history={browserHistory}>
            <Route component={Layout}>
                <Route path="/" component={Home}/>
                <Route path="/Unauthorized" component={NotAuthenticated} />
                <Route path="/Customers" onEnter={authRequired}>
                    <IndexRoute component={Customers}/>
                    <Route path="New" component={CustomerEdit} />
                    <Route path=":id/Edit" component={CustomerEdit} />
                    <Route path=":customer_id/Orders/New" component={OrderEdit} />
                    <Route path=":id" component={CustomerDetail} />
                </Route>
                <Route path="/Orders" onEnter={authRequired}>
                    <IndexRoute component={Orders} />
                    <Route path=":order_id/Edit" component={OrderEdit} />
                    <Route path=":id" component={OrderDetail} />
                    <Route path=":order_id/Items/New" component={OrderItemEdit} />
                    <Route path=":order_id/Items/:order_details_id" component={OrderItemEdit} />
                </Route>
                <Route path="/Products" onEnter={authRequired}>
                    <IndexRoute component={Products} />
                    <Route path="New" component={ProductEdit} />
                    <Route path=":id/Edit" component={ProductEdit} />
                    <Route path=":id" component={ProductDetail} />
                </Route>
                <Route path="/Vendors" onEnter={authRequired}>
                    <IndexRoute component={Vendors}/>
                    <Route path="New" component={VendorEdit} />
                    <Route path=":id/Edit" component={VendorEdit} />
                    <Route path=":vendor_id/Supplies/New" component={SupplyEdit} />
                    <Route path=":vendor_id/Supplies/:unique_id" component={SupplyEdit} />
                    <Route path=":id" component={VendorDetail} />
                </Route>
                <Route path='*' component={NotFound} />
            </Route>
        </Router>
    )
}