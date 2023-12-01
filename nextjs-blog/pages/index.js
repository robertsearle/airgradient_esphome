// pages/index.js
import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import MyContext from '../context/mycontext.context';

const IndexPage = () => {
const context = useContext(MyContext);


  const [dataRows, setDataRows] = useState([]);
  //const contextValue = React.useMemo(() => ({signedIn, setSignedIn}), [singedIn])

  //return ( <MyContext.Provider value ={new MyContext([new ScreenData('1', false, false, null)] )}>
  //<MyContext.Provider value ={context}>
  return (
    <div>
      <h1>Wizard</h1>
      <Link href="/ScreensPage">
        Start Wizard
      </Link>
    </div>);
};
  //</MyContext.Provider>
 

export default IndexPage;

