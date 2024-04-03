import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
           
            const response = await fetch(`http://localhost:5001/api/v1/cart/email?email=${user?.email}`, 
                
            );
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setCart(data);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) {
            fetchData();
        }
    }, [user?.email]);

    const refetch = async () => {
       
     fetchData();
    };

     return [cart, loading, refetch ] 
};

export default useCart;
