// import { useEffect } from "react"

// export default function TestUseEffect() {

//   useEffect(() => {
//     console.log('useEffect is functioning!');
//   }, []);

//   return(
//     <div className="flex justify-center items-center">
//       <h1>test use effect</h1>
//     </div>
//   )
// }

import { useEffect, useState } from "react";
import { supabase } from "../../supabaseclient";

export default function TestUseEffect() {

  const [posts,setPost] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const{data,error} = await supabase
        .from('lobbies')
        .select('*')

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          console.log("Fetch data:" , data);
          setPost(data);
        }
    };

    fetchPosts();
  }, []);


  return (
    <div>
      <h2>news feed</h2>
      {posts.length === 0 ? (
        <p>Loading Posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.description}</li> // 👈 Adjust based on your table's columns
          ))}
        </ul>
      )}
    </div>
  );
}