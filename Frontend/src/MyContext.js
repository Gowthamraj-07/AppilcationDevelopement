import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState(() => {
        const savedState = localStorage.getItem('sharedState');
        return savedState ? savedState : "Coimbatore";
    });

    const [closelogin, setCloseLogin] = useState(() => {
        const savedState = localStorage.getItem('closelogin');
        return savedState ? JSON.parse(savedState) : false;
    });

    const [userdetails, setUserdetails] = useState(() => {
        const savedState = localStorage.getItem('userdetails');
        return savedState ? JSON.parse(savedState) : "";
    });

    const [usercomponent, setUsercomponent] = useState(() => {
        const savedState = localStorage.getItem('usercomponent');
        return savedState ? JSON.parse(savedState) : true;
    });

    const [menu, setMenu] = useState(() => {
        const savedMenu = localStorage.getItem('menu');
        return savedMenu ? JSON.parse(savedMenu) : { menuItems: [] };
    });

    const [reg, setReg] = useState(() => {
        const savedState = localStorage.getItem('reg');
        return savedState ? JSON.parse(savedState) : false;
    });
    const [carthotel, setCarthotel] = useState(() => {
        const savedState = localStorage.getItem('carthotel');
        return savedState ? JSON.parse(savedState) : '';
    });
    const [cartItems, setCartItems] = useState(() => {
        const savedMenu = localStorage.getItem('cartItems');
        return savedMenu ? JSON.parse(savedMenu) : { cartItems: [] };
    });

   

    const[diet,setDiet]=useState([])
    const[dietoption,setDietoption]=useState(false);
    const [option,setOption]=useState('menu')
    const [selectedLocation,setSelectedLocation]=useState("Coimbatore")
    const [searchResult,setSearchResult]=useState()
    const [orderPopup,setOrderPopup]=useState(false)
    const [bookingDetails, setBookingDetails] = useState({
        date: null,
        time: null,
        guests: 2,
      });
    const[adminlogin,setAdminlogin]=useState(false)

    useEffect(() => {
        localStorage.setItem('sharedState', sharedState);
    }, [sharedState]);
  

    useEffect(() => {
        localStorage.setItem('closelogin', JSON.stringify(closelogin));
    }, [closelogin]);
    useEffect(() => {
        localStorage.setItem('carthotel', JSON.stringify(carthotel));
    }, [carthotel]);

    useEffect(() => {
        localStorage.setItem('userdetails', JSON.stringify(userdetails));
    }, [userdetails]);

    useEffect(() => {
        localStorage.setItem('usercomponent', JSON.stringify(usercomponent));
    }, [usercomponent]);

    useEffect(() => {
        localStorage.setItem('menu', JSON.stringify(menu));
    }, [menu]);

    useEffect(() => {
        localStorage.setItem('reg', JSON.stringify(reg));
    }, [reg]);
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <MyContext.Provider value={{
            sharedState, setSharedState,
            closelogin, setCloseLogin,
            userdetails, setUserdetails,
            usercomponent, setUsercomponent,
            menu, setMenu,
            reg, setReg,
            option,setOption,
            selectedLocation,setSelectedLocation,
            searchResult,setSearchResult,
            cartItems, setCartItems,
            orderPopup,setOrderPopup,
            bookingDetails,setBookingDetails,
            carthotel,setCarthotel,
            dietoption,setDietoption,
            diet,setDiet,
            adminlogin,setAdminlogin
        }}>
            {children}
        </MyContext.Provider>
    );
};

export { MyContext, MyProvider };
