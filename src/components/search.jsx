//import React from 'react';

//const Search=({searchterm,setsearchterm})=>{
 //   return(
 //       <div className='search  w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto;'>
 //           <div>
 //               <img src='search.svg' alt='search'></img>
 //               <input type='text' placeholder='seach for any movies' value={searchterm} onChange={(event)=>setsearchterm(event.target.value)}/>
 //           </div>
 //       </div>
 //   )
//}

//export default Search

import React from 'react';

const Search = ({ searchterm, setsearchterm }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      <div className="relative">
        <img
          src="search.svg"
          alt="search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-70"
        />
        <input
          type="text"
          placeholder="Search for any movie..."
          value={searchterm}
          onChange={(e) => setsearchterm(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
      </div>
    </div>
  );
};

export default Search;
