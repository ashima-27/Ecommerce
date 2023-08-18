import NavBar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/AdminProductDetail";
import Footer from "../features/common/Footer";

function AdminProductDetailPage() {
    return ( 
        <div>
            <NavBar>
                <AdminProductDetail></AdminProductDetail>
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default AdminProductDetailPage;