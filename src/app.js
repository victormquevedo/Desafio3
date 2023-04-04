import productManager from "./productManager.js";
import express from "express";

const manager = new productManager()
const productServer = express()

productServer.get("/products", async(req, res)=>{
  
    const consult = await manager.getProducts();
    let limit = Number.parseInt(req.query.limit)

    if(limit){
      const result = consult.slice(0,limit);
      res.send(result);
    }else{
      res.send(consult)
    }
  
});

productServer.get("/products/:pid",async(req, res)=>{
  
    let id = req.params.pid
    console.log(id)
    const consultId = await manager.getProductById(Number.parseInt(id));
    if (!consultId){
      return res.send({error:"Producto no encontrado"})
    }else{
      res.send(consultId);
    }
  
});

productServer.listen(8080,()=>{
  console.log("Servidor arriba en el puerto 8080")
})
