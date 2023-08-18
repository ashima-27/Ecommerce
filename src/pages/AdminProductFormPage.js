import NavBar from "../features/navbar/Navbar";
import AdminProductDetail from "../features/admin/AdminProductDetail";
import Footer from "../features/common/Footer";
import ProductForm from "../features/admin/ProductForm";

function AdminProductFormPage() {
    return ( 
        <div>
            <NavBar>
                <ProductForm></ProductForm>
            </NavBar>
            <Footer></Footer>
        </div>
     );
}

export default AdminProductFormPage;