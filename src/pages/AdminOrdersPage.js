import AdminOrders from '../features/admin/AdminOrders';
import NavBar from '../features/navbar/Navbar';


function AdminOrdersPage() {
  return (
    <div>
      <NavBar>
        <h1 className='mx-auto text-2xl'>All Orders</h1>
       <AdminOrders></AdminOrders>
      </NavBar>
    </div>
  );
}

export default AdminOrdersPage;