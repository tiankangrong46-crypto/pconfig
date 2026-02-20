import { useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { CPUSelector } from './components/CPUSelector';
import { GPUSelector } from './components/GPUSelector';
import { CompatibilityChecker } from './components/CompatibilityChecker';
import { PerformanceCalculator } from './components/PerformanceCalculator';
import { CPU, Motherboard, GPU, Memory, Storage, PSU, Cooler, Case } from './data/hardware-data';
import { toast, Toaster } from 'sonner';

export interface PCConfig {
  cpu: CPU | null;
  motherboard: Motherboard | null;
  gpus: GPU[];
  memory: Memory[];
  storage: Storage[];
  psu: PSU | null;
  cooler: Cooler | null;
  case: Case | null;
}

export default function App() {
  const [config, setConfig] = useState<PCConfig>({
    cpu: null,
    motherboard: null,
    gpus: [],
    memory: [],
    storage: [],
    psu: null,
    cooler: null,
    case: null,
  });

  const [showCPUSelector, setShowCPUSelector] = useState(false);
  const [showGPUSelector, setShowGPUSelector] = useState(false);
  const [gpuRequired, setGPURequired] = useState(false);


  // 计算总价
  const getTotalPrice = (): number => {
    let total = 0;
    if (config.cpu) total += config.cpu.price;
    if (config.motherboard) total += config.motherboard.price;
    config.gpus.forEach(gpu => total += gpu.price);
    config.memory.forEach(mem => total += mem.price);
    config.storage.forEach(storage => total += storage.price);
    if (config.psu) total += config.psu.price;
    if (config.cooler) total += config.cooler.price;
    if (config.case) total += config.case.price;
    return total;
  };

  // 计算总功耗
  const getTotalPowerConsumption = (): number => {
    let total = 0;
    if (config.cpu) total += config.cpu.tdp;
    config.gpus.forEach(gpu => total += gpu.tdp);
    // 内存、存储、主板等估算 50W
    total += 50;
    return total;
  };

  // 推荐电源瓦数
  const getRecommendedPSU = (): number => {
    return Math.ceil((getTotalPowerConsumption() + 100) / 50) * 50;
  };

  // 计算性能评分
  const getPerformanceScore = (): number => {
    let cpuScore = config.cpu ? config.cpu.performance : 0;
    let gpuScore = config.gpus.length > 0 
      ? Math.max(...config.gpus.map(g => g.performance)) 
      : 0;
    let memoryScore = 0;
    
    if (config.memory.length > 0) {
      // 使用内存自身的 performance 评分
      memoryScore = config.memory.reduce((sum, m) => sum + m.performance, 0) / config.memory.length;
    }

    // 加权平均：CPU 40%, GPU 40%, Memory 20%
    const score = (cpuScore * 0.4 + gpuScore * 0.4 + memoryScore * 0.2);
    return Math.min(10, Math.max(0, score));
  };

  // 保存配置
  const saveConfig = () => {
    const configData = {
      config,
      totalPrice: getTotalPrice(),
      performanceScore: getPerformanceScore(),
      recommendedPSU: getRecommendedPSU(),
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pc-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('配置已保存！');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Toaster position="top-right" theme="dark" />
      
      {/* 顶部标题 */}
      <header className="border-b border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-mono tracking-wider">
            <span className="text-cyan-400">电脑装机</span>
            <span className="text-slate-400">-预算-</span>
            <span className="text-emerald-400">模拟器</span>
          </h1>
          <p className="mt-2 text-slate-400 text-sm font-mono">DIY PC Configuration Builder</p>
        </div>
      </header>

      {/* ��体内容 */}
      <main className="container mx-auto px-4 py-8 pb-32">
        {/* 兼容性检查器 */}
        <CompatibilityChecker config={config} />

        {/* 配置面板 */}
        <ConfigPanel 
          config={config}
          setConfig={setConfig}
          onOpenCPUSelector={() => setShowCPUSelector(true)}
          onOpenGPUSelector={() => setShowGPUSelector(true)}
        />
      </main>

      {/* 底部固定栏 */}
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* 总价 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 font-mono mb-1">总价格</div>
              <div className="text-2xl font-bold text-cyan-400 font-mono">
                ¥{getTotalPrice().toLocaleString()}
              </div>
            </div>

            {/* 性能评分 */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 font-mono mb-1">性能评分</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  {getPerformanceScore().toFixed(1)} / 10
                </div>
                <div className="flex-1 bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-500"
                    style={{ width: `${getPerformanceScore() * 10}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 推荐电源 */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="text-xs text-slate-400 font-mono mb-1">推荐电源</div>
              <div className="text-2xl font-bold text-amber-400 font-mono">
                {getRecommendedPSU()}W
              </div>
              <div className="text-xs text-slate-500 mt-1">
                (当前功耗: {getTotalPowerConsumption()}W)
              </div>
            </div>

            {/* 保存按钮 */}
            <button
              onClick={saveConfig}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              <span className="font-mono">保存配置</span>
            </button>
          </div>
        </div>
      </footer>

      {/* CPU 选择器模态框 */}
      {showCPUSelector && (
        <CPUSelector
          onClose={() => setShowCPUSelector(false)}
          onSelect={(cpu) => {
            setConfig(prev => ({ ...prev, cpu, motherboard: null }));
            setGPURequired(cpu.hasIntegratedGraphics === false);
            setShowCPUSelector(false);
            toast.success(`已选择 ${cpu.name}`);
          }}
          currentCPU={config.cpu}
        />
      )}


      {/* GPU 选择器模态框 */}
      {showGPUSelector && (
        <GPUSelector
          onClose={() => setShowGPUSelector(false)}
          onSelect={(gpu) => {
            if (config.gpus.length < 4) {
              setConfig(prev => ({ ...prev, gpus: [...prev.gpus, gpu] }));
              toast.success(`已添加 ${gpu.name}`);
            } else {
              toast.error('最多只能选择 4 个显卡');
            }
            setShowGPUSelector(false);
          }}
          currentGPUs={config.gpus}
          gpuRequired={gpuRequired}
        />
      )}
    </div>
  );
}
