import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { PCConfig } from '../App';

interface CompatibilityCheckerProps {
  config: PCConfig;
}

export function CompatibilityChecker({ config }: CompatibilityCheckerProps) {
  const issues: string[] = [];
  const warnings: string[] = [];

  // 检查 CPU 和主板兼容性
  if (config.cpu && config.motherboard) {
    if (config.cpu.platform !== config.motherboard.platform) {
      issues.push(`CPU 平台 (${config.cpu.platform}) 与主板平台 (${config.motherboard.platform}) 不兼容`);
    }
  }

  // 检查内存兼容性
  if (config.motherboard && config.memory.length > 0) {
    const memoryTypes = new Set(config.memory.map(m => m.type));
    if (memoryTypes.size > 1) {
      issues.push('内存类型混用：不能同时使用 DDR4 和 DDR5');
    }

    const firstMemoryType = config.memory[0].type;
    if (firstMemoryType !== config.motherboard.memoryType) {
      issues.push(`内存类型 (${firstMemoryType}) 与主板支持类型 (${config.motherboard.memoryType}) 不兼容`);
    }
  }

  // 检查机箱和主板兼容性
  if (config.motherboard && config.case) {
    const mbSize = config.motherboard.formFactor;
    const caseSize = config.case.formFactor;
    
    let compatible = false;
    if (caseSize === 'OpenPlatform' || caseSize === 'E-ATX') {
      compatible = true;
    } else if (caseSize === 'ATX') {
      compatible = ['ATX', 'MATX', 'ITX'].includes(mbSize);
    } else if (caseSize === 'MATX') {
      compatible = ['MATX', 'ITX'].includes(mbSize);
    } else if (caseSize === 'ITX') {
      compatible = mbSize === 'ITX';
    }

    if (!compatible) {
      issues.push(`机箱 (${caseSize}) 无法容纳主板 (${mbSize})`);
    }
  }

  // 检查电源功率
  if (config.psu) {
    let totalPower = 0;
    if (config.cpu) totalPower += config.cpu.tdp;
    config.gpus.forEach(gpu => totalPower += gpu.tdp);
    totalPower += 50; // 其他组件

    const recommendedPower = totalPower + 100;
    
    if (config.psu.wattage < totalPower) {
      issues.push(`电源功率 (${config.psu.wattage}W) 不足，当前配置需要至少 ${totalPower}W`);
    } else if (config.psu.wattage < recommendedPower) {
      warnings.push(`电源功率 (${config.psu.wattage}W) 偏小，建议至少 ${recommendedPower}W`);
    }
  }

  // 检查散热器
  if (config.cpu && !config.cooler) {
    if (config.cpu.tdp > 65) {
      warnings.push(`CPU 功耗较高 (${config.cpu.tdp}W)，建议选择散热器`);
    }
  }

  // 没有选择任何配件
  if (!config.cpu && !config.motherboard && config.gpus.length === 0) {
    return null;
  }

  // 如果没有问题和警告
  if (issues.length === 0 && warnings.length === 0) {
    return (
      <div className="mb-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3">
        <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <div className="text-emerald-400 font-mono font-bold mb-1">兼容性检查通过</div>
          <div className="text-sm text-slate-300">当前配置所有硬件兼容，可以正常使用。</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-3">
      {/* 错误 */}
      {issues.length > 0 && (
        <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <div className="text-red-400 font-mono font-bold mb-2">兼容性问题</div>
              <ul className="space-y-1">
                {issues.map((issue, index) => (
                  <li key={index} className="text-sm text-slate-300 font-mono">
                    • {issue}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 警告 */}
      {warnings.length > 0 && (
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
            <div className="flex-1">
              <div className="text-amber-400 font-mono font-bold mb-2">建议</div>
              <ul className="space-y-1">
                {warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-slate-300 font-mono">
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
