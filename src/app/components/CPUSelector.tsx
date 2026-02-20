import { useState, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { cpuData, CPU } from '../data/hardware-data';

interface CPUSelectorProps {
  onClose: () => void;
  onSelect: (cpu: CPU) => void;
  currentCPU: CPU | null;
}

export function CPUSelector({ onClose, onSelect, currentCPU }: CPUSelectorProps) {
  const [brand, setBrand] = useState<'AMD' | 'Intel'>('AMD');
  const [search, setSearch] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string>('');

  // 过滤和分组CPU
  const filteredCPUs = useMemo(() => {
    let cpus = cpuData.filter(cpu => cpu.brand === brand);
    
    if (search) {
      cpus = cpus.filter(cpu => 
        cpu.name.toLowerCase().includes(search.toLowerCase()) ||
        cpu.series.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedSeries) {
      cpus = cpus.filter(cpu => cpu.series === selectedSeries);
    }

    // 按系列分组
    const grouped: Record<string, CPU[]> = {};
    cpus.forEach(cpu => {
      if (!grouped[cpu.series]) {
        grouped[cpu.series] = [];
      }
      grouped[cpu.series].push(cpu);
    });

    return grouped;
  }, [brand, search, selectedSeries]);

  // 获取所有系列
  const allSeries = useMemo(() => {
    const series = new Set(cpuData.filter(cpu => cpu.brand === brand).map(cpu => cpu.series));
    return Array.from(series).sort();
  }, [brand]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-500/20">
        {/* 头部 */}
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <h2 className="text-2xl font-mono text-cyan-400">选择 CPU</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* 品牌切换 */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex gap-2">
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
              placeholder="搜索 CPU 型号..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-300 placeholder-slate-500 focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          {/* 系列筛选 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSeries('')}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                selectedSeries === ''
                  ? 'bg-cyan-500 text-white'
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
                    ? 'bg-cyan-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>

        {/* CPU 列表 */}
        <div className="flex-1 overflow-y-auto p-4">
          {Object.keys(filteredCPUs).length === 0 ? (
            <div className="text-center text-slate-500 py-12 font-mono">
              没有找到匹配的 CPU
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(filteredCPUs).map(([series, cpus]) => (
                <div key={series}>
                  <h3 className="text-lg font-mono text-emerald-400 mb-3 sticky top-0 bg-slate-900 py-2">
                    {series}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cpus.map(cpu => (
                      <button
                        key={cpu.id}
                        onClick={() => onSelect(cpu)}
                        className={`bg-slate-800/50 hover:bg-slate-800 border rounded-lg p-4 text-left transition-all ${
                          currentCPU?.id === cpu.id
                            ? 'border-cyan-500 ring-2 ring-cyan-500/50'
                            : 'border-slate-700 hover:border-cyan-500/50'
                        }`}
                      >
                        <div className="font-mono text-sm text-cyan-400 mb-2">{cpu.name}</div>
                        <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-mono mb-2">
                          <div>核心: {cpu.cores}C/{cpu.threads}T</div>
                          <div>主频: {cpu.baseClock}GHz</div>
                          <div>功耗: {cpu.tdp}W</div>
                          <div>平台: {cpu.platform}</div>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                          <div className="text-xs text-emerald-400 font-mono">
                            性能: {cpu.performance.toFixed(1)}/10
                          </div>
                          <div className="text-cyan-400 font-bold font-mono">
                            ¥{cpu.price}
                          </div>
                        </div>
                      </button>
                    ))}
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
