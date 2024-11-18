import { createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import PaymentSuccess from "../components/PaymentSuccess";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserDMain from "../pages/dashboard/user/dashboard/UserDMain";
import UserOrders from "../pages/dashboard/user/dashboard/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {path: "/",element: <Home/>},
        {path:"/categories/:categoryName", element:<CategoryPage/>},
        {path:"/search", element:<Search/>},
        {path:"/shop", element:<ShopPage/>},
        {path:"/shop/:id", element:<SingleProduct/>},
        {
          path:"/success",
          element: <PaymentSuccess/>
        },
        {
          path:"/orders/:orderId",
          element: <OrderDetails/>
        }
        
      ]
    },

    {
      path: "/login",
      element: <Login/>
    },

    {
      path: "/register",
      element: <Register/>
    },

    //dashboard routes
    {
      path:'/dashboard',
      element:<PrivateRoute><DashboardLayout/></PrivateRoute>, // TODO: use private routes here
      children: [
          //user route
          {path: '', element: <UserDMain/>},
          {path: 'orders', element: <UserOrders/>},
          {path: 'payments', element: <div>User payments</div>},
          {path: 'profile', element: <div>User profile</div>},
          {path: 'reviews', element: <div>User reviews</div>},

          //admin route (only accessible by admin) TODO: Include private routes with roles field
          {
            path:"admin",
            element: <PrivateRoute role="admin"><div>Admin main</div></PrivateRoute>
          },
          {
            path:"add-new-post", 
            element: <PrivateRoute role="admin"><div>New Post</div></PrivateRoute>
          },
          {
            path:"manage-products", 
            element: <PrivateRoute role="admin"><div>Manage Post</div></PrivateRoute>
          },
          {
            path:"update-product/:id", 
            element: <PrivateRoute role="admin"><div>Update Post</div></PrivateRoute>
          },
          {
            path:"users", 
            element:<PrivateRoute role="admin"><div>All Users</div></PrivateRoute>
          },
          {
            path:"manage-orders", 
            element: <PrivateRoute role="admin"><div>Manage Orders</div></PrivateRoute>
          },
      ]
    }
  ]);

  export default router;