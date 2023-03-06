import { Button, Center, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginForm: React.FC<any> = ({ formData, handleChange, handleSubmit }) => {
	return (
		<Center height="100vh">
			<div>
				<form>
					<FormControl id="identifier">
						<FormLabel>Email:</FormLabel>
						<Input type="identifier" name="identifier" value={formData.identifier} onChange={handleChange} />
					</FormControl>
					<FormControl id="password">
						<FormLabel>Password:</FormLabel>
						<Input type="password" name="password" value={formData.password} onChange={handleChange} />
					</FormControl>
					<Button onClick={e => handleSubmit(e)} type="submit">
						Login
					</Button>
				</form>
			</div>
		</Center>
	);
};

export default LoginForm;
