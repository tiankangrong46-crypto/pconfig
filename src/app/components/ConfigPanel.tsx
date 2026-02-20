import { Cpu, MonitorUp, MemoryStick, HardDrive, Zap, Fan, Package, Plus, X } from 'lucide-react';
import { PCConfig } from '../App';
import { 
  motherboardData, 
  memoryData, 
  storageData, 
  psuData, 
  coolerData, 
  caseData,
  Motherboard,
  Memory,
  Storage,
  PSU,
  Cooler,
  Case
} from '../data/hardware-data';
import { toast } from 'sonner';

interface ConfigPanelProps {
  config: PCConfig;
  setConfig: (config: PCConfig | ((prev: PCConfig) => PCConfig)) => void;
  onOpenCPUSelector: () => void;
  onOpenGPUSelector: () => void;
}

export function ConfigPanel({ config, setConfig, onOpenCPUSelector, onOpenGPUSelector }: ConfigPanelProps) {
  
  // 获取兼容的主板
  const getCompatibleMotherboards = (): Motherboard[] => {
    if (!config.cpu) return [];
    return motherboardData.filter(mb => mb.platform === config.cpu!.platform);
  };

  // 检查内存是否兼容
  const isMemoryCompatible = (memory: Memory): boolean => {
    if (!config.motherboard) return true;
    return memory.type === config.motherboard.memoryType;
  };

  // 检查机箱是否兼容主板
  const isCaseCompatible = (caseItem: Case): boolean => {
    if (!config.motherboard) return true;
    const mbSize = config.motherboard.formFactor;
    const caseSize = caseItem.formFactor;
    
    if (caseSize === 'OpenPlatform') return true;
    if (caseSize === 'E-ATX') return true;
    if (caseSize === 'ATX') return ['ATX', 'MATX', 'ITX'].includes(mbSize);
    if (caseSize === 'MATX') return ['MATX', 'ITX'].includes(mbSize);
    if (caseSize === 'ITX') return mbSize === 'ITX';
    
    return true;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* CPU 模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="text-cyan-400" size={24} />
          <div>
            <h2 className="text-xl font-mono text-cyan-400">CPU 处理器</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">（低于锐龙5000系均视为二手/捡漏）</p>
          </div>
        </div>
        
        {config.cpu ? (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-cyan-500/20">
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-lg text-emerald-400">{config.cpu.name}</div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, cpu: null, motherboard: null }))}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 font-mono">
              <div>核心: {config.cpu.cores}C/{config.cpu.threads}T</div>
              <div>主频: {config.cpu.baseClock}GHz</div>
              <div>功耗: {config.cpu.tdp}W</div>
              <div>性能: {config.cpu.performance.toFixed(1)}/10</div>
            </div>
            <div className="mt-3 text-right text-cyan-400 font-mono font-bold">
              ¥{config.cpu.price}
            </div>
          </div>
        ) : (
          <button
            onClick={onOpenCPUSelector}
            className="w-full bg-slate-900/50 hover:bg-cyan-500/10 border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-lg p-8 transition-all flex items-center justify-center gap-2 text-slate-400 hover:text-cyan-400"
          >
            <Plus size={20} />
            <span className="font-mono">选择 CPU</span>
          </button>
        )}
      </div>

      {/* 主板模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-emerald-500/50 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Package className="text-emerald-400" size={24} />
          <div>
            <h2 className="text-xl font-mono text-emerald-400">主板</h2>
            <p className="text-xs text-slate-500 font-mono mt-0.5">（低于400系主板均视为二手/拆机）</p>
          </div>
        </div>
        
        {!config.cpu ? (
          <div className="text-center text-slate-500 py-8 font-mono text-sm">
            请先选择 CPU
          </div>
        ) : config.motherboard ? (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-emerald-500/20">
            <div className="flex justify-between items-start mb-2">
              <div className="font-mono text-lg text-cyan-400">{config.motherboard.name}</div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, motherboard: null, memory: [] }))}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 font-mono">
              <div>平台: {config.motherboard.platform}</div>
              <div>芯片组: {config.motherboard.chipset}</div>
              <div>内存: {config.motherboard.memoryType}</div>
              <div>版型: {config.motherboard.formFactor}</div>
            </div>
            <div className="mt-3 text-right text-cyan-400 font-mono font-bold">
              ¥{config.motherboard.price}
            </div>
          </div>
        ) : (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {getCompatibleMotherboards().map(mb => (
              <button
                key={mb.id}
                onClick={() => {
                  setConfig(prev => ({ ...prev, motherboard: mb, memory: [] }));
                  toast.success(`已选择主板 ${mb.name}`);
                }}
                className="w-full bg-slate-900/50 hover:bg-emerald-500/10 border border-slate-700 hover:border-emerald-500 rounded-lg p-3 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <div className="font-mono text-slate-300">{mb.name}</div>
                  <div className="text-cyan-400 font-mono text-sm">¥{mb.price}</div>
                </div>
                <div className="text-xs text-slate-500 font-mono mt-1">
                  {mb.chipset} | {mb.memoryType} | {mb.formFactor}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 显卡模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-purple-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MonitorUp className="text-purple-400" size={24} />
            <h2 className="text-xl font-mono text-purple-400">显卡</h2>
            <span className="text-xs text-slate-500 font-mono">({config.gpus.length}/4)</span>
          </div>
          {config.gpus.length < 4 && (
            <button
              onClick={onOpenGPUSelector}
              className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 px-3 py-1 rounded text-sm font-mono transition-all"
            >
              添加显卡
            </button>
          )}
        </div>
        
        {config.gpus.length === 0 ? (
          <button
            onClick={onOpenGPUSelector}
            className="w-full bg-slate-900/50 hover:bg-purple-500/10 border-2 border-dashed border-slate-700 hover:border-purple-500 rounded-lg p-8 transition-all flex items-center justify-center gap-2 text-slate-400 hover:text-purple-400"
          >
            <Plus size={20} />
            <span className="font-mono">选择显卡</span>
          </button>
        ) : (
          <div className="space-y-2">
            {config.gpus.map((gpu, index) => (
              <div key={`${gpu.id}-${index}`} className="bg-slate-900/50 rounded-lg p-3 border border-purple-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-sm text-emerald-400">{gpu.name}</div>
                  <button
                    onClick={() => {
                      setConfig(prev => ({
                        ...prev,
                        gpus: prev.gpus.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 font-mono">
                  <div>显存: {gpu.vram}GB</div>
                  <div>功耗: {gpu.tdp}W</div>
                  <div>性能: {gpu.performance.toFixed(1)}/10</div>
                </div>
                <div className="mt-2 text-right text-cyan-400 font-mono text-sm">
                  ¥{gpu.price}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 内存模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-amber-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <MemoryStick className="text-amber-400" size={24} />
            <h2 className="text-xl font-mono text-amber-400">内存</h2>
            <span className="text-xs text-slate-500 font-mono">({config.memory.length}/4)</span>
          </div>
        </div>
        
        {!config.motherboard ? (
          <div className="text-center text-slate-500 py-8 font-mono text-sm">
            请先选择主板
          </div>
        ) : (
          <>
            {/* 已选内存 */}
            {config.memory.length > 0 && (
              <div className="space-y-2 mb-4">
                {config.memory.map((mem, index) => (
                  <div key={`${mem.id}-${index}`} className="bg-slate-900/50 rounded-lg p-3 border border-amber-500/20">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-mono text-sm text-emerald-400">{mem.name}</div>
                      <button
                        onClick={() => {
                          setConfig(prev => ({
                            ...prev,
                            memory: prev.memory.filter((_, i) => i !== index)
                          }));
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-400 font-mono">
                      <div>{mem.type} {mem.speed}MHz</div>
                      <div>容量: {mem.capacity}GB</div>
                      <div>性能: {mem.performance.toFixed(1)}/10</div>
                    </div>
                    <div className="mt-2 text-right text-cyan-400 font-mono text-sm">
                      ¥{mem.price}
                    </div>
                  </div>
                ))}
                <div className="text-xs text-slate-500 font-mono">
                  总容量: {config.memory.reduce((sum, m) => sum + m.capacity, 0)}GB | 
                  平均性能: {config.memory.length > 0 ? (config.memory.reduce((sum, m) => sum + m.performance, 0) / config.memory.length).toFixed(1) : '0.0'}/10
                </div>
              </div>
            )}

            {/* 可选内存列表 */}
            {config.memory.length < 4 && (
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {memoryData
                  .filter(mem => isMemoryCompatible(mem))
                  .filter(mem => config.memory.length === 0 || mem.type === config.memory[0].type)
                  .map(mem => (
                    <button
                      key={mem.id}
                      onClick={() => {
                        if (config.memory.length < 4) {
                          setConfig(prev => ({ ...prev, memory: [...prev.memory, mem] }));
                          toast.success(`已添加 ${mem.name}`);
                        }
                      }}
                      className="w-full bg-slate-900/50 hover:bg-amber-500/10 border border-slate-700 hover:border-amber-500 rounded p-2 transition-all text-left text-xs"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-slate-300">{mem.name}</span>
                        <span className="text-cyan-400 font-mono">¥{mem.price}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        性能: {mem.performance.toFixed(1)}/10 | 带宽: {(mem.speed * 64 / 8000).toFixed(1)} GB/s
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* 存储模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <HardDrive className="text-blue-400" size={24} />
            <h2 className="text-xl font-mono text-blue-400">存储</h2>
          </div>
        </div>
        
        {/* 已选存储 */}
        {config.storage.length > 0 && (
          <div className="space-y-2 mb-4">
            {config.storage.map((storage, index) => (
              <div key={`${storage.id}-${index}`} className="bg-slate-900/50 rounded-lg p-3 border border-blue-500/20 flex justify-between items-center">
                <div>
                  <div className="font-mono text-sm text-emerald-400">{storage.name}</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">
                    {storage.type} | {storage.capacity >= 1024 ? `${storage.capacity/1024}TB` : `${storage.capacity}GB`}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-cyan-400 font-mono text-sm">¥{storage.price}</div>
                  <button
                    onClick={() => {
                      setConfig(prev => ({
                        ...prev,
                        storage: prev.storage.filter((_, i) => i !== index)
                      }));
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 可选存储列表 */}
        <div className="space-y-1 max-h-48 overflow-y-auto">
          {storageData.map(storage => (
            <button
              key={storage.id}
              onClick={() => {
                setConfig(prev => ({ ...prev, storage: [...prev.storage, storage] }));
                toast.success(`已添加 ${storage.name}`);
              }}
              className="w-full bg-slate-900/50 hover:bg-blue-500/10 border border-slate-700 hover:border-blue-500 rounded p-2 transition-all text-left text-xs"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-300">{storage.name}</span>
                <span className="text-cyan-400 font-mono">¥{storage.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 电源模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-yellow-500/50 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-yellow-400" size={24} />
          <h2 className="text-xl font-mono text-yellow-400">电源</h2>
        </div>
        
        {config.psu ? (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-yellow-500/20">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-lg text-emerald-400">{config.psu.name}</div>
                <div className="text-sm text-slate-400 font-mono mt-1">
                  {config.psu.wattage}W
                </div>
              </div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, psu: null }))}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 text-right text-cyan-400 font-mono font-bold">
              ¥{config.psu.price}
            </div>
          </div>
        ) : (
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {psuData.map(psu => (
              <button
                key={psu.id}
                onClick={() => {
                  setConfig(prev => ({ ...prev, psu }));
                  toast.success(`已选择 ${psu.name} 电源`);
                }}
                className="w-full bg-slate-900/50 hover:bg-yellow-500/10 border border-slate-700 hover:border-yellow-500 rounded p-3 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-slate-300">{psu.name}</span>
                  <span className="text-cyan-400 font-mono text-sm">¥{psu.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 散热器模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-indigo-500/50 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Fan className="text-indigo-400" size={24} />
          <h2 className="text-xl font-mono text-indigo-400">散热器</h2>
        </div>
        
        {config.cooler ? (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-indigo-500/20">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-lg text-emerald-400">{config.cooler.name}</div>
                <div className="text-sm text-slate-400 font-mono mt-1">
                  {config.cooler.type} {config.cooler.spec}
                </div>
              </div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, cooler: null }))}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 text-right text-cyan-400 font-mono font-bold">
              ¥{config.cooler.price}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {coolerData.map(cooler => (
              <button
                key={cooler.id}
                onClick={() => {
                  setConfig(prev => ({ ...prev, cooler }));
                  toast.success(`已选择 ${cooler.name}`);
                }}
                className="w-full bg-slate-900/50 hover:bg-indigo-500/10 border border-slate-700 hover:border-indigo-500 rounded p-3 transition-all text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-slate-300">{cooler.name}</span>
                  <span className="text-cyan-400 font-mono text-sm">¥{cooler.price}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 机箱模块 */}
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6 hover:border-pink-500/50 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Package className="text-pink-400" size={24} />
          <h2 className="text-xl font-mono text-pink-400">机箱</h2>
        </div>
        
        {config.case ? (
          <div className="bg-slate-900/50 rounded-lg p-4 border border-pink-500/20">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-mono text-lg text-emerald-400">{config.case.name}</div>
                <div className="text-sm text-slate-400 font-mono mt-1">
                  {config.case.formFactor}
                </div>
              </div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, case: null }))}
                className="text-red-400 hover:text-red-300"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-3 text-right text-cyan-400 font-mono font-bold">
              ¥{config.case.price}
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {caseData.map(caseItem => {
              const compatible = isCaseCompatible(caseItem);
              return (
                <button
                  key={caseItem.id}
                  onClick={() => {
                    if (compatible) {
                      setConfig(prev => ({ ...prev, case: caseItem }));
                      toast.success(`已选择 ${caseItem.name} 机箱`);
                    } else {
                      toast.error('机箱与主板不兼容');
                    }
                  }}
                  disabled={!compatible}
                  className={`w-full bg-slate-900/50 border rounded p-3 transition-all text-left ${
                    compatible 
                      ? 'hover:bg-pink-500/10 border-slate-700 hover:border-pink-500' 
                      : 'opacity-40 cursor-not-allowed border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-slate-300">{caseItem.name}</span>
                    <span className="text-cyan-400 font-mono text-sm">¥{caseItem.price}</span>
                  </div>
                  {!compatible && (
                    <div className="text-xs text-red-400 mt-1 font-mono">不兼容当前主板</div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}