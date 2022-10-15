import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import EmployeeList from "./components/employeeList";

const App = () => {
return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<EmployeeList />}>
      </Route>
    </Routes>
  </BrowserRouter>
)
}

export default App;
