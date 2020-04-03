//ligação entre backend com o frontend
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export default api;
//todos conseguem importar ele