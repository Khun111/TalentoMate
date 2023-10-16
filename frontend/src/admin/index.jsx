import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest"

const dataProvider = simpleRestProvider("https://localhost:5000/employee");

const App = () => (
    <Admin dataProvider={dataProvider}>
        <Resource name="employees" list={ListGuesser} />
    </Admin>
);

export default App;