import React, { useEffect, useState } from 'react'
import Switch from '@mui/material/Switch';
import { Products } from '../Product';
import { MdModeEdit } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";

const ViewProduct = ({changemode}) => {
  const [iscardview, setiscardview] = useState(false)
  const [Search, setSearch] = useState('')
  const [TotalPage] = useState(Math.ceil(Products.length / 10))  //10 elements per page
  const [CurrentPage, setcurrentpage] = useState(1)
  const [Items, setitems] = useState([])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Products) {
        let data=[]
        if(!iscardview){
            data = Products.filter((item) =>
            item.name.toLowerCase().includes(Search.toLowerCase())
             && item.id > (CurrentPage - 1) * 10 && item.id <= CurrentPage * 10)            //for table view only - make 10 number of elements in each page
        }
        else{

            data = Products.filter((item) =>
            item.name.toLowerCase().includes(Search.toLowerCase()))            //for Card view only -no pagination
        }
         
           setitems(data)
      }
    }, 500)
    return () => clearInterval(timer)
  }, [Search, CurrentPage,iscardview])                   
  return (
    <>
      <div className="outerbody  h-fit w-full">
        <div className="innerbody p-2    border-2 border-zinc-600 ">
          <div className="search_view flex items-center justify-between">

            {/* Search field */}
            <div className=" text-xl text-zinc-800 font-md m-2 w-76 sm:w-96 border-2 border-zinc-700 rounded flex items-center">
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder='Search name...'
                className='block w-full p-2 px-1'
                style={{ outline: 0 }}
              />
              <div className="searchicon text-4xl"><IoIosSearch /></div>
            </div>

            {/* View_Mode */}
            <div className="switch flex pr-1 font-semibold sm:pr-4">
              <Switch checked={iscardview} onClick={(e) => setiscardview(e.target.checked)} color="secondary" />
              <label >Card View</label>
            </div>

          </div>

          {/* Table_Section */}
         {!iscardview && 
         <div className="Table overflow-x-auto">
            <table className='min-w-150  w-full'>
              <thead>
                <tr className='font-bold border-b-2 border-t-2 border-zinc-500 mx-2 '>
                  <td className='p-2'>Name</td>
                  <td className='p-2'>Category</td>
                  <td className='p-2'>Price</td>
                  <td className='p-2'>Stock</td>
                  <td className='p-2'>Update</td>
                </tr>
              </thead>
              <tbody>
                {Items.length > 0 ?
                  Items.map((item, index) => (
                    <tr key={index}>
                      <td className='p-2 flex gap-1.5'>
                        {item?.image != '' ? <img height={15} width={30} className='rounded-[50%] center' src={item?.image} alt="" /> :
                          <h2
                            className='rounded-[50%] text-center pt-0.5 bg-zinc-200 font-bold border h-8 w-8 border-zinc-600'
                          >
                            {item?.name.slice(0, 1)}</h2>
                        }
                        {item?.name}
                      </td>
                      <td className='p-2'>{item?.category}</td>
                      <td className='p-2'>{item?.price}</td>
                      <td className='p-2'>{item?.stock}</td>
                      <td 
                      className='p-2 text-xl text-blue-700 hover:cursor-pointer '
                      onClick={()=>changemode(item)}
                      >
                        <MdModeEdit />
                      </td>

                    </tr>

                  ))
                  : <tr className='flex justify-center items-center text-xl font-bold text-zinc-600'>
                    <td>Product not found</td>
                  </tr>}
              </tbody>

            </table>
          </div>}

        </div>
        {/* Pagination_Section */}
       {!iscardview && <div className={!Search ? "pagination text-sm font-semibold flex justify-end gap-2 p-2 " : "hidden"}>
          {/* pagination not show for search item  */}
          {/* PrevButton */}

          <div
            className="border rounded p-2  border-zinc-500 previous hover:cursor-pointer"
            onClick={() => CurrentPage > 1 ? setcurrentpage(CurrentPage - 1) : setcurrentpage(CurrentPage)}
          >
            Prev
          </div>

          {Array.from({ length: TotalPage }, (_, i) => i += 1).map((index) => (
            <div
              key={index}
              onClick={() => CurrentPage != index ? setcurrentpage(index) : setcurrentpage(CurrentPage)}
              className={CurrentPage == index ? "index border rounded py-2 px-4 bg-blue-500/20 border-zinc-500 hover:cursor-pointer" :
                "index border rounded py-2 px-4  border-zinc-500 hover:cursor-pointer"}
            >
              {index}</div>
          ))}

          {/* NextButton */}
          <div
            className="border rounded p-2  border-zinc-500 Next hover:cursor-pointer"
            onClick={() =>
              CurrentPage < Math.ceil(Products.length / 10) ? setcurrentpage(CurrentPage + 1) :
                setcurrentpage(CurrentPage)
            }
          >
            Next
          </div>

        </div>}
      
      
      {/* Card View */}
      
     {iscardview && 
     <div className="outerbody ">
     <div className="body place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Items.length>0 ? 
        Items.map((item)=>(
           <div key={item.id} className="innerbody relative border-2 border-zinc-500 p-2 rounded h-72 w-60  hover:shadow-lg hover:scale-101 transition-shadow duration-300">
           
           <div className="imageseaction flex justify-center ">
            {item.image ? <img className='h-32 w-40  ' src={item.image} alt="" />:
            <div className="firstletter h-32 w-32  text-4xl font-bold text-zinc-600 rounded-[50%] border border-zinc-800 flex justify-center items-center">
              <h1 className=''>{item.name.slice(0,1)}</h1>
            </div>
            }
          </div>

         {/* Bottom detailSection */}
          <div className="datasection ">
            <h1 className=' text-xl font-bold text-zinc-700 py-1'>{item.name}</h1>
              <h1 className=' text-blue-600 font-bold border-blue-500 border rounded-4xl w-fit px-2'>{item.category}</h1>
            <div className="description  line-clamp-3 break-all text-sm">{item.description}</div>
            <div className="category_stock flex justify-between pt-3 text-xl">
              <h2 className=' text-green-800 font-bold'>₹{item.price}</h2>
              <h2 className=' text-zinc-800 font-semibold'>Stocks:{' '} 
                <span className={item.stock<10 ?'text-red-800 font-semibold':
                'text-zinc-700 font-semibold'}
                
                >{item.stock}</span> </h2>
            </div>
          </div>
          <div 
          className="edit absolute top-2 right-2  text-xl text-blue-700  border-zinc-700 hover:scale-110 hover:cursor-pointer"
          onClick={()=>changemode(item)}
          >
            <MdModeEdit />
          </div>
       
        </div>
        ))
        :
        <h1>Product not found </h1>
        }
       </div>
      </div>}
      
      </div>
    </>
  )
}

export default ViewProduct