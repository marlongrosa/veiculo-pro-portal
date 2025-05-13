
import { Vehicle, Seller, Proposal, User } from '../types';

// Mock vehicle data
export const vehicles: Vehicle[] = [
  {
    id: "1",
    title: "Toyota Corolla XEi",
    brand: "Toyota",
    model: "Corolla",
    price: 105990,
    year: 2022,
    mileage: 32000,
    transmission: "Automático",
    fuel: "Flex",
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000",
      "https://images.unsplash.com/photo-1619405399517-a5a85a4e0c47?q=80&w=1000",
    ],
    location: {
      state: "São Paulo",
      city: "São Paulo",
      region: "Zona Sul"
    },
    description: "Carro em excelente estado, único dono, todas as revisões em concessionária, IPVA pago.",
    features: ["Câmera de ré", "Sensor de estacionamento", "Bancos de couro", "Central multimídia"],
    color: "Preto",
    status: "available",
    sellerId: "1",
    createdAt: new Date("2023-10-15"),
    updatedAt: new Date("2023-10-15"),
  },
  {
    id: "2",
    title: "Honda Civic Touring",
    brand: "Honda",
    model: "Civic",
    price: 159900,
    year: 2023,
    mileage: 8000,
    transmission: "Automático",
    fuel: "Gasolina",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000",
    ],
    location: {
      state: "São Paulo",
      city: "Campinas",
      region: "Centro"
    },
    description: "Versão top de linha, teto solar, piloto automático adaptativo, carro na garantia de fábrica.",
    features: ["Teto solar", "ACC", "CarPlay", "Couro"],
    color: "Prata",
    status: "available",
    sellerId: "2",
    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-11-05"),
  },
  {
    id: "3",
    title: "Jeep Compass Limited",
    brand: "Jeep",
    model: "Compass",
    price: 189990,
    year: 2023,
    mileage: 12000,
    transmission: "Automático",
    fuel: "Diesel",
    images: [
      "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?q=80&w=2000",
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1000",
    ],
    location: {
      state: "Rio de Janeiro",
      city: "Rio de Janeiro",
      region: "Zona Oeste"
    },
    description: "SUV completo, 4x4, diesel, tração nas quatro rodas, ideal para família.",
    features: ["4x4", "Diesel", "7 lugares", "GPS integrado"],
    color: "Branco",
    status: "available",
    sellerId: "3",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01"),
  },
  {
    id: "4",
    title: "Volkswagen Golf GTI",
    brand: "Volkswagen",
    model: "Golf",
    price: 249900,
    year: 2023,
    mileage: 3000,
    transmission: "Automático",
    fuel: "Gasolina",
    images: [
      "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?q=80&w=2000",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?q=80&w=1000",
    ],
    location: {
      state: "Minas Gerais",
      city: "Belo Horizonte",
      region: "Centro"
    },
    description: "Versão esportiva, carro zero km, pronto para entrega.",
    features: ["Turbo", "Rodas 18\"", "Som premium", "Teto panorâmico"],
    color: "Vermelho",
    status: "available",
    sellerId: "2",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "5",
    title: "Fiat Toro Ranch",
    brand: "Fiat",
    model: "Toro",
    price: 179900,
    year: 2023,
    mileage: 15000,
    transmission: "Automático",
    fuel: "Diesel",
    images: [
      "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=80&w=2000",
      "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?q=80&w=1000",
    ],
    location: {
      state: "Paraná",
      city: "Curitiba",
      region: "Norte"
    },
    description: "Picape intermediária, diesel, ideal para trabalho e lazer.",
    features: ["Caçamba", "Diesel", "4x4", "Multimídia"],
    color: "Marrom",
    status: "sold",
    sellerId: "1",
    createdAt: new Date("2023-09-20"),
    updatedAt: new Date("2023-09-20"),
  },
  {
    id: "6",
    title: "Hyundai HB20 Comfort",
    brand: "Hyundai",
    model: "HB20",
    price: 78900,
    year: 2022,
    mileage: 25000,
    transmission: "Manual",
    fuel: "Flex",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2000",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1000",
    ],
    location: {
      state: "Santa Catarina",
      city: "Florianópolis",
      region: "Centro"
    },
    description: "Compacto econômico, ideal para cidade, revisado recentemente.",
    features: ["Bluetooth", "Ar condicionado", "Direção hidráulica", "Vidros elétricos"],
    color: "Prata",
    status: "available",
    sellerId: "3",
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-15"),
  },
];

// Mock sellers data
export const sellers: Seller[] = [
  {
    id: "1",
    name: "Roberto Oliveira",
    phone: "11987654321",
    city: "São Paulo",
    state: "São Paulo",
    email: "roberto@example.com"
  },
  {
    id: "2",
    name: "Carlos Mendes",
    phone: "21987654321",
    city: "Rio de Janeiro",
    state: "Rio de Janeiro",
    email: "carlos@example.com"
  },
  {
    id: "3",
    name: "Amanda Silva",
    phone: "31987654321",
    city: "Belo Horizonte",
    state: "Minas Gerais",
    email: "amanda@example.com"
  }
];

// Mock proposals data
export const proposals: Proposal[] = [
  {
    id: "1",
    vehicleId: "1",
    vehicleTitle: "Toyota Corolla XEi",
    name: "João Silva",
    email: "joao@example.com",
    phone: "11912345678",
    message: "Tenho interesse no veículo. Aceita troca com um Civic 2020?",
    status: "new",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    vehicleId: "3",
    vehicleTitle: "Jeep Compass Limited",
    name: "Maria Souza",
    email: "maria@example.com",
    phone: "21912345678",
    message: "Qual o menor valor à vista?",
    status: "contacted",
    createdAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    vehicleId: "4",
    vehicleTitle: "Volkswagen Golf GTI",
    name: "Pedro Santos",
    email: "pedro@example.com",
    phone: "31912345678",
    message: "Posso fazer uma visita amanhã para ver o carro?",
    status: "new",
    createdAt: new Date("2024-01-20"),
  }
];

// Mock users data
export const users: User[] = [
  {
    id: "1",
    email: "admin@autoadmin.com",
    name: "Administrador",
    role: "admin"
  },
  {
    id: "2",
    email: "gerente@autoadmin.com",
    name: "Gerente",
    role: "manager"
  }
];

// Mock password (in a real app, you'd never do this - use proper authentication)
export const MOCK_PASSWORD = "admin123";

// Mock states and cities
export const states = [
  "São Paulo",
  "Rio de Janeiro",
  "Minas Gerais",
  "Paraná",
  "Santa Catarina",
  "Rio Grande do Sul",
  "Bahia",
  "Ceará",
  "Pernambuco"
];

export const cities: Record<string, string[]> = {
  "São Paulo": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "Guarulhos"],
  "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis", "Angra dos Reis", "Cabo Frio"],
  "Minas Gerais": ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Contagem", "Betim"],
  "Paraná": ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
  "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "Balneário Camboriú", "Criciúma"],
  "Rio Grande do Sul": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
  "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna"],
  "Ceará": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
  "Pernambuco": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"]
};

export const brands = [
  "Toyota", 
  "Honda", 
  "Volkswagen", 
  "Fiat", 
  "Chevrolet", 
  "Hyundai", 
  "Jeep", 
  "Nissan", 
  "Ford", 
  "Mercedes-Benz"
];

export const models: Record<string, string[]> = {
  "Toyota": ["Corolla", "Yaris", "Hilux", "RAV4", "SW4"],
  "Honda": ["Civic", "City", "HR-V", "Fit", "WR-V"],
  "Volkswagen": ["Golf", "Polo", "T-Cross", "Nivus", "Taos"],
  "Fiat": ["Toro", "Strada", "Argo", "Mobi", "Pulse"],
  "Chevrolet": ["Onix", "Tracker", "S10", "Cruze", "Spin"],
  "Hyundai": ["HB20", "Creta", "Tucson", "i30", "Santa Fe"],
  "Jeep": ["Compass", "Renegade", "Commander", "Wrangler", "Cherokee"],
  "Nissan": ["Kicks", "Versa", "Frontier", "Sentra", "March"],
  "Ford": ["Ranger", "Territory", "Bronco", "Mustang", "Maverick"],
  "Mercedes-Benz": ["Classe A", "Classe C", "Classe E", "GLA", "GLC"]
};

// Mock dashboard data
export const dashboardData: Record<string, any> = {
  cards: {
    totalVehicles: vehicles.length,
    totalSold: vehicles.filter(v => v.status === 'sold').length,
    topBrand: "Toyota",
    totalProposals: proposals.length
  },
  charts: {
    salesByBrand: [
      { name: "Toyota", value: 32 },
      { name: "Honda", value: 27 },
      { name: "Volkswagen", value: 22 },
      { name: "Fiat", value: 18 },
      { name: "Others", value: 21 }
    ],
    salesByMonth: [
      { name: "Jan", value: 12 },
      { name: "Feb", value: 19 },
      { name: "Mar", value: 15 },
      { name: "Apr", value: 21 },
      { name: "May", value: 25 },
      { name: "Jun", value: 18 },
      { name: "Jul", value: 22 },
      { name: "Aug", value: 30 },
      { name: "Sep", value: 27 },
      { name: "Oct", value: 28 },
      { name: "Nov", value: 35 },
      { name: "Dec", value: 32 }
    ]
  }
};
