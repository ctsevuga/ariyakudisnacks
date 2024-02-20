// export const BASE_URL =
export const BASE_URL = process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '';
// export const BASE_URL = ''; // If using proxy
// if(process.env.NODE_ENV === "production"){
//     BASE_URL = `$req.protocol}://$(req.get('host')}`
//     } 
// export const BASE_URL = `$req.protocol}://$(req.get('host')}`; // production
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
