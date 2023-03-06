import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import { useAuth } from "./authProvider";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }): any => {
	const { user } = useAuth();

	if (!user) {
		return (
			<>
				<Header />
				<Navigate to="/login" />
			</>
		);
	}

	return children;
};

export default ProtectedRoute;
