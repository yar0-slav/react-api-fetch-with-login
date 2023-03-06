export interface LoginCredentials {
	identifier: string;
	password: string;
}

export interface LoginFormData {
	identifier: string;
	password: string;
}

export interface ButtonProps {
	onClick: (e: any) => void;
	label: string;
	type?: ButtonType;
}

export interface loginFormSubmit {
	onSubmit: (email: string, password: string) => void;
}

export interface IAuthContext {
	user: AuthenticatedUser | null;
	onLogin: (data: LoginCredentials) => Promise<void>;
	onLogout: () => void;
}

export interface AuthenticatedUser {
	jwt: string;
	user: UserData;
}

interface UserData {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface Meter {
	id: number;
	submitted_at?: string;
	submitted_by?: string;
	installed_at?: string;
	installed_by?: string;
	owner?: string;
	owner_type?: string;
	tenant?: string;
	monitored_entity?: string;
	note?: string;
	serial_number?: string;
	meter_type?: string;
	rssi?: number;
	lat?: number;
	lng?: number;
	new_meter?: boolean;
	submeter?: boolean;
	building_floor?: string;
	manufactured?: string;
	calibrated?: string;
	backend_gateway_meter_id?: number;
	unit?: string;
	accessibility?: string;
	meter_mount_type?: string;
	remote_reading_owner?: string;
	remote_reading_serial?: string;
	floorplan_lat?: number;
	floorplan_lng?: number;
	code?: string;
	factor?: number;
	data_source_id?: number;
	initial_offset?: number;
	data_source_channel?: string;
	createdAt?: string;
	updatedAt?: string;
	lorawan_rssi?: number;
	nbiot_rssi?: number;
}

export interface EditButtonsProps {
	onAttributeSave: () => void;
	onCancelEdit: () => void;
}

export interface EditingField {
	meter: Meter;
	attribute?: keyof Meter;
}

export interface MeterComponentProps {
	meterData: Meter[];
	tableHeaders: string[];
	editingField: EditingField | null;
	setEditingField: React.Dispatch<React.SetStateAction<EditingField | null>>;
	handleAttributeEdit: (meter: Meter, event: React.MouseEvent<HTMLButtonElement>, attribute: keyof Meter) => void;
	handleAttributeSave: (meter: Meter, attribute: keyof Meter, value: string) => Promise<void>;
	handleCancelEdit: () => void;
	handleSort?: (clickedHeader: string) => Promise<void>;
	isLoading?: boolean;
}

export type AlertType = "info" | "warning" | "success" | "error" | "loading" | undefined;

type ButtonType = "submit" | "reset" | "button";

export type StorageValue<T> = [T, (value: T) => void];
