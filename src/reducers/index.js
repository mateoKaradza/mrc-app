import { combineReducers } from 'redux';
import customers from './customers';
import orders from './orders';
import products from './products'
import theCustomer from './the-customer';
import theOrder from './the-order';
import theProduct from './the-product';
import user from './user';
import platforms from './platforms';
import vendors from './vendors';
import theVendor from './the-vendor';

export default combineReducers({
    customers,
    orders,
    products,
    vendors,
    theCustomer,
    theOrder,
    theProduct,
    theVendor,
    user,
    platforms
});