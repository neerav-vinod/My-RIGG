import React from 'react'

const CategoryInput = ({value,setValue,handleSubmit}) => {
  return (
    <div className='flex flex-col gap-2'>
        <div className='mt-3'>
        <input type="text" value={value} onChange={e=>setValue(e.target.value)} className='border border-gray-900 p-2 w-72' placeholder='Add Name' />
        </div>
        
        <div>
        <button className='bg-gray-900 p-2 text-white font-semibold'onClick={handleSubmit} >Add</button>
        </div>
    </div>
  )
}

export default CategoryInput