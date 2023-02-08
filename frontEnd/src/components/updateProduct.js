import React , {useEffect, useState} from "react";
import closePng from '../logo/close.png' 
import ConfigApi from "./ConfigApi";


const UpdateProduct = (props)=>{
    const [name , setName] = useState("");
    const [price , setPrice] = useState("");
    const [category , setCategory] = useState("");
    const [uesrId , setUserID] = useState("");
    const [company , setCompany] = useState("");

    useEffect(()=>{
        const datafetch = async()=>{
            let result = await fetch(`${ConfigApi.ApiUrl}/oneproducts?_id=` + props.id ); 
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setUserID(result.uesrId);
            setCompany(result.company);
        }
        datafetch();
    } , [] );

    
    
    const dataSave = async ()=>{
        let auth = localStorage.getItem("user");
        auth = JSON.parse(auth);
        setUserID(auth._id);

        let result = await fetch(`${ConfigApi.ApiUrl}/product/${props.id}` ,  {
            method : "Put", 
            body: JSON.stringify({name, price, category , uesrId , company}) , 
            headers : {
                'Content-type' : 'application/json' 
            }
        });
        //const result1 = await result.json();
        if(result.status===200){
            props.indf();
        }
    }
    return(
        <div className="AddProduct-div">
            <div className="opration-closewindow" ><img alt="close window" src={closePng} width="30px" height="30px" onClick={()=>props.indf()} ></img></div>
            <h1 className="AddProduct-heading" >UpdateProduct</h1>
            <input type="text" className="AddProduct-input" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input>
            <input type="text" className="AddProduct-input" placeholder="Price" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input>
            <input type="text" className="AddProduct-input" placeholder="category" value={category} onChange={(e)=>{setCategory(e.target.value)}}></input>
            <input type="text" className="AddProduct-input" placeholder="Compant" value={company} onChange={(e)=>{setCompany(e.target.value)}}></input>
            <button className="AddProduct-button" onClick={dataSave}>UpdateProduct</button>
        </div>
    )
}

export default UpdateProduct;