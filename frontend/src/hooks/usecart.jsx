import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../Firebase/AuthProvider';


const useCart = () => {
    const { user } = useContext(AuthContext);
   
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/cart?email=${user?.email}`);
                
                if (!res.ok) {
                    throw new Error('Failed to fetch cart items');
                }

                const jsonData = await res.json();
                console.log(jsonData); // This will log the JSON data returned by the server

                return jsonData;
            } catch (error) {
                console.error('Error fetching cart items:', error);
                throw error; // Rethrow the error to be caught by React Query
            }
        },
    });

    return [cart, refetch];
}

export default useCart;
