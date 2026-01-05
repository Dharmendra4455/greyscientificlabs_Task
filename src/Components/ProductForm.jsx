import React, { useState } from 'react'
import ViewProduct from './ViewProduct'
import { Products } from '../Product'
import { toast } from 'react-toastify'
const ProductForm = () => {
    const[mode,setmode]=useState('add') // view for viewproduct
    const[Isupdatemode,setIsupdatemode]=useState(false)
    const[error,seterror]=useState('')
     const [form ,Setform]=useState({
    id:'',
    name:'',
    price:'',
    category:'',
    stock:'',
    description:'',
    image:''
})

const Add_UpdateHandler=()=>{
  if(Isupdatemode && Products.length>0){
   const item = Products.find(p => p.id === Number(form.id));
   item.image=form.image
   item.name=form.name
   item.category=form.category
   item.stock=form.stock
   item.description=form.description
  
  toast.success("Product Updated Successfully")
  seterror('')
  Setform({              
    id:'',
    name:'',
    price:'',
    image:'',
    category:'',
    stock:'',
    description:''
})
  setmode('view')
}    
// add new product
else{ 
  if(mode=='add'){
  if(form.name=='')
    seterror('name')
  else if(form.category=='')
    seterror('category')
  else if(form.price=='')
    seterror('price')
  else if(form.stock=='')
    seterror('stock')


  if(form.name && form.category && form.stock){

   Products.push(form)
 toast.success("Product added Successfully")
 seterror('')
    Setform({                     //  after update and add clearform   
    id:'',
    name:'',
    price:'',
    image:'',
    category:'',
    stock:'',
    description:''
})
  }}
                 
}     
}
  return (
    <>
       <div className="body p-2 m-2">
        {/* create_View_Button */}
         <div className="create_View_Product flex gap-2 text-xl  font-semibold text-zinc-700 ">
          <div 
          className={mode=='add' ?'border-b-4 border-violet-800 bg-zinc-100 pt-2 px-4 hover:cursor-pointer':'pt-2 px-4 hover:cursor-pointer' }
          onClick={()=>{
          setmode('add')
          setIsupdatemode(false)   // to show action add
          Setform({                // clear form, before to add new product
              id:'',
              name:'',
              price:'',
              image:'',
              category:'',
              stock:'',
              description:''
           })
          }}
          >Create Product</div>
          <div 
          className={mode=='view' ?'border-b-4 border-violet-800 bg-zinc-100 pt-2 px-4 hover:cursor-pointer':'pt-2 px-4 hover:cursor-pointer' }
          onClick={()=>setmode('view')}
          >View Product</div>
         </div>

       <div className={mode=='add' ?"inputcontainer flex flex-wrap":'hidden'}>
        {/* Name field */}
        <div className="name text-xl text-zinc-800  p-2 w-100 ">
          <label >Name<sup className='text-red-600 '>*</sup></label>
          <input 
          required
          onChange={(e)=>{
          const ragex=/^[A-Za-z ]*$/  //name regex
          const value=e.target.value
          if(value==''|| ragex.test(value))
            Setform((prev)=>({...prev,name:value}))
          if(!Isupdatemode){
             Setform((prev)=>({...prev, id:Products.length+1}))
          }
          }}
          value={form.name}
          type="text" 
          placeholder='Name'
          className='block border-2 border-zinc-700 rounded w-full h-12 px-1'
          style={{outline:0}}
          />
          <div className={error=='name' ? "error text-sm text-red-600":'hidden'}>Error: Please enter Name</div>
        </div>
        {/* Category field */}
        <div className="name text-xl text-zinc-800  p-2 w-100 ">
          <label >Category<sup className='text-red-600 '>*</sup></label>
          <input 
          value={form.category}
           onChange={(e)=>{
          const ragex=/^[A-Za-z ]*$/  //Category regex
          const value=e.target.value
          if(value==''|| ragex.test(value))
            Setform((prev)=>({...prev,category:value}))
          }}
          required
          type="text" 
          placeholder='Category'
          className='block border-2 border-zinc-700 rounded w-full h-12 px-1 '
          style={{outline:0}}  
          />
            <div className={error=='category' ? "error text-sm text-red-600":'hidden'}>Error: Please enter category</div>
        </div>
        {/* Price field */}
        <div className="name text-xl text-zinc-800  p-2 w-100 ">
          <label >Price<sup className='text-red-600 '>*</sup></label>
          <input
          value={form.price} 
          onChange={(e)=>Setform((prev)=>({...prev,price:e.target.value}))}
          required
          type="number" 
          min={0}
          placeholder='Price'
          className='block border-2 border-zinc-700 rounded w-full h-12 px-1'
          style={{outline:0}}
          />
         <div className={error=='price' ? "error text-sm text-red-600":'hidden'}>Error: Please enter price</div>
        </div>
        {/* Stock field */}
        <div className="name text-xl text-zinc-800  p-2 w-100 ">
          <label >Stock<sup className='text-red-600 '>*</sup></label>
          <input
          value={form.stock} 
           onChange={(e)=>Setform((prev)=>({...prev,stock:e.target.value}))}
          required
          type="number" 
          min={0}
          placeholder='stock'
          className='block border-2 border-zinc-700 rounded w-full h-12 px-1'
          style={{outline:0}}
          />
         <div className={error=='stock' ? "error text-sm text-red-600":'hidden'}>Error: Please enter stock</div>
        </div>
        {/* Description field */}
        <div className="name text-xl text-zinc-800  p-2 w-100 xl:w-[61%] ">
          <label >Description</label>
          <input 
          value={form.description}
          onChange={(e)=>{
          const ragex=/^[A-Za-z0-9 .,()\-]*$/  //description regex
          const value=e.target.value
          if(value==''|| ragex.test(value))
            Setform((prev)=>({...prev,description:value}))
          }}
          required
          type="text" 
          placeholder='description'
          className='block border-2 border-zinc-700 rounded w-full h-16 px-1'
          style={{outline:0}}
          />
        </div>

    
    </div>
       {/* Image Section */}
      {mode=='add' &&
      <>
       <label className='mx-1 text-xl text-zinc-800 '>Photo</label>
       <div className={ "photo max-w-100 w-auto mx-1 mb-2 h-40 border-dotted border-2 border-zinc-700 text-center relative" }>
         <input 
          type="file" 
          accept=".jpg,.jpeg,.png,.webp"
          className={form.image==''?
          'w-100  h-44 text-center py-[16%] pl-[10vw]':              //to show Choose file text
          'w-100  h-44 text-center py-[16%] pl-[10vw] text-transparent' //to hide Choose file text when image uploaded
          }
          multiple={false} 
          onChange={(e)=>Setform((prev)=>({...prev,image:URL.createObjectURL(e.target.files[0])}))} 
          />

        {form.image!==''&& 
        <img className={ '  w-60 p-3 h-40 ml-[4vw] absolute top-0 left-0'} src={form.image} alt="" />
        }
       </div>
       </>}

        <button
        className={
          mode==='add' ?
          'bg-violet-800 text-xl font-semibold text-white py-3 px-12 hover:cursor-pointer ml-2':
          'hidden'}
        onClick={Add_UpdateHandler}  
        >
          {Isupdatemode ? 'Update':'Create'}
        </button>
       </div>
       {mode=='view' ? 
       <ViewProduct
       changemode={(data)=>
        {setmode('add')   //to redirect to add page
          Setform(
            {
              id:data.id,
              name:data.name,
              category:data.category,
              price:data.price,
              stock:data.stock,
              image:data.image,
              description:data.description
            })
          setIsupdatemode(true)
        }}
       />:''}

   </>
  )
}

export default ProductForm