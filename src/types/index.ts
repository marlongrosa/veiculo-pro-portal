
export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  year: number;
  mileage: number;
  transmission: 'Manual' | 'Automático';
  fuel: 'Gasolina' | 'Etanol' | 'Diesel' | 'Elétrico' | 'Flex';
  images: string[];
  location: {
    state: string;
    city: string;
    region: string;
  };
  licensePlate?: string;
  description?: string;
  features?: string[];
  color?: string;
  status: 'available' | 'sold' | 'reserved';
  sellerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Seller {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  email?: string;
}

export interface Proposal {
  id: string;
  vehicleId: string;
  vehicleTitle: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
}

export interface FilterOptions {
  brand?: string;
  model?: string;
  state?: string;
  city?: string;
  region?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  transmission?: 'Manual' | 'Automático' | 'all' | '';
  fuel?: 'Gasolina' | 'Etanol' | 'Diesel' | 'Elétrico' | 'Flex' | 'all' | '';
  search?: string;
}

export interface DashboardData {
  totalVehicles: number;
  totalSold: number;
  topBrand: string;
  totalProposals: number;
  sales: {
    label: string;
    value: number;
  }[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
