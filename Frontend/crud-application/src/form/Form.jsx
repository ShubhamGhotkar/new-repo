import React, { useEffect, useState } from "react";
import BackBtn from "../component/BackBtn";
import "./style.css";

const newId = (data) => {
  if (data === "category A") {
    return "Cat-A";
  } else if (data === "category B") {
    return "Cat-B";
  } else {
    return "Cat-c";
  }
};

const Form = ({ props }) => {
  const { tittle, callBack, name, path ,getPaginatedProduct} = props;
  const { id, click } = callBack;
  const [inputData, setInputData] = useState({
    name: "",
    value: "",
    category: "",
    catId: "",
  });

  /* Handle Change */
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  /* Handle Data */
  const handleAddData = async (e) => {
    e.preventDefault();
    let { name, value, category, catId } = inputData;
    catId = newId(category);
    if (!name || !value || !category) {
      window.alert("Input Field Must Required");
    } else {
      const res = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value, category, catId }),
      });

      const data = await res.json();
      if (!data) {
        window.alert("Failed to add Product");
        console.log("Failed to add Product");
      } else {
        window.alert("Product Added Sucessfully");
        console.log("Product Added Sucessfully");
        setInputData({ name: "", value: "", category: "", catId: "" });
      }
    }
  };

  /* UseEffect for updating Data As per User Click On Edit Button */

  useEffect(() => {
    handleUpdateData();
  }, [click]);

  /* First Find Out Data By Id And Update it on Input Section*/

  const handleUpdateData = async () => {
    const { name, value } = inputData;
    const res = await fetch(`/update/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, value }),
    });

    const data = await res.json();
    setInputData({ name: data.name, value: data.value });
    // getPaginatedProduct();
  };

  /* When User Click On Update Button Then It Will Exucute*/
// function getInputField(){
//     fetch(`/update/${id}`,{
//       method:"PUT",
//     }).then((res)=>res.json()).then((data)=>{setInputData({[inputData.name]:data.name,[inputData.value]:data.value,[inputData.category]:data.category,})})
    
// }
  const UpdateData = async () => {
    const { name, value, category } = inputData;

      // here we will add the value and name Of the Product So that when User Click on the Edit Button it Will remains In Table Field;
      // await getInputField();


    console.log(inputData)
    if (!name || !value) {
      window.alert("Fill Input Field ");
    } else {
      const res = await fetch(`/update/${id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value }),
      });

      const data = await res.json();

      setTimeout(() => {
        if (data) {
          window.alert("Product Update Sucessfully");
          setInputData({ name: "", value: "", id: "", category: "" });
        } else {
          window.alert("Failed to Update");
        }
      }, 380);
    }
  };

  return (
    <div id="inp-container">
      <h2>Product Master</h2>
      <div class="inp-div">
        <div class="label-div">
          <label for="product-cat">Product Category : </label>
        </div>
        <select
          name="category"
          value={inputData.category}
          onChange={handleChange}
        >
          <option value="">Choose Product Category</option>
          <option value="category A" id="Cat-A" name="CategoryA">
            Category A
          </option>
          <option value="category B" id="Cat-B" name="CategoryB">
            Category B
          </option>
          <option value="category C" id="Cat-C" name="CategoryC">
            Category C
          </option>
        </select>
      </div>
      <div class="inp-div">
        <div class="label-div">
          <label for="product-name">Product Name : </label>
        </div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          id="product-name"
          value={inputData.name}
          placeholder="Enter Product Name"
        />
      </div>
      <div class="inp-div">
        <div class="label-div">
          <label for="product-itm">Total Items : </label>
        </div>
        <input
          type="number"
          min="1"
          onChange={handleChange}
          name="value"
          value={inputData.value}
          placeholder="Total Product Quantity"
          id="product-itm"
        />
      </div>
      <div class="inp-div">
        <button
          id="save-btn"
          type="button"
          onClick={tittle === "Save" ? handleAddData : UpdateData}
        >
          {tittle}
        </button>
      </div>
      <BackBtn props={{ name: name, path: path }} />
    </div>
  );
};

export default Form;
