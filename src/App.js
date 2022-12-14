import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Base />,
            children: [
                {
                    path: '/',
                    element: <TavaratKiertoon />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
