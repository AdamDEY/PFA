import Home from "./pages/home page/HomePage";

function App() {
  // const [data,setdata]=useState(null);
  // const [error,seterror]=useState(null);
  // const [loading,setloading]=useState(false);
  // useEffect(()=>{
  //   setloading(true);
  //   fetch("enponint").then(async r=>{
  //     setdata(await r.json())

  //   }).catch(e=>seterror(e)).finally(()=>setloading(false));
  // },[]);
  return (
    <div className="app-container">
      {/* <WarehouseCard
        Warehouse="Maison Chaari"
        Location="ariana"
        Phone="5881714"
        Email="khorma =.com"
        Distance="5 km away"
        Status="Open"
      /> */}
      {/* <LoginPage /> */}
      <Home />

      {/* <Layout /> */}
    </div>
  );
}

export default App;
