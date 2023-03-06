import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import Home from "./pages/Home/Home";
import LoginForm from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./utils/protectedRoute";
import { useEffect } from "react";
import { AuthLayout } from "./utils/authLayout";
import Welcome from "./pages/Welcome/Welcome";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route element={<AuthLayout />}>
				<Route path="/" element={<Welcome />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
					errorElement={<NotFound />}
				/>
				<Route path="/login" element={<LoginForm />} />
			</Route>
		</>
	)
);

function App() {
	useEffect(() => {}, []);

	return (
		<ChakraProvider>
			<RouterProvider router={router} />
		</ChakraProvider>
	);
}
export default App;
