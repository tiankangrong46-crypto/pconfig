import { PCConfig } from '../App';

interface PerformanceCalculatorProps {
  config: PCConfig;
}

export function PerformanceCalculator({ config }: PerformanceCalculatorProps) {
  // 这个组件主要用于计算性能评分的逻辑
  // 实际的显示已经在 App.tsx 的底部固定栏中实现
  // 这里保留作为独立的计算模块
  
  // 内存容量评分函数 (0-5分)
  const calculateMemoryCapacityScore = (totalMemory: number): number => {
    if (totalMemory <= 8) return 1.0;           // 8GB及以下
    if (totalMemory <= 16) return 2.5;          // 16GB
    if (totalMemory <= 24) return 3.5;          // 24GB
    if (totalMemory <= 32) return 4.0;          // 32GB
    if (totalMemory <= 48) return 4.5;          // 48GB
    if (totalMemory <= 64) return 4.8;          // 64GB
    return 5.0;                                 // 64GB以上
  };

  // 内存频率评分函数 (0-5分)
  const calculateMemorySpeedScore = (avgSpeed: number): number => {
    if (avgSpeed <= 2400) return 1.0;           // DDR4基础频率
    if (avgSpeed <= 3200) return 2.0;           // DDR4主流
    if (avgSpeed <= 3600) return 2.5;           // DDR4高频
    if (avgSpeed <= 4000) return 3.0;           // DDR5入门
    if (avgSpeed <= 4800) return 3.5;           // DDR5主流
    if (avgSpeed <= 5600) return 4.0;           // DDR5高频
    if (avgSpeed <= 6400) return 4.3;           // DDR5超频
    if (avgSpeed <= 7200) return 4.6;           // DDR5极限
    if (avgSpeed <= 8000) return 4.8;           // DDR5超频极限
    return 5.0;                                 // 8000MHz以上
  };

  const calculatePerformance = () => {
    let cpuScore = config.cpu ? config.cpu.performance : 0;
    let gpuScore = config.gpus.length > 0 
      ? Math.max(...config.gpus.map(g => g.performance)) 
      : 0;
    let memoryScore = 0;
    
    if (config.memory.length > 0) {
      const totalMemory = config.memory.reduce((sum, m) => sum + m.capacity, 0);
      const avgSpeed = config.memory.reduce((sum, m) => sum + m.speed, 0) / config.memory.length;
      
      // 分别计算容量和频率评分，各0-5分
      const capacityScore = calculateMemoryCapacityScore(totalMemory);
      const speedScore = calculateMemorySpeedScore(avgSpeed);
      
      // 内存总评分 = 容量评分 + 频率评分 (0-10分)
      memoryScore = capacityScore + speedScore;
    }

    // 加权平均：CPU 40%, GPU 40%, Memory 20%
    const score = (cpuScore * 0.4 + gpuScore * 0.4 + memoryScore * 0.2);
    return {
      total: Math.min(10, Math.max(0, score)),
      cpu: cpuScore,
      gpu: gpuScore,
      memory: memoryScore,
    };
  };

  return null; // 这个组件不直接渲染 UI
}