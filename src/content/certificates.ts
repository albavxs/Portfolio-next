export interface Certificate {
  image: string;
  title: string;
  institution: string;
  hours: number;
}

export const certificates: Certificate[] = [
  { image: "/images/certificados/4564566.jpg", title: "Sistemas Computacionais e Segurança", institution: "IBMR", hours: 160 },
  { image: "/images/certificados/175093.jpg", title: "Usabilidade, Dev Web, Mobile e Jogos", institution: "IBMR", hours: 160 },
  { image: "/images/certificados/1750976520133.jpg", title: "Teoria da Computação e Compiladores", institution: "IBMR", hours: 160 },
  { image: "/images/certificados/45645.jpg", title: "Programação de Soluções Computacionais", institution: "IBMR / Oracle Academy", hours: 160 },
  { image: "/images/certificados/34536.jpg", title: "Azure Cloud Computing com IA", institution: "São Judas / IBMR", hours: 30 },
];
