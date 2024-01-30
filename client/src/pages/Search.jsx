import React from 'react'
import { useSearch } from '../context/Search'
import Layout from '../components/Layout'
import SearchBox from '../components/Forms/SearchBox'


const Search = () => {
    const {value,setValue} = useSearch()
  return (
    <Layout>
    <div>

        <div>
            <SearchBox></SearchBox>
        </div>

        <div>
        <h1>Search Results</h1> 
        </div>

        <div className='flex flex-wrap'>
        {value.results?.map(p =>(
                        <div className='p-2 border rounded cursor-pointer'>
                        <div>
                            <img src={`http://localhost:8080/${p.photo}`} alt="" className='h-[14rem] w-auto'  />
                        </div>
                        <div>
                            <h2 className='text-xl font-bold'>{p.name}</h2>
                            <p className='font-semibold'>{p.description.substring(0,30)}...</p>
                            <p>$ {p.price}</p>
                        </div>
                    </div>
                    ))}
        </div>
    </div>
    </Layout>
  )
}

export default Search