import { useEffect, useState } from "react";

const usersData = [
  { id: 1, name: "Ritam" },
  { id: 2, name: "Rahul" },
  { id: 3, name: "Ankit" },
  { id: 4, name: "Priya" },
  { id: 5, name: "Aman" },
  { id: 6, name: "Rohit" },
  { id: 7, name: "Sneha" },
];

export default function App() {
  const [filterData, setfilterData] = useState(usersData)
  const [loading, setloading] = useState(false)
  const [query, setQuery] = useState("")
  useEffect(() => {
    // the fileter will run when user type in auery //! now we need fix some time to serch the data
    setloading(true)
    const timer = setTimeout(() => {
      const filter = usersData.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
      console.log('====================================');
      console.log(filter);
      console.log('====================================');
      setfilterData(filter)
      setloading(false)
    }, 1000);

    return () => (clearTimeout(timer))

  }, [query])
  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Users 🔍</h2>

      <input
        type="text"
        placeholder="Search user..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />

      {loading && <p>Searching...</p>}


      <ul>
        {filterData.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>

    </div>
  );
}