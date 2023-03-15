import "./App.css";
import AddProduct from "./AddProduct/AddProduct";
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import ProductList from "./productList/ProductList";
import Form from "./form/Form";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddProduct />} />
        <Route path="/form/" element={<Form />} />
        <Route path="/delete" element={<UpdateProduct />} />
        <Route path="/list" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
