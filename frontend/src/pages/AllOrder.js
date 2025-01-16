import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import displayBRLCurrency from '../helpers/displayCurrency'

const AllOrder = () => {
    const [data,setData] = useState([])

    const fetchOrderDetails = async()=>{
      const response = await fetch(SummaryApi.allOrder.url,{
        method : SummaryApi.allOrder.method,
        credentials : 'include'
      })
  
      const responseData = await response.json()
  
      setData(responseData.data)
      console.log("order list",responseData)
    }
  
    useEffect(()=>{
      fetchOrderDetails()
    },[])
  
    return (
      <div className='h-[calc(100vh-190px)] overflow-y-scroll'>
        {
           !data[0] && (
            <p>Sem pedido disponível</p>
           )
        }
  
        <div className='p-4 w-full'>
            {
              data.map((item,index)=>{
                return(
                  <div key={item.userId+index}>
                     <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p> 
                     <div className='border rounded p-2'>
                          <div className='flex flex-col lg:flex-row justify-between'>
                              <div className='grid gap-1'>
                                {
                                  item?.productDetails.map((product,index)=>{
                                    return(
                                      <div key={product.productId+index} className='flex  gap-3 bg-slate-100'>
                                          <img 
                                            src={product.image[0]}
                                            className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                                          />
                                          <div>
                                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                            <div className='flex items-center gap-5 mt-1'>
                                              <div className='text-lg text-custom-gray'>{displayBRLCurrency(product.price)}</div>
                                              <p>Quantity : {product.quantity}</p>
                                            </div>
                                          </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                                <div>
                                    <div className='text-lg font-medium'>Detalhes de pagamento : </div>
                                    <p className=' ml-1'>Metodo de pagamento : {item.paymentDetails.payment_method_type[0]}</p>
                                    <p className=' ml-1'>Status de pagamento : {item.paymentDetails.payment_status}</p>
                                </div>
                                <div>
                                  <div className='text-lg font-medium'>Detalhes de envio :</div>
                                  {
                                    item.shipping_options.map((shipping,index)=>{
                                      return(
                                        <div key={shipping.shipping_rate} className=' ml-1'>
                                          Quantidade e envio : {shipping.shipping_amount}
                                        </div>
                                      )
                                    })                      
                                  }
                                </div>
                              </div>
                          </div>
  
                        <div className='font-semibold ml-auto w-fit lg:text-lg'>
                          Quantidade total : {item.totalAmount}
                        </div>
                     </div>
                  </div>
                )
              })
            }
        </div>
      </div>
    )
}

export default AllOrder
