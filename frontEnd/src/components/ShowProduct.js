import React , {useEffect, useState} from "react";
import AddProduct from "./AddProduct";
import PopUpperWindow from "./PopUpperWindow";
import UpdateProduct from "./updateProduct";
import deletePng from '../logo/delete.png' 
import editPng from '../logo/edit.png' 
import ConfigApi from "./ConfigApi";

const ShowProduct = ()=>{
    const [data1 , saveData1] = useState("");
    const [updateID , setUpdateID] = useState("");
    useEffect( ()=>{
        collectdata();
    }, []); 


    const collectdata = async()=>{
        let result = await fetch(`${ConfigApi.ApiUrl}/products`); 
        result = await result.json();
        saveData1(result);
    }

    const updatethat = (_id)=>{
        setUpdateID(_id);
        toggleUpdateProduct();
    }


    const deletethat = async(_id)=>{
        let result =  await fetch(`${ConfigApi.ApiUrl}/products` , {
            method:'delete', 
            body: JSON.stringify({_id}),
            headers: {
                'Content-Type' : 'application/json'
            }
        });
        result =  await result.json();
        if(result.deletedCount>0){
            collectdata();
        }
        else{
            console.warn("Data not found");
        }
    }
    
    //changes
    const [addProductShow, setaddProductShow] = useState(false);
    const [updateProductShow, setupdateProductShow] = useState(false);

    const toggleAddProduct = () => {
        var element = document.getElementById("appdiv");
        element.classList.toggle("blur-back");
        setaddProductShow(!addProductShow);
        if(addProductShow)
            collectdata();
    }

    const toggleUpdateProduct = () => {
        var element = document.getElementById("appdiv");
        element.classList.toggle("blur-back");
        setupdateProductShow(!updateProductShow);
        if(updateProductShow)
            collectdata();
    }

    return(
        <div>
        <div className="ShowProduct-div" id="appdiv">
            
            <div className="ShowProduct-heading">
            <div className="ShowProduct-heading-div1"><p>Product</p></div>
            <div className="ShowProduct-heading-div2">
            <button  onClick={()=>toggleAddProduct()}>Add Product</button> 
            </div>
             
                
            </div>
            
            <ul className="ShowProduct-ul1">
                <li className="ShowProduct-ul1-li ShowProduct-ul1-no" >No</li>
                <li className="ShowProduct-ul1-li ShowProduct-ul1-name" >Name</li>
                <li className="ShowProduct-ul1-li ShowProduct-ul1-op " >Price</li>
                <li className="ShowProduct-ul1-li" >Category</li>
                <li className="ShowProduct-ul1-li" >Company</li>
                <li className="ShowProduct-ul1-li ShowProduct-ul1-op" >Operation</li>
            </ul>
            <div className="ShowProduct-scroll">

            
                {data1? 
                data1.map((item ,index)=>
                <ul className="ShowProduct-ul2" key={index}>
                <li className="ShowProduct-ul2-li ShowProduct-ul2-no" >{index+1}</li>
                <li className="ShowProduct-ul2-li ShowProduct-ul2-name" >{item.name}</li>
                <li className="ShowProduct-ul2-li ShowProduct-ul2-op" >{item.price}</li>
                <li className="ShowProduct-ul2-li " >{item.category}</li>
                <li className="ShowProduct-ul2-li ">{item.company}</li>
                <li className="ShowProduct-ul2-li ShowProduct-ul2-op">
                <img className="opration-close" alt="close1" src={editPng} width="30px" height="30px" onClick={()=>updatethat(item._id)} ></img>
                <img className="opration-edit" alt="edit1" src={deletePng} width="30px" height="30px" onClick={()=>deletethat(item._id)} ></img></li>
                </ul>
                )
                :null
                }
            </div>
        </div>

        {addProductShow?<> <PopUpperWindow children={<AddProduct indf={toggleAddProduct}/>}  indf={toggleAddProduct}/>    </> : null}
        {updateProductShow?<> <PopUpperWindow children={<UpdateProduct indf={toggleUpdateProduct} id={updateID}/>}  indf={toggleUpdateProduct}/>    </> : null}       
        </div>
    )
}

export default ShowProduct;