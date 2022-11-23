import {Routes, Route} from 'react-router-dom';


import CreateQA from '../Components/CreateQA';
import Login from '../Components/Login';
import Registration from '../Components/Registration';
import GetQA from '../Components/GetQA';

const BaseRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Registration />} />
            <Route path='/get' element={<GetQA />} />
            <Route path='/create' element={<CreateQA />} />
        </Routes>
    )
}

export default BaseRoutes