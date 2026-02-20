// 硬件数据定义

export interface CPU {
  id: string;
  name: string;
  brand: 'AMD' | 'Intel';
  platform: 'AM4' | 'AM5' | 'LGA1700' | 'LGA1851';
  series: string;
  cores: number;
  threads: number;
  baseClock: number;
  tdp: number;
  price: number;
  performance: number; // 0-10
  hasIntegratedGraphics?: Boolean;
}

export interface Motherboard {
  id: string;
  name: string;
  platform: 'AM4' | 'AM5' | 'LGA1700' | 'LGA1851';
  chipset: string;
  memoryType: 'DDR4' | 'DDR5';
  formFactor: 'ITX' | 'MATX' | 'ATX' | 'E-ATX';
  price: number;
}

export interface GPU {
  id: string;
  name: string;
  brand: 'NVIDIA' | 'AMD' | 'Intel';
  series: string;
  vram: number;
  tdp: number;
  price: number;
  performance: number; // 0-10
}

export interface Memory {
  id: string;
  name: string;
  type: 'DDR4' | 'DDR5';
  speed: number;
  capacity: number;
  price: number;
  performance: number; // 0-10, 基于带宽计算: 频率*64/8000
}

export interface Storage {
  id: string;
  name: string;
  type: 'PCIe 3' | 'PCIe 4' | 'PCIe 5' | 'HDD';
  capacity: number;
  price: number;
}

export interface PSU {
  id: string;
  name: string;
  wattage: number;
  price: number;
}

export interface Cooler {
  id: string;
  name: string;
  type: '风冷' | '水冷';
  spec: string;
  price: number;
}

export interface Case {
  id: string;
  name: string;
  formFactor: 'ITX' | 'MATX' | 'ATX' | 'E-ATX' | 'OpenPlatform';
  price: number;
}

export const cpuData: CPU[] = [
  // CPU 数据 - 基于2026年基准测试重新评估
  // AMD Ryzen 3 - AM4 (低端CPU，分数在1-3范围内)
  { id: 'r3-1200', name: 'Ryzen 3 1200', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 4, baseClock: 3.1, tdp: 65, price: 45, performance: 1.2 },
  { id: 'r3-1300x', name: 'Ryzen 3 1300X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 4, baseClock: 3.5, tdp: 65, price: 55, performance: 1.4 },
  { id: 'r3-2200g', name: 'Ryzen 3 2200G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 4, baseClock: 3.5, tdp: 65, price: 110, performance: 1.6 },
  { id: 'r3-3100', name: 'Ryzen 3 3100', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 3.6, tdp: 65, price: 180, performance: 2.1 },
  { id: 'r3-3200g', name: 'Ryzen 3 3200G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 4, baseClock: 3.6, tdp: 65, price: 200, performance: 1.8 },
  { id: 'r3-3300x', name: 'Ryzen 3 3300X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 3.8, tdp: 65, price: 250, performance: 2.4 },
  { id: 'r3-4100', name: 'Ryzen 3 4100', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 3.8, tdp: 65, price: 220, performance: 2.2 },
  { id: 'r3-5300g', name: 'Ryzen 3 5300G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 4.0, tdp: 65, price: 559, performance: 2.5 },
  { id: 'r3-5300ge', name: 'Ryzen 3 5300GE', brand: 'AMD', platform: 'AM4', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 3.8, tdp: 35, price: 467, performance: 2.3 },
  
  // AMD Ryzen 3 - AM5
  { id: 'r3-8300g', name: 'Ryzen 3 8300G', brand: 'AMD', platform: 'AM5', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 4.5, tdp: 65, price: 699, performance: 3.2 },
  { id: 'r3-8300ge', name: 'Ryzen 3 8300GE', brand: 'AMD', platform: 'AM5', series: 'Ryzen 3', cores: 4, threads: 8, baseClock: 4.6, tdp: 65, price: 599, performance: 3.0 },

  // AMD Ryzen 5 - AM4 (入门级到中端)
  { id: 'r5-1400', name: 'Ryzen 5 1400', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 4, threads: 8, baseClock: 3.2, tdp: 65, price: 60, performance: 1.7 },
  { id: 'r5-1500x', name: 'Ryzen 5 1500X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 4, threads: 8, baseClock: 3.5, tdp: 65, price: 113, performance: 1.9 },
  { id: 'r5-1600', name: 'Ryzen 5 1600', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.2, tdp: 65, price: 115, performance: 2.3 },
  { id: 'r5-1600x', name: 'Ryzen 5 1600X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.6, tdp: 95, price: 120, performance: 2.6 },
  { id: 'r5-2400g', name: 'Ryzen 5 2400G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 4, threads: 8, baseClock: 3.6, tdp: 65, price: 220, performance: 2.0 },
  { id: 'r5-2600', name: 'Ryzen 5 2600', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.4, tdp: 65, price: 170, performance: 2.8 },
  { id: 'r5-2600x', name: 'Ryzen 5 2600X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.6, tdp: 95, price: 200, performance: 3.0 },
  { id: 'r5-3400g', name: 'Ryzen 5 3400G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 4, threads: 8, baseClock: 3.7, tdp: 65, price: 340, performance: 2.9 },
  { id: 'r5-3500x', name: 'Ryzen 5 3500X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 6, baseClock: 3.6, tdp: 65, price: 240, performance: 3.1 },
  { id: 'r5-3600x', name: 'Ryzen 5 3600X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.8, tdp: 95, price: 420, performance: 3.5 },
  { id: 'r5-4500', name: 'Ryzen 5 4500', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.6, tdp: 65, price: 350, performance: 3.2 },
  { id: 'r5-4600g', name: 'Ryzen 5 4600G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.7, tdp: 65, price: 550, performance: 3.3 },
  { id: 'r5-5500', name: 'Ryzen 5 5500', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.6, tdp: 65, price: 430, performance: 3.6 },
  { id: 'r5-5500gt', name: 'Ryzen 5 5500GT', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.6, tdp: 65, price: 700, performance: 3.7 },
  { id: 'r5-5600', name: 'Ryzen 5 5600', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.5, tdp: 65, price: 550, performance: 4.1 },
  { id: 'r5-5600f', name: 'Ryzen 5 5600F', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.5, tdp: 65, price: 600, performance: 4.0, hasIntegratedGraphics: false },
  { id: 'r5-5600g', name: 'Ryzen 5 5600G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.9, tdp: 65, price: 699, performance: 3.9 },
  { id: 'r5-5600x', name: 'Ryzen 5 5600X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.7, tdp: 65, price: 799, performance: 4.2 },

  // AMD Ryzen 5 - AM5 (中端到中高端)
  { id: 'r5-7400f', name: 'Ryzen 5 7400F', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.0, tdp: 65, price: 760, performance: 5.1, hasIntegratedGraphics: false },
  { id: 'r5-7500f', name: 'Ryzen 5 7500F', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.7, tdp: 65, price: 829, performance: 5.2, hasIntegratedGraphics: false },
  { id: 'r5-7600', name: 'Ryzen 5 7600', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 3.8, tdp: 65, price: 1209, performance: 5.6 },
  { id: 'r5-7600x', name: 'Ryzen 5 7600X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.7, tdp: 105, price: 1099, performance: 5.8 },
  { id: 'r5-8400f', name: 'Ryzen 5 8400F', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.2, tdp: 65, price: 899, performance: 5.7, hasIntegratedGraphics: false },
  { id: 'r5-8500g', name: 'Ryzen 5 8500G', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.1, tdp: 65, price: 1099, performance: 5.8 },
  { id: 'r5-8600g', name: 'Ryzen 5 8600G', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.3, tdp: 65, price: 1199, performance: 6.1 },
  { id: 'r5-9500f', name: 'Ryzen 5 9500F', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 4.8, tdp: 65, price: 1299, performance: 6.4, hasIntegratedGraphics: false },
  { id: 'r5-9600x', name: 'Ryzen 5 9600x', brand: 'AMD', platform: 'AM5', series: 'Ryzen 5', cores: 6, threads: 12, baseClock: 5.0, tdp: 65, price: 1499, performance: 6.6 },

  // AMD Ryzen 7 - AM4 (中高端)
  { id: 'r7-1700', name: 'Ryzen 7 1700', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.0, tdp: 65, price: 145, performance: 2.7 },
  { id: 'r7-1700x', name: 'Ryzen 7 1700X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.4, tdp: 95, price: 190, performance: 3.0 },
  { id: 'r7-1800x', name: 'Ryzen 7 1800X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.6, tdp: 95, price: 230, performance: 3.3 },
  { id: 'r7-2700', name: 'Ryzen 7 2700', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.2, tdp: 65, price: 250, performance: 3.4 },
  { id: 'r7-2700x', name: 'Ryzen 7 2700X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.7, tdp: 105, price: 300, performance: 3.7 },
  { id: 'r7-3700x', name: 'Ryzen 7 3700X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.6, tdp: 65, price: 450, performance: 4.3 },
  { id: 'r7-3800x', name: 'Ryzen 7 3800X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.9, tdp: 105, price: 480, performance: 4.6 },
  { id: 'r7-3800xt', name: 'Ryzen 7 3800XT', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.9, tdp: 105, price: 588, performance: 4.7 },
  { id: 'r7-5700', name: 'Ryzen 7 5700', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.7, tdp: 65, price: 850, performance: 5.0 },
  { id: 'r7-5700x', name: 'Ryzen 7 5700X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.4, tdp: 65, price: 879, performance: 5.1 },
  { id: 'r7-5700g', name: 'Ryzen 7 5700G', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.8, tdp: 65, price: 888, performance: 4.8 },
  { id: 'r7-5700x3d', name: 'Ryzen 7 5700X3D', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.0, tdp: 105, price: 1689, performance: 5.5 },
  { id: 'r7-5800x', name: 'Ryzen 7 5800X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.8, tdp: 105, price: 900, performance: 5.4 },
  { id: 'r7-5800x3d', name: 'Ryzen 7 5800X3D', brand: 'AMD', platform: 'AM4', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.4, tdp: 105, price: 2199, performance: 5.7 },

  // AMD Ryzen 7 - AM5 (高端)
  { id: 'r7-7700', name: 'Ryzen 7 7700', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.8, tdp: 65, price: 1499, performance: 6.8 },
  { id: 'r7-7700x', name: 'Ryzen 7 7700X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.5, tdp: 105, price: 1599, performance: 7.0 },
  { id: 'r7-7800x3d', name: 'Ryzen 7 7800X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.2, tdp: 120, price: 2199, performance: 7.3 },
  { id: 'r7-8700g', name: 'Ryzen 7 8700G', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.2, tdp: 65, price: 1599, performance: 6.5 },
  { id: 'r7-8700f', name: 'Ryzen 7 8700F', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.1, tdp: 65, price: 1099, performance: 6.6, hasIntegratedGraphics: false },
  { id: 'r7-9700x', name: 'Ryzen 7 9700X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 3.8, tdp: 65, price: 1799, performance: 7.5 },
  { id: 'r7-9800x3d', name: 'Ryzen 7 9800X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.7, tdp: 120, price: 3199, performance: 7.8 },
  { id: 'r7-9850x3d', name: 'Ryzen 7 9850X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 7', cores: 8, threads: 16, baseClock: 4.8, tdp: 120, price: 3699, performance: 7.9 },

  // AMD Ryzen 9 - AM4 (高端到旗舰)
  { id: 'r9-3900x', name: 'Ryzen 9 3900X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 3.8, tdp: 105, price: 830, performance: 5.3 },
  { id: 'r9-3900xt', name: 'Ryzen 9 3900XT', brand: 'AMD', platform: 'AM4', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 3.8, tdp: 105, price: 899, performance: 5.4 },
  { id: 'r9-3950x', name: 'Ryzen 9 3950X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 3.5, tdp: 105, price: 1299, performance: 6.0 },
  { id: 'r9-5900x', name: 'Ryzen 9 5900X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 3.7, tdp: 105, price: 1399, performance: 6.5 },
  { id: 'r9-5950x', name: 'Ryzen 9 5950X', brand: 'AMD', platform: 'AM4', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 3.4, tdp: 105, price: 1899, performance: 7.2 },

  // AMD Ryzen 9 - AM5 (旗舰级)
  { id: 'r9-7900', name: 'Ryzen 9 7900', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 3.7, tdp: 65, price: 2099, performance: 8.2 },
  { id: 'r9-7900x', name: 'Ryzen 9 7900X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 4.7, tdp: 170, price: 2299, performance: 8.4 },
  { id: 'r9-7900x3d', name: 'Ryzen 9 7900X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 4.4, tdp: 120, price: 3999, performance: 8.6 },
  { id: 'r9-7950x', name: 'Ryzen 9 7950X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 4.5, tdp: 170, price: 2799, performance: 8.8 },
  { id: 'r9-7950x3d', name: 'Ryzen 9 7950X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 4.2, tdp: 120, price: 5499, performance: 9.0 },
  { id: 'r9-9900x', name: 'Ryzen 9 9900X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 4.4, tdp: 120, price: 2599, performance: 8.7 },
  { id: 'r9-9950x', name: 'Ryzen 9 9950X', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 4.3, tdp: 170, price: 3899, performance: 9.1 },
  { id: 'r9-9900x3d', name: 'Ryzen 9 9900X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 12, threads: 24, baseClock: 4.5, tdp: 120, price: 4499, performance: 8.9 },
  { id: 'r9-9950x3d', name: 'Ryzen 9 9950X3D', brand: 'AMD', platform: 'AM5', series: 'Ryzen 9', cores: 16, threads: 32, baseClock: 4.4, tdp: 120, price: 5099, performance: 9.4 },

  // Intel Core i3 (入门级)
  { id: 'i3-12100f', name: 'Intel Core i3-12100F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.3, tdp: 60, price: 469, performance: 3.8, hasIntegratedGraphics: false },
  { id: 'i3-12100', name: 'Intel Core i3-12100', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.3, tdp: 60, price: 699, performance: 3.9 },
  { id: 'i3-12300', name: 'Intel Core i3-12300', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.5, tdp: 60, price: 899, performance: 4.1 },
  { id: 'i3-13100', name: 'Intel Core i3-13100', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.4, tdp: 60, price: 899, performance: 4.2 },
  { id: 'i3-13100f', name: 'Intel Core i3-13100F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.4, tdp: 58, price: 509, performance: 4.1, hasIntegratedGraphics: false },
  { id: 'i3-14100', name: 'Intel Core i3-14100', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.5, tdp: 60, price: 999, performance: 4.3 },
  { id: 'i3-14100f', name: 'Intel Core i3-14100F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 3', cores: 4, threads: 8, baseClock: 3.5, tdp: 58, price: 529, performance: 4.2, hasIntegratedGraphics: false },

  // Intel Core i5 (中端)
  { id: 'i5-12400', name: 'Intel Core i5-12400', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 2.5, tdp: 65, price: 899, performance: 4.8 },
  { id: 'i5-12400f', name: 'Intel Core i5-12400F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 2.5, tdp: 65, price: 779, performance: 4.7, hasIntegratedGraphics: false },
  { id: 'i5-12490f', name: 'Intel Core i5-12490F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 3.0, tdp: 65, price: 929, performance: 4.9, hasIntegratedGraphics: false },
  { id: 'i5-12500', name: 'Intel Core i5-12500', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 3.0, tdp: 65, price: 1150, performance: 5.0 },
  { id: 'i5-12500t', name: 'Intel Core i5-12500T', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 2.0, tdp: 35, price: 1050, performance: 4.5 },
  { id: 'i5-12600', name: 'Intel Core i5-12600', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 6, threads: 12, baseClock: 3.3, tdp: 65, price: 1499, performance: 5.2 },
  { id: 'i5-12600kf', name: 'Intel Core i5-12600KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 3.7, tdp: 125, price: 1199, performance: 5.8, hasIntegratedGraphics: false },
  { id: 'i5-12600k', name: 'Intel Core i5-12600K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 3.7, tdp: 125, price: 1299, performance: 5.8 },
  { id: 'i5-13400', name: 'Intel Core i5-13400', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 2.5, tdp: 65, price: 1399, performance: 5.2 },
  { id: 'i5-13400f', name: 'Intel Core i5-13400F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 2.5, tdp: 65, price: 899, performance: 5.2, hasIntegratedGraphics: false },
  { id: 'i5-13490f', name: 'Intel Core i5-13490F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 2.5, tdp: 65, price: 1099, performance: 5.4, hasIntegratedGraphics: false },
  { id: 'i5-13500t', name: 'Intel Core i5-13500T', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 1.6, tdp: 35, price: 1199, performance: 5.1 },
  { id: 'i5-13600', name: 'Intel Core i5-13600', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 2.7, tdp: 65, price: 1299, performance: 5.9 },
  { id: 'i5-13600k', name: 'Intel Core i5-13600K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 3.5, tdp: 125, price: 1199, performance: 6.5 },
  { id: 'i5-13600kf', name: 'Intel Core i5-13600KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 3.5, tdp: 125, price: 1199, performance: 6.5, hasIntegratedGraphics: false },
  { id: 'i5-14400f', name: 'Intel Core i5-14400F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 2.5, tdp: 65, price: 1099, performance: 5.5, hasIntegratedGraphics: false },
  { id: 'i5-14490f', name: 'Intel Core i5-14490F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 10, threads: 16, baseClock: 2.5, tdp: 65, price: 1100, performance: 5.6, hasIntegratedGraphics: false },
  { id: 'i5-14500', name: 'Intel Core i5-14500', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 2.6, tdp: 65, price: 1400, performance: 6.0 },
  { id: 'i5-14600', name: 'Intel Core i5-14600', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 2.7, tdp: 65, price: 1899, performance: 6.1 },
  { id: 'i5-14600k', name: 'Intel Core i5-14600K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 3.5, tdp: 125, price: 1499, performance: 6.8 },
  { id: 'i5-14600kf', name: 'Intel Core i5-14600KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 5', cores: 14, threads: 20, baseClock: 3.5, tdp: 125, price: 1499, performance: 6.8, hasIntegratedGraphics: false },
  { id: 'i5-245k', name: 'Intel Core 5 245K', brand: 'Intel', platform: 'LGA1851', series: 'Intel 5', cores: 14, threads: 14, baseClock: 4.2, tdp: 159, price: 1399, performance: 6.8 },
  { id: 'i5-245kf', name: 'Intel Core 5 245KF', brand: 'Intel', platform: 'LGA1851', series: 'Intel 5', cores: 14, threads: 14, baseClock: 4.2, tdp: 159, price: 1399, performance: 6.8, hasIntegratedGraphics: false },
  { id: 'i5-230', name: 'Intel Core 5 230', brand: 'Intel', platform: 'LGA1851', series: 'Intel 5', cores: 10, threads: 10, baseClock: 4.0, tdp: 106, price: 929, performance: 6.2 },
  { id: 'i5-225f', name: 'Intel Core 5 225F', brand: 'Intel', platform: 'LGA1851', series: 'Intel 5', cores: 10, threads: 10, baseClock: 3.9, tdp: 106, price: 899, performance: 6.0, hasIntegratedGraphics: false },

  // Intel Core i7 (高端)
  { id: 'i7-12700', name: 'Intel Core i7-12700', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 12, threads: 20, baseClock: 2.1, tdp: 65, price: 1815, performance: 6.4 },
  { id: 'i7-12700f', name: 'Intel Core i7-12700F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 12, threads: 20, baseClock: 2.1, tdp: 65, price: 1989, performance: 6.3, hasIntegratedGraphics: false },
  { id: 'i7-12700kf', name: 'Intel Core i7-12700KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 12, threads: 20, baseClock: 3.6, tdp: 125, price: 1599, performance: 6.5, hasIntegratedGraphics: false },
  { id: 'i7-12700k', name: 'Intel Core i7-12700K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 12, threads: 20, baseClock: 3.6, tdp: 125, price: 1675, performance: 6.5 },
  { id: 'i7-13700', name: 'Intel Core i7-13700', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 16, threads: 24, baseClock: 2.1, tdp: 65, price: 2599, performance: 7.0 },
  { id: 'i7-13700f', name: 'Intel Core i7-13700F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 16, threads: 24, baseClock: 2.1, tdp: 65, price: 1599, performance: 7.1, hasIntegratedGraphics: false },
  { id: 'i7-13700k', name: 'Intel Core i7-13700K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 16, threads: 24, baseClock: 3.4, tdp: 125, price: 2399, performance: 7.5 },
  { id: 'i7-13700kf', name: 'Intel Core i7-13700KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 16, threads: 24, baseClock: 3.4, tdp: 125, price: 2099, performance: 7.5, hasIntegratedGraphics: false },
  { id: 'i7-14700', name: 'Intel Core i7-14700', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 20, threads: 28, baseClock: 2.1, tdp: 65, price: 2499, performance: 7.3 },
  { id: 'i7-14700f', name: 'Intel Core i7-14700F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 20, threads: 28, baseClock: 2.1, tdp: 65, price: 2099, performance: 7.2, hasIntegratedGraphics: false },
  { id: 'i7-14700k', name: 'Intel Core i7-14700K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 20, threads: 28, baseClock: 3.4, tdp: 125, price: 2299, performance: 7.9 },
  { id: 'i7-14700kf', name: 'Intel Core i7-14700KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 7', cores: 20, threads: 28, baseClock: 3.4, tdp: 125, price: 2199, performance: 7.9, hasIntegratedGraphics: false },
  { id: 'i7-265k', name: 'Intel Core 7 265K', brand: 'Intel', platform: 'LGA1851', series: 'Intel 7', cores: 20, threads: 20, baseClock: 3.9, tdp: 250, price: 1899, performance: 8.1 },
  { id: 'i7-265kf', name: 'Intel Core 7 265KF', brand: 'Intel', platform: 'LGA1851', series: 'Intel 7', cores: 20, threads: 20, baseClock: 3.9, tdp: 250, price: 1899, performance: 8.1, hasIntegratedGraphics: false },

  // Intel Core i9 (旗舰级)
  { id: 'i9-12900', name: 'Intel Core i9-12900', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 16, threads: 24, baseClock: 2.4, tdp: 65, price: 2499, performance: 7.5 },
  { id: 'i9-12900f', name: 'Intel Core i9-12900F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 16, threads: 24, baseClock: 2.4, tdp: 65, price: 1999, performance: 7.4, hasIntegratedGraphics: false },
  { id: 'i9-12900k', name: 'Intel Core i9-12900K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 16, threads: 24, baseClock: 3.2, tdp: 125, price: 2099, performance: 8.1 },
  { id: 'i9-12900kf', name: 'Intel Core i9-12900KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 16, threads: 24, baseClock: 3.2, tdp: 125, price: 1999, performance: 8.0, hasIntegratedGraphics: false },
  { id: 'i9-12900ks', name: 'Intel Core i9-12900KS', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 16, threads: 24, baseClock: 3.4, tdp: 150, price: 2199, performance: 8.4 },
  { id: 'i9-13900', name: 'Intel Core i9-13900', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 2.0, tdp: 65, price: 3499, performance: 8.2 },
  { id: 'i9-13900k', name: 'Intel Core i9-13900K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.0, tdp: 125, price: 2299, performance: 8.7 },
  { id: 'i9-13900kf', name: 'Intel Core i9-13900KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.0, tdp: 125, price: 2099, performance: 8.8, hasIntegratedGraphics: false },
  { id: 'i9-13900ks', name: 'Intel Core i9-13900KS', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.2, tdp: 150, price: 3099, performance: 9.1 },
  { id: 'i9-14900', name: 'Intel Core i9-14900', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 2.0, tdp: 65, price: 3699, performance: 8.4 },
  { id: 'i9-14900f', name: 'Intel Core i9-14900F', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 2.0, tdp: 65, price: 2599, performance: 8.2, hasIntegratedGraphics: false },
  { id: 'i9-14900k', name: 'Intel Core i9-14900K', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.2, tdp: 125, price: 3199, performance: 9.0 },
  { id: 'i9-14900kf', name: 'Intel Core i9-14900KF', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.2, tdp: 125, price: 3199, performance: 9.1, hasIntegratedGraphics: false },
  { id: 'i9-14900ks', name: 'Intel Core i9-14900KS', brand: 'Intel', platform: 'LGA1700', series: 'Intel 9', cores: 24, threads: 32, baseClock: 3.2, tdp: 150, price: 4599, performance: 9.3 },
  { id: 'i9-285k', name: 'Intel Core 9 285K', brand: 'Intel', platform: 'LGA1851', series: 'Intel 9', cores: 24, threads: 24, baseClock: 3.7, tdp: 250, price: 4499, performance: 8.8 },
  { id: 'i9-285kf', name: 'Intel Core 9 285kF', brand: 'Intel', platform: 'LGA1851', series: 'Intel 9', cores: 24, threads: 24, baseClock: 3.5, tdp: 219, price: 4399, performance: 8.8, hasIntegratedGraphics: false },
];

// 主板数据
export const motherboardData: Motherboard[] = [
  // AM4 主板
  { id: 'am4-a320', name: 'A320', platform: 'AM4', chipset: 'A320', memoryType: 'DDR4', formFactor: 'MATX', price: 199 },
  { id: 'am4-b350', name: 'B350', platform: 'AM4', chipset: 'B350', memoryType: 'DDR4', formFactor: 'ATX', price: 249 },
  { id: 'am4-x370', name: 'X370', platform: 'AM4', chipset: 'X370', memoryType: 'DDR4', formFactor: 'ATX', price: 299 },
  { id: 'am4-b450', name: 'B450', platform: 'AM4', chipset: 'B450', memoryType: 'DDR4', formFactor: 'ATX', price: 299 },
  { id: 'am4-x470', name: 'X470', platform: 'AM4', chipset: 'X470', memoryType: 'DDR4', formFactor: 'ATX', price: 459 },
  { id: 'am4-x470e', name: 'X470E', platform: 'AM4', chipset: 'X470E', memoryType: 'DDR4', formFactor: 'E-ATX', price: 599 },
  { id: 'am4-a520', name: 'A520', platform: 'AM4', chipset: 'A520', memoryType: 'DDR4', formFactor: 'MATX', price: 499 },
  { id: 'am4-b550', name: 'B550', platform: 'AM4', chipset: 'B550', memoryType: 'DDR4', formFactor: 'ATX', price: 599 },
  { id: 'am4-x570', name: 'X570', platform: 'AM4', chipset: 'X570', memoryType: 'DDR4', formFactor: 'ATX', price: 799 },
  { id: 'am4-x570e', name: 'X570E', platform: 'AM4', chipset: 'X570E', memoryType: 'DDR4', formFactor: 'E-ATX', price: 999 },

  // AM5 主板
  { id: 'am5-a620', name: 'A620', platform: 'AM5', chipset: 'A620', memoryType: 'DDR5', formFactor: 'MATX', price: 499 },
  { id: 'am5-b650', name: 'B650', platform: 'AM5', chipset: 'B650', memoryType: 'DDR5', formFactor: 'ATX', price: 699 },
  { id: 'am5-x670', name: 'X670', platform: 'AM5', chipset: 'X670', memoryType: 'DDR5', formFactor: 'ATX', price: 1199 },
  { id: 'am5-x670e', name: 'X670E', platform: 'AM5', chipset: 'X670E', memoryType: 'DDR5', formFactor: 'E-ATX', price: 1499 },
  { id: 'am5-b840', name: 'B840', platform: 'AM5', chipset: 'B840', memoryType: 'DDR5', formFactor: 'MATX', price: 849 },
  { id: 'am5-b850', name: 'B850', platform: 'AM5', chipset: 'B850', memoryType: 'DDR5', formFactor: 'ATX', price: 1099 },
  { id: 'am5-x870', name: 'X870', platform: 'AM5', chipset: 'X870', memoryType: 'DDR5', formFactor: 'ATX', price: 1399 },
  { id: 'am5-x870e', name: 'X870E', platform: 'AM5', chipset: 'X870E', memoryType: 'DDR5', formFactor: 'E-ATX', price: 1559 },

  // LGA1700 主板 (12/13/14代)
  { id: 'lga1700-h610', name: 'H610', platform: 'LGA1700', chipset: 'H610', memoryType: 'DDR4', formFactor: 'MATX', price: 449 },
  { id: 'lga1700-b660', name: 'B660', platform: 'LGA1700', chipset: 'B660', memoryType: 'DDR4', formFactor: 'ATX', price: 599 },
  { id: 'lga1700-b760', name: 'B760', platform: 'LGA1700', chipset: 'B760', memoryType: 'DDR4', formFactor: 'ATX', price: 899 },
  { id: 'lga1700-z690', name: 'Z690', platform: 'LGA1700', chipset: 'Z690', memoryType: 'DDR5', formFactor: 'ATX', price: 1199 },
  { id: 'lga1700-h770', name: 'H770', platform: 'LGA1700', chipset: 'H770', memoryType: 'DDR5', formFactor: 'ATX', price: 1509 },
  { id: 'lga1700-z790', name: 'Z790', platform: 'LGA1700', chipset: 'Z790', memoryType: 'DDR5', formFactor: 'ATX', price: 1399 },

  { id: 'lga1700-h610', name: 'H610', platform: 'LGA1700', chipset: 'H610', memoryType: 'DDR5', formFactor: 'MATX', price: 449 },
  { id: 'lga1700-b660', name: 'B660', platform: 'LGA1700', chipset: 'B660', memoryType: 'DDR5', formFactor: 'ATX', price: 599 },
  { id: 'lga1700-b760', name: 'B760', platform: 'LGA1700', chipset: 'B760', memoryType: 'DDR5', formFactor: 'ATX', price: 899 },
  { id: 'lga1700-z690', name: 'Z690', platform: 'LGA1700', chipset: 'Z690', memoryType: 'DDR4', formFactor: 'ATX', price: 1199 },
  { id: 'lga1700-h770', name: 'H770', platform: 'LGA1700', chipset: 'H770', memoryType: 'DDR4', formFactor: 'ATX', price: 1509 },
  { id: 'lga1700-z790', name: 'Z790', platform: 'LGA1700', chipset: 'Z790', memoryType: 'DDR4', formFactor: 'ATX', price: 1399 },

  // LGA1851 主板 (200系列)
  { id: 'lga1851-h810', name: 'H810', platform: 'LGA1851', chipset: 'H810', memoryType: 'DDR5', formFactor: 'MATX', price: 799 },
  { id: 'lga1851-b860', name: 'B860', platform: 'LGA1851', chipset: 'B860', memoryType: 'DDR5', formFactor: 'ATX', price: 1299 },
  { id: 'lga1851-z890', name: 'Z890', platform: 'LGA1851', chipset: 'Z890', memoryType: 'DDR5', formFactor: 'ATX', price: 1599 },
];

// 显卡数据
export const gpuData: GPU[] = [
  // GPU 数据 - 基于2026年3DMark和FurMark 2测试数据评估
  // NVIDIA GTX (最低端)
  { id: 'gtx-1050', name: 'GTX 1050', brand: 'NVIDIA', series: 'GTX', vram: 2, tdp: 75, price: 399, performance: 1.8 },
  { id: 'gtx-1050ti', name: 'GTX 1050 Ti', brand: 'NVIDIA', series: 'GTX', vram: 4, tdp: 75, price: 599, performance: 2.3 },
  { id: 'gtx-1060-3gb', name: 'GTX 1060 3GB', brand: 'NVIDIA', series: 'GTX', vram: 3, tdp: 120, price: 499, performance: 3.0 },
  { id: 'gtx-1060-6gb', name: 'GTX 1060 6GB', brand: 'NVIDIA', series: 'GTX', vram: 6, tdp: 120, price: 629, performance: 3.2 },
  { id: 'gtx-1070', name: 'GTX 1070', brand: 'NVIDIA', series: 'GTX', vram: 8, tdp: 150, price: 749, performance: 3.9 },
  { id: 'gtx-1070ti', name: 'GTX 1070 Ti', brand: 'NVIDIA', series: 'GTX', vram: 8, tdp: 180, price: 809, performance: 4.2 },
  { id: 'gtx-1080', name: 'GTX 1080', brand: 'NVIDIA', series: 'GTX', vram: 8, tdp: 180, price: 849, performance: 4.4 },
  { id: 'gtx-1080ti', name: 'GTX 1080 Ti', brand: 'NVIDIA', series: 'GTX', vram: 11, tdp: 250, price: 1250, performance: 4.7 },
  { id: 'gtx-titanx', name: 'TITAN X', brand: 'NVIDIA', series: 'GTX', vram: 12, tdp: 250, price: 749, performance: 4.6 },

  // NVIDIA RTX 20
  { id: 'rtx-2060', name: 'RTX 2060', brand: 'NVIDIA', series: 'RTX 20', vram: 6, tdp: 160, price: 990, performance: 3.5 },
  { id: 'rtx-2060s', name: 'RTX 2060 Super', brand: 'NVIDIA', series: 'RTX 20', vram: 12, tdp: 175, price: 1099, performance: 4.0 },
  { id: 'rtx-2070', name: 'RTX 2070', brand: 'NVIDIA', series: 'RTX 20', vram: 8, tdp: 175, price: 1099, performance: 4.4 },
  { id: 'rtx-2070s', name: 'RTX 2070 Super', brand: 'NVIDIA', series: 'RTX 20', vram: 8, tdp: 215, price: 1149, performance: 4.7 },
  { id: 'rtx-2080', name: 'RTX 2080', brand: 'NVIDIA', series: 'RTX 20', vram: 8, tdp: 215, price: 1275, performance: 5.0 },
  { id: 'rtx-2080s', name: 'RTX 2080 Super', brand: 'NVIDIA', series: 'RTX 20', vram: 8, tdp: 250, price: 1349, performance: 5.1 },
  { id: 'rtx-2080ti', name: 'RTX 2080 Ti', brand: 'NVIDIA', series: 'RTX 20', vram: 11, tdp: 260, price: 1699, performance: 5.2 },
  { id: 'rtx-titanrtx', name: 'TITAN RTX', brand: 'NVIDIA', series: 'RTX 20', vram: 24, tdp: 280, price: 1250, performance: 5.1 },

  // NVIDIA RTX 30
  { id: 'rtx-3060-8gb', name: 'RTX 3060 8GB', brand: 'NVIDIA', series: 'RTX 30', vram: 8, tdp: 170, price: 1299, performance: 4.2 },
  { id: 'rtx-3060-12gb', name: 'RTX 3060 12GB', brand: 'NVIDIA', series: 'RTX 30', vram: 12, tdp: 170, price: 1389, performance: 4.4 },
  { id: 'rtx-3060ti', name: 'RTX 3060 Ti', brand: 'NVIDIA', series: 'RTX 30', vram: 8, tdp: 200, price: 1420, performance: 4.6 },
  { id: 'rtx-3070', name: 'RTX 3070', brand: 'NVIDIA', series: 'RTX 30', vram: 8, tdp: 220, price: 1450, performance: 5.1 },
  { id: 'rtx-3070ti', name: 'RTX 3070 Ti', brand: 'NVIDIA', series: 'RTX 30', vram: 8, tdp: 290, price: 1689, performance: 5.2 },
  { id: 'rtx-3080-10gb', name: 'RTX 3080 10GB', brand: 'NVIDIA', series: 'RTX 30', vram: 10, tdp: 320, price: 1899, performance: 5.5 },
  { id: 'rtx-3080-12gb', name: 'RTX 3080 12GB', brand: 'NVIDIA', series: 'RTX 30', vram: 12, tdp: 350, price: 1988, performance: 5.6 },
  { id: 'rtx-3080ti', name: 'RTX 3080 Ti', brand: 'NVIDIA', series: 'RTX 30', vram: 12, tdp: 350, price: 2799, performance: 5.7 },
  { id: 'rtx-3090', name: 'RTX 3090', brand: 'NVIDIA', series: 'RTX 30', vram: 24, tdp: 350, price: 4899, performance: 6.0 },
  { id: 'rtx-3090ti', name: 'RTX 3090 Ti', brand: 'NVIDIA', series: 'RTX 30', vram: 24, tdp: 450, price: 5199, performance: 6.4 },

  // NVIDIA RTX 40
  { id: 'rtx-4060', name: 'RTX 4060', brand: 'NVIDIA', series: 'RTX 40', vram: 8, tdp: 115, price: 1799, performance: 4.8 },
  { id: 'rtx-4060ti-8gb', name: 'RTX 4060 Ti 8GB', brand: 'NVIDIA', series: 'RTX 40', vram: 8, tdp: 160, price: 2049, performance: 5.0 },
  { id: 'rtx-4060ti-16gb', name: 'RTX 4060 Ti 16GB', brand: 'NVIDIA', series: 'RTX 40', vram: 16, tdp: 165, price: 2599, performance: 5.2 },
  { id: 'rtx-4070', name: 'RTX 4070', brand: 'NVIDIA', series: 'RTX 40', vram: 12, tdp: 200, price: 3099, performance: 5.8 },
  { id: 'rtx-4070s', name: 'RTX 4070 Super', brand: 'NVIDIA', series: 'RTX 40', vram: 12, tdp: 220, price: 3499, performance: 6.0 },
  { id: 'rtx-4070ti', name: 'RTX 4070 Ti', brand: 'NVIDIA', series: 'RTX 40', vram: 12, tdp: 285, price: 4299, performance: 6.5 },
  { id: 'rtx-4070tis', name: 'RTX 4070 Ti Super', brand: 'NVIDIA', series: 'RTX 40', vram: 16, tdp: 285, price: 4899, performance: 6.7 },
  { id: 'rtx-4080', name: 'RTX 4080', brand: 'NVIDIA', series: 'RTX 40', vram: 16, tdp: 320, price: 6099, performance: 7.2 },
  { id: 'rtx-4080s', name: 'RTX 4080 Super', brand: 'NVIDIA', series: 'RTX 40', vram: 16, tdp: 320, price: 6299, performance: 7.3 },
  { id: 'rtx-4090d', name: 'RTX 4090D', brand: 'NVIDIA', series: 'RTX 40', vram: 24, tdp: 425, price: 16999, performance: 7.9 },
  { id: 'rtx-4090', name: 'RTX 4090', brand: 'NVIDIA', series: 'RTX 40', vram: 24, tdp: 450, price: 18599, performance: 8.2 },

  // NVIDIA RTX 50
  { id: 'rtx-5050', name: 'RTX 5050', brand: 'NVIDIA', series: 'RTX 50', vram: 8, tdp: 120, price: 1849, performance: 4.6 },
  { id: 'rtx-5060', name: 'RTX 5060', brand: 'NVIDIA', series: 'RTX 50', vram: 8, tdp: 130, price: 2409, performance: 5.1 },
  { id: 'rtx-5060ti', name: 'RTX 5060 Ti', brand: 'NVIDIA', series: 'RTX 50', vram: 12, tdp: 175, price: 2899, performance: 5.3 },
  { id: 'rtx-5060ti-16gb', name: 'RTX 5060 Ti 16GB', brand: 'NVIDIA', series: 'RTX 50', vram: 16, tdp: 180, price: 3599, performance: 5.5 },
  { id: 'rtx-5070', name: 'RTX 5070', brand: 'NVIDIA', series: 'RTX 50', vram: 12, tdp: 220, price: 4499, performance: 6.5 },
  { id: 'rtx-5070ti', name: 'RTX 5070 Ti', brand: 'NVIDIA', series: 'RTX 50', vram: 16, tdp: 285, price: 6499, performance: 7.1 },
  { id: 'rtx-5080', name: 'RTX 5080', brand: 'NVIDIA', series: 'RTX 50', vram: 16, tdp: 340, price: 8499, performance: 7.6 },
  { id: 'rtx-5090', name: 'RTX 5090', brand: 'NVIDIA', series: 'RTX 50', vram: 32, tdp: 575, price: 25099, performance: 8.7 },
  { id: 'rtx-5090d', name: 'RTX 5090D', brand: 'NVIDIA', series: 'RTX 50', vram: 32, tdp: 500, price: 21499, performance: 8.6 },
  { id: 'rtx-5090dv2', name: 'RTX 5090DV2', brand: 'NVIDIA', series: 'RTX 50', vram: 32, tdp: 520, price: 16599, performance: 8.4 },

  // AMD RX 6000
  { id: 'rx-6400', name: 'RX 6400', brand: 'AMD', series: 'RX 6000', vram: 4, tdp: 53, price: 599, performance: 2.0 },
  { id: 'rx-6500xt', name: 'RX 6500 XT', brand: 'AMD', series: 'RX 6000', vram: 4, tdp: 107, price: 678, performance: 3.1 },
  { id: 'rx-6600', name: 'RX 6600', brand: 'AMD', series: 'RX 6000', vram: 8, tdp: 132, price: 999, performance: 4.3 },
  { id: 'rx-6600xt', name: 'RX 6600 XT', brand: 'AMD', series: 'RX 6000', vram: 8, tdp: 160, price: 1099, performance: 4.4 },
  { id: 'rx-6650xt', name: 'RX 6650 XT', brand: 'AMD', series: 'RX 6000', vram: 8, tdp: 180, price: 1249, performance: 4.5 },
  { id: 'rx-6700', name: 'RX 6700', brand: 'AMD', series: 'RX 6000', vram: 10, tdp: 175, price: 1349, performance: 4.7 },
  { id: 'rx-6700xt', name: 'RX 6700 XT', brand: 'AMD', series: 'RX 6000', vram: 12, tdp: 230, price: 1450, performance: 4.8 },
  { id: 'rx-6800', name: 'RX 6800', brand: 'AMD', series: 'RX 6000', vram: 16, tdp: 250, price: 1899, performance: 5.5 },
  { id: 'rx-6800xt', name: 'RX 6800 XT', brand: 'AMD', series: 'RX 6000', vram: 16, tdp: 300, price: 2199, performance: 5.6 },
  { id: 'rx-6900xt', name: 'RX 6900 XT', brand: 'AMD', series: 'RX 6000', vram: 16, tdp: 300, price: 2999, performance: 5.8 },
  { id: 'rx-6950xt', name: 'RX 6950 XT', brand: 'AMD', series: 'RX 6000', vram: 16, tdp: 335, price: 3129, performance: 6.0 },

  // AMD RX 7000
  { id: 'rx-7600', name: 'RX 7600', brand: 'AMD', series: 'RX 7000', vram: 8, tdp: 165, price: 1699, performance: 4.6 },
  { id: 'rx-7600xt', name: 'RX 7600 XT', brand: 'AMD', series: 'RX 7000', vram: 16, tdp: 190, price: 1899, performance: 4.9 },
  { id: 'rx-7700xt', name: 'RX 7700 XT', brand: 'AMD', series: 'RX 7000', vram: 12, tdp: 245, price: 2499, performance: 5.6 },
  { id: 'rx-7800xt', name: 'RX 7800 XT', brand: 'AMD', series: 'RX 7000', vram: 16, tdp: 263, price: 3199, performance: 6.2 },
  { id: 'rx-7900gre', name: 'RX 7900 GRE', brand: 'AMD', series: 'RX 7000', vram: 16, tdp: 260, price: 3699, performance: 6.7 },
  { id: 'rx-7900xt', name: 'RX 7900 XT', brand: 'AMD', series: 'RX 7000', vram: 20, tdp: 300, price: 4499, performance: 7.1 },
  { id: 'rx-7900xtx', name: 'RX 7900 XTX', brand: 'AMD', series: 'RX 7000', vram: 24, tdp: 355, price: 5499, performance: 7.4 },

  // AMD RX 9000系列 (最新旗舰)
{ id: 'rx-9060', name: 'RX 9060', brand: 'AMD', series: 'RX 9000', vram: 8, tdp: 160, price: 2299, performance: 5.2 },
{ id: 'rx-9060xt', name: 'RX 9060 XT', brand: 'AMD', series: 'RX 9000', vram: 8, tdp: 190, price: 2599, performance: 5.4 },
{ id: 'rx-9060xt-16gb', name: 'RX 9060 XT 16GB', brand: 'AMD', series: 'RX 9000', vram: 16, tdp: 2899, price: 3499, performance: 5.5 },
{ id: 'rx-9070gre', name: 'RX 9070 GRE', brand: 'AMD', series: 'RX 9000', vram: 12, tdp: 200, price: 3499, performance: 6.1 },
{ id: 'rx-9070', name: 'RX 9070', brand: 'AMD', series: 'RX 9000', vram: 16, tdp: 240, price: 4299, performance: 6.5 },
{ id: 'rx-9070xt', name: 'RX 9070 XT', brand: 'AMD', series: 'RX 9000', vram: 16, tdp: 270, price: 5299, performance: 7.3 },

// AMD RX 6750 GRE系列
{ id: 'rx-6750gre-10gb', name: 'RX 6750 GRE 10GB', brand: 'AMD', series: 'RX 6000', vram: 10, tdp: 170, price: 1449, performance: 4.7 },
{ id: 'rx-6750gre-12gb', name: 'RX 6750 GRE 12GB', brand: 'AMD', series: 'RX 6000', vram: 12, tdp: 187, price: 1699, performance: 4.9 },

// AMD RX 7650 GRE系列
{ id: 'rx-7650gre', name: 'RX 7650 GRE', brand: 'AMD', series: 'RX 7000', vram: 8, tdp: 165, price: 1799, performance: 5.0 },

// AMD RX 5000系列
{ id: 'rx-5500', name: 'RX 5500', brand: 'AMD', series: 'RX 5000', vram: 4, tdp: 110, price: 499, performance: 2.8 },
{ id: 'rx-5500xt-4gb', name: 'RX 5500 XT 4GB', brand: 'AMD', series: 'RX 5000', vram: 4, tdp: 130, price: 499, performance: 3.0 },
{ id: 'rx-5500xt-8gb', name: 'RX 5500 XT 8GB', brand: 'AMD', series: 'RX 5000', vram: 8, tdp: 130, price: 599, performance: 3.2 },
{ id: 'rx-5600', name: 'RX 5600', brand: 'AMD', series: 'RX 5000', vram: 6, tdp: 150, price: 699, performance: 3.8 },
{ id: 'rx-5600xt', name: 'RX 5600 XT', brand: 'AMD', series: 'RX 5000', vram: 6, tdp: 150, price: 749, performance: 3.9 },
{ id: 'rx-5700', name: 'RX 5700', brand: 'AMD', series: 'RX 5000', vram: 8, tdp: 180, price: 829, performance: 4.2 },
{ id: 'rx-5700xt', name: 'RX 5700 XT', brand: 'AMD', series: 'RX 5000', vram: 8, tdp: 225, price: 959, performance: 4.5 },

  // Intel Arc
  { id: 'intel-b580', name: 'Intel Arc B580', brand: 'Intel', series: 'Arc B', vram: 12, tdp: 190, price: 1899, performance: 4.9 },
  { id: 'intel-b570', name: 'Intel Arc B570', brand: 'Intel', series: 'Arc B', vram: 10, tdp: 150, price: 1699, performance: 4.6 },
  { id: 'intel-a770-16gb', name: 'Intel Arc A770 16GB', brand: 'Intel', series: 'Arc A', vram: 16, tdp: 225, price: 2299, performance: 4.9 },
  { id: 'intel-a770-8gb', name: 'Intel Arc A770 8GB', brand: 'Intel', series: 'Arc A', vram: 8, tdp: 225, price: 1899, performance: 4.7 },
  { id: 'intel-a750', name: 'Intel Arc A750', brand: 'Intel', series: 'Arc A', vram: 8, tdp: 225, price: 1599, performance: 4.5 },
  { id: 'intel-a580', name: 'Intel Arc A580', brand: 'Intel', series: 'Arc A', vram: 8, tdp: 185, price: 1099, performance: 3.9 },
  { id: 'intel-a380', name: 'Intel Arc A380', brand: 'Intel', series: 'Arc A', vram: 6, tdp: 75, price: 799, performance: 3.0 },
  { id: 'intel-a310', name: 'Intel Arc A310', brand: 'Intel', series: 'Arc A', vram: 4, tdp: 75, price: 499, performance: 2.5 },
  { id: 'intel-dg1', name: 'Intel DG1', brand: 'Intel', series: 'DG1', vram: 4, tdp: 30, price: 399, performance: 2.0 },
];

// 计算内存性能评分的辅助函数
// 带宽 = 频率 * 64 / 8000 (GB/s)
// 评分 = Math.min(10, 带宽 / 6)
const calcMemoryPerf = (speed: number): number => {
  const bandwidth = speed * 64 / 8000;
  return Math.min(10, Number((bandwidth / 6).toFixed(1)));
};

// 内存数据
export const memoryData: Memory[] = [
  // DDR4
  { id: 'ddr4-2400-8gb', name: 'DDR4 2400MHz 8GB', type: 'DDR4', speed: 2400, capacity: 8, price: 159, performance: calcMemoryPerf(2400) },
  { id: 'ddr4-2400-16gb', name: 'DDR4 2400MHz 16GB', type: 'DDR4', speed: 2400, capacity: 16, price: 299, performance: calcMemoryPerf(2400) },
  { id: 'ddr4-2400-32gb', name: 'DDR4 2400MHz 32GB', type: 'DDR4', speed: 2400, capacity: 32, price: 579, performance: calcMemoryPerf(2400) },
  { id: 'ddr4-2667-8gb', name: 'DDR4 2667MHz 8GB', type: 'DDR4', speed: 2667, capacity: 8, price: 169, performance: calcMemoryPerf(2667) },
  { id: 'ddr4-2667-16gb', name: 'DDR4 2667MHz 16GB', type: 'DDR4', speed: 2667, capacity: 16, price: 319, performance: calcMemoryPerf(2667) },
  { id: 'ddr4-2667-32gb', name: 'DDR4 2667MHz 32GB', type: 'DDR4', speed: 2667, capacity: 32, price: 599, performance: calcMemoryPerf(2667) },
  { id: 'ddr4-3000-8gb', name: 'DDR4 3000MHz 8GB', type: 'DDR4', speed: 3000, capacity: 8, price: 189, performance: calcMemoryPerf(3000) },
  { id: 'ddr4-3000-16gb', name: 'DDR4 3000MHz 16GB', type: 'DDR4', speed: 3000, capacity: 16, price: 349, performance: calcMemoryPerf(3000) },
  { id: 'ddr4-3000-32gb', name: 'DDR4 3000MHz 32GB', type: 'DDR4', speed: 3000, capacity: 32, price: 659, performance: calcMemoryPerf(3000) },
  { id: 'ddr4-3200-8gb', name: 'DDR4 3200MHz 8GB', type: 'DDR4', speed: 3200, capacity: 8, price: 199, performance: calcMemoryPerf(3200) },
  { id: 'ddr4-3200-16gb', name: 'DDR4 3200MHz 16GB', type: 'DDR4', speed: 3200, capacity: 16, price: 369, performance: calcMemoryPerf(3200) },
  { id: 'ddr4-3200-32gb', name: 'DDR4 3200MHz 32GB', type: 'DDR4', speed: 3200, capacity: 32, price: 699, performance: calcMemoryPerf(3200) },
  { id: 'ddr4-3600-8gb', name: 'DDR4 3600MHz 8GB', type: 'DDR4', speed: 3600, capacity: 8, price: 219, performance: calcMemoryPerf(3600) },
  { id: 'ddr4-3600-16gb', name: 'DDR4 3600MHz 16GB', type: 'DDR4', speed: 3600, capacity: 16, price: 399, performance: calcMemoryPerf(3600) },
  { id: 'ddr4-3600-32gb', name: 'DDR4 3600MHz 32GB', type: 'DDR4', speed: 3600, capacity: 32, price: 749, performance: calcMemoryPerf(3600) },
  { id: 'ddr4-4000-16gb', name: 'DDR4 4000MHz 16GB', type: 'DDR4', speed: 4000, capacity: 16, price: 449, performance: calcMemoryPerf(4000) },
  { id: 'ddr4-4000-32gb', name: 'DDR4 4000MHz 32GB', type: 'DDR4', speed: 4000, capacity: 32, price: 849, performance: calcMemoryPerf(4000) },
  { id: 'ddr4-4266-16gb', name: 'DDR4 4266MHz 16GB', type: 'DDR4', speed: 4266, capacity: 16, price: 499, performance: calcMemoryPerf(4266) },
  { id: 'ddr4-4266-32gb', name: 'DDR4 4266MHz 32GB', type: 'DDR4', speed: 4266, capacity: 32, price: 949, performance: calcMemoryPerf(4266) },
  { id: 'ddr4-4800-16gb', name: 'DDR4 4800MHz C22 16GB', type: 'DDR4', speed: 4800, capacity: 16, price: 599, performance: calcMemoryPerf(4800) },
  { id: 'ddr4-4800-32gb', name: 'DDR4 4800MHz C22 32GB', type: 'DDR4', speed: 4800, capacity: 32, price: 1099, performance: calcMemoryPerf(4800) },

  // DDR5
  { id: 'ddr5-4800-8gb', name: 'DDR5 4800MHz 8GB', type: 'DDR5', speed: 4800, capacity: 8, price: 259, performance: calcMemoryPerf(4800) },
  { id: 'ddr5-4800-16gb', name: 'DDR5 4800MHz 16GB', type: 'DDR5', speed: 4800, capacity: 16, price: 479, performance: calcMemoryPerf(4800) },
  { id: 'ddr5-4800-32gb', name: 'DDR5 4800MHz 32GB', type: 'DDR5', speed: 4800, capacity: 32, price: 899, performance: calcMemoryPerf(4800) },
  { id: 'ddr5-4800-48gb', name: 'DDR5 4800MHz 48GB', type: 'DDR5', speed: 4800, capacity: 48, price: 1299, performance: calcMemoryPerf(4800) },
  { id: 'ddr5-5600-8gb', name: 'DDR5 5600MHz 8GB', type: 'DDR5', speed: 5600, capacity: 8, price: 279, performance: calcMemoryPerf(5600) },
  { id: 'ddr5-5600-16gb', name: 'DDR5 5600MHz 16GB', type: 'DDR5', speed: 5600, capacity: 16, price: 519, performance: calcMemoryPerf(5600) },
  { id: 'ddr5-5600-32gb', name: 'DDR5 5600MHz 32GB', type: 'DDR5', speed: 5600, capacity: 32, price: 999, performance: calcMemoryPerf(5600) },
  { id: 'ddr5-5600-48gb', name: 'DDR5 5600MHz 48GB', type: 'DDR5', speed: 5600, capacity: 48, price: 1449, performance: calcMemoryPerf(5600) },
  { id: 'ddr5-6000-16gb', name: 'DDR5 6000MHz 16GB', type: 'DDR5', speed: 6000, capacity: 16, price: 579, performance: calcMemoryPerf(6000) },
  { id: 'ddr5-6000-32gb', name: 'DDR5 6000MHz 32GB', type: 'DDR5', speed: 6000, capacity: 32, price: 1099, performance: calcMemoryPerf(6000) },
  { id: 'ddr5-6000-48gb', name: 'DDR5 6000MHz 48GB', type: 'DDR5', speed: 6000, capacity: 48, price: 1599, performance: calcMemoryPerf(6000) },
  { id: 'ddr5-6400-16gb', name: 'DDR5 6400MHz 16GB', type: 'DDR5', speed: 6400, capacity: 16, price: 639, performance: calcMemoryPerf(6400) },
  { id: 'ddr5-6400-32gb', name: 'DDR5 6400MHz 32GB', type: 'DDR5', speed: 6400, capacity: 32, price: 1199, performance: calcMemoryPerf(6400) },
  { id: 'ddr5-6800-16gb', name: 'DDR5 6800MHz 16GB', type: 'DDR5', speed: 6800, capacity: 16, price: 699, performance: calcMemoryPerf(6800) },
  { id: 'ddr5-6800-32gb', name: 'DDR5 6800MHz 32GB', type: 'DDR5', speed: 6800, capacity: 32, price: 1299, performance: calcMemoryPerf(6800) },
  { id: 'ddr5-7200-16gb', name: 'DDR5 7200MHz 16GB', type: 'DDR5', speed: 7200, capacity: 16, price: 799, performance: calcMemoryPerf(7200) },
  { id: 'ddr5-7200-32gb', name: 'DDR5 7200MHz 32GB', type: 'DDR5', speed: 7200, capacity: 32, price: 1499, performance: calcMemoryPerf(7200) },
  { id: 'ddr5-7600-16gb', name: 'DDR5 7600MHz 16GB', type: 'DDR5', speed: 7600, capacity: 16, price: 899, performance: calcMemoryPerf(7600) },
  { id: 'ddr5-7600-32gb', name: 'DDR5 7600MHz 32GB', type: 'DDR5', speed: 7600, capacity: 32, price: 1699, performance: calcMemoryPerf(7600) },
  { id: 'ddr5-7600-64gb', name: 'DDR5 7600MHz 64GB', type: 'DDR5', speed: 7600, capacity: 64, price: 3199, performance: calcMemoryPerf(7600) },
  { id: 'ddr5-7600-128gb', name: 'DDR5 7600MHz 128GB', type: 'DDR5', speed: 7600, capacity: 128, price: 6299, performance: calcMemoryPerf(7600) },
  { id: 'ddr5-8000-16gb', name: 'DDR5 8000MHz C36 16GB', type: 'DDR5', speed: 8000, capacity: 16, price: 999, performance: calcMemoryPerf(8000) },
  { id: 'ddr5-8000-32gb', name: 'DDR5 8000MHz C36 32GB', type: 'DDR5', speed: 8000, capacity: 32, price: 1899, performance: calcMemoryPerf(8000) },
];

// 存储数据
export const storageData: Storage[] = [
  // PCIe 3.0
  { id: 'pcie3-256gb', name: 'PCIe 3.0 256GB', type: 'PCIe 3', capacity: 256, price: 199 },
  { id: 'pcie3-512gb', name: 'PCIe 3.0 512GB', type: 'PCIe 3', capacity: 512, price: 499 },
  { id: 'pcie3-1tb', name: 'PCIe 3.0 1TB', type: 'PCIe 3', capacity: 1024, price: 809 },
  { id: 'pcie3-2tb', name: 'PCIe 3.0 2TB', type: 'PCIe 3', capacity: 2048, price: 1299 },
  { id: 'pcie3-4tb', name: 'PCIe 3.0 4TB', type: 'PCIe 3', capacity: 4096, price: 2299 },
  { id: 'pcie3-8tb', name: 'PCIe 3.0 8TB', type: 'PCIe 3', capacity: 8192, price: 2999 },

  // PCIe 4.0
  { id: 'pcie4-256gb', name: 'PCIe 4.0 256GB', type: 'PCIe 4', capacity: 256, price: 259 },
  { id: 'pcie4-512gb', name: 'PCIe 4.0 512GB', type: 'PCIe 4', capacity: 512, price: 499 },
  { id: 'pcie4-1tb', name: 'PCIe 4.0 1TB', type: 'PCIe 4', capacity: 1024, price: 999 },
  { id: 'pcie4-2tb', name: 'PCIe 4.0 2TB', type: 'PCIe 4', capacity: 2048, price: 1499 },
  { id: 'pcie4-4tb', name: 'PCIe 4.0 4TB', type: 'PCIe 4', capacity: 4096, price: 2599 },
  { id: 'pcie4-8tb', name: 'PCIe 4.0 8TB', type: 'PCIe 4', capacity: 8192, price: 3599 },

  // PCIe 5.0
  { id: 'pcie5-512gb', name: 'PCIe 5.0 512GB', type: 'PCIe 5', capacity: 512, price: 549 },
  { id: 'pcie5-1tb', name: 'PCIe 5.0 1TB', type: 'PCIe 5', capacity: 1024, price: 1299 },
  { id: 'pcie5-2tb', name: 'PCIe 5.0 2TB', type: 'PCIe 5', capacity: 2048, price: 1999 },
  { id: 'pcie5-4tb', name: 'PCIe 5.0 4TB', type: 'PCIe 5', capacity: 4096, price: 3599 },
  { id: 'pcie5-8tb', name: 'PCIe 5.0 8TB', type: 'PCIe 5', capacity: 8192, price: 5999 },

  // HDD
  { id: 'hdd-256gb', name: 'HDD 256GB', type: 'HDD', capacity: 256, price: 99 },
  { id: 'hdd-512gb', name: 'HDD 512GB', type: 'HDD', capacity: 512, price: 149 },
  { id: 'hdd-1tb', name: 'HDD 1TB', type: 'HDD', capacity: 1024, price: 449 },
  { id: 'hdd-2tb', name: 'HDD 2TB', type: 'HDD', capacity: 2048, price: 599 },
  { id: 'hdd-4tb', name: 'HDD 4TB', type: 'HDD', capacity: 4096, price: 899 },
  { id: 'hdd-8tb', name: 'HDD 8TB', type: 'HDD', capacity: 8192, price: 1699 },
  { id: 'hdd-16tb', name: 'HDD 16TB', type: 'HDD', capacity: 16384, price: 1999 },
];

// 电源数据
export const psuData: PSU[] = [
  { id: 'psu-200w', name: '200W', wattage: 200, price: 50 },
  { id: 'psu-250w', name: '250W', wattage: 250, price: 69 },
  { id: 'psu-350w', name: '350W', wattage: 350, price: 89 },
  { id: 'psu-450w', name: '450W', wattage: 450, price: 109 },
  { id: 'psu-500w', name: '500W', wattage: 500, price: 149 },
  { id: 'psu-550w', name: '550W', wattage: 550, price: 209 },
  { id: 'psu-600w', name: '600W', wattage: 600, price: 259 },
  { id: 'psu-650w', name: '650W', wattage: 650, price: 319 },
  { id: 'psu-750w', name: '750W', wattage: 750, price: 409 },
  { id: 'psu-850w', name: '850W', wattage: 850, price: 559 },
  { id: 'psu-1000w', name: '1000W', wattage: 1000, price: 629 },
  { id: 'psu-1200w', name: '1200W', wattage: 1200, price: 799 },
  { id: 'psu-1300w', name: '1300W', wattage: 1300, price: 999 },
  { id: 'psu-1600w', name: '1600W', wattage: 1600, price: 1399 },
];

// 散热器数据
export const coolerData: Cooler[] = [
  { id: 'air-2pipe', name: '风冷 2热管', type: '风冷', spec: '2热管', price: 49 },
  { id: 'air-4pipe', name: '风冷 4热管', type: '风冷', spec: '4热管', price: 99 },
  { id: 'air-6pipe', name: '风冷 6热管', type: '风冷', spec: '6热管', price: 199 },
  { id: 'water-120mm', name: '水冷 120mm', type: '水冷', spec: '120mm', price: 99 },
  { id: 'water-240mm', name: '水冷 240mm', type: '水冷', spec: '240mm', price: 149 },
  { id: 'water-360mm', name: '水冷 360mm', type: '水冷', spec: '360mm', price: 499 },
  { id: 'water-420mm', name: '水冷 420mm', type: '水冷', spec: '420mm', price: 899 },
];

// 机箱数据
export const caseData: Case[] = [
  { id: 'case-itx', name: 'ITX', formFactor: 'ITX', price: 199 },
  { id: 'case-matx', name: 'MATX', formFactor: 'MATX', price: 109 },
  { id: 'case-atx', name: 'ATX', formFactor: 'ATX', price: 199 },
  { id: 'case-eatx', name: 'E-ATX', formFactor: 'E-ATX', price: 249 },
  { id: 'case-open', name: 'OpenPlatform', formFactor: 'OpenPlatform', price: 99 },
];
