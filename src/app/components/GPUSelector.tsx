import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { gpuData, GPU } from '../data/hardware-data';

interface GPUSelectorProps {
  onClose: () => void;
  onSelect: (gpu: GPU) => void;
  currentGPUs: GPU[];
  gpuRequired?: boolean;
}

export function GPUSelector({ onClose, onSelect, currentGPUs, gpuRequired = false }: GPUSelectorProps) {
  const [brand, setBrand] = useState<'NVIDIA' | 'AMD' | 'Intel'>('NVIDIA');
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('');

  // 过滤和分组GPU
  const filteredGPUs = useMemo(() => {
    let gpus = gpuData.filter(gpu => gpu.brand === brand);
    
    if (search) {
      gpus = gpus.filter(gpu => 
        gpu.name.toLowerCase().includes(search.toLowerCase()) ||
        gpu.series.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedSeries) {
      gpus = gpus.filter(gpu => gpu.series === selectedSeries);
    }

    // 按系列分组
    const grouped: Record<string, GPU[]> = {};
    gpus.forEach(gpu => {
      if (!grouped[gpu.series]) {
        grouped[gpu.series] = [];
      }
      grouped[gpu.series].push(gpu);
    });

    return grouped;
  }, [brand, search, selectedSeries]);

  // 获取所有系列
  const allSeries = useMemo(() => {
    const series = new Set(gpuData.filter(gpu => gpu.brand === brand).map(gpu => gpu.series));
    return Array.from(series).sort();
  }, [brand]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-purple-500/30 rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl shadow-purple-500/20">
        {/* 头部 */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-mono text-purple-400">选择显卡</h2>
            <span className="text-sm text-slate-500 font-mono">
              已选: {currentGPUs.length}/4
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-purple-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 品牌切换 */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex gap-2">
            <button
              onClick={() => {
                setBrand('NVIDIA');
                setSelectedSeries('');
              }}
              className={`flex-1 py-3 rounded-lg font-mono transition-all ${
                brand === 'NVIDIA'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              NVIDIA
            </button>
            <button
              onClick={() => {
                setBrand('AMD');
                setSelectedSeries('');
              }}
              className={`flex-1 py-3 rounded-lg font-mono transition-all ${
                brand === 'AMD'
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              AMD
            </button>
            <button
              onClick={() => {
                setBrand('Intel');
                setSelectedSeries('');
              }}
              className={`flex-1 py-3 rounded-lg font-mono transition-all ${
                brand === 'Intel'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Intel
            </button>
          </div>
        </div>

        {/* 搜索和筛选 */}
        <div className="p-4 border-b border-slate-700/50 space-y-3">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="搜索显卡型号..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-300 placeholder-slate-500 focus:border-purple-500 focus:outline-none font-mono"
            />
          </div>

          {/* 系列筛选 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSeries('')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                selectedSeries === ''
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              全部
            </button>
            {allSeries.map(series => (
              <button
                key={series}
                onClick={() => setSelectedSeries(series)}
                className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                  selectedSeries === series
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>

        {/* GPU 列表 */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* GPU 必选提示条 */}
          {gpuRequired && currentGPUs.length === 0 && (
            <div className="bg-red-900 text-red-400 px-3 py-2 rounded font-mono mb-3 text-center shadow">
                ⚠ 该 CPU 无核显，必须选择独立显卡
            </div>
          )}

          {Object.keys(filteredGPUs).length === 0 ? (
            <div className="text-center text-slate-500 py-12 font-mono">
              没有找到匹配的显卡
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(filteredGPUs).map(([series, gpus]) => (
                <div key={series}>
                  <h3 className="text-lg font-mono text-emerald-400 mb-3 sticky top-0 bg-slate-900 py-2">
                    {series}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {gpus.map(gpu => {
                      const isSelected = currentGPUs.some(g => g.id === gpu.id);
                      return (
                        <button
                          key={gpu.id}
                          onClick={() => onSelect(gpu)}
                          className={`bg-slate-800/50 hover:bg-slate-800 border rounded-lg p-4 text-left transition-all ${
                            isSelected
                              ? 'border-purple-500 ring-2 ring-purple-500/50'
                              : 'border-slate-700 hover:border-purple-500/50'
                          }`}
                        >
                          <div className="font-mono text-sm text-purple-400 mb-2">{gpu.name}</div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-mono mb-2">
                            <div>显存: {gpu.vram}GB</div>
                            <div>功耗: {gpu.tdp}W</div>
                          </div>
                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                            <div className="text-xs text-emerald-400 font-mono">
                              性能: {gpu.performance.toFixed(1)}/10
                            </div>
                            <div className="text-cyan-400 font-bold font-mono">
                              ¥{gpu.price.toLocaleString()}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
