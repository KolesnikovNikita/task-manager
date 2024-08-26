import HomePage from './pages/HomePage';
import { TaskProvider } from './context/TaskContext';
import './styles/index.css';

function App() {
    return (
        <TaskProvider>
            <HomePage />
        </TaskProvider>
    );
}

export default App;
