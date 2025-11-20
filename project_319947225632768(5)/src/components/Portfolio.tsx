import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiteraryWorks } from './LiteraryWorks';
import { InteractiveVideo } from './InteractiveVideo';
import { GameDesign } from './GameDesign';
import { ArrowLeft, Briefcase, FileText, Video, GamepadIcon, TrendingUp, Award, Eye } from 'lucide-react';
import '@/styles/water-animations.css';

interface PortfolioProps {
  onBack: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('literary');
  const [mounted, setMounted] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    setMounted(true);

    // 自动生成水波纹效果
    const interval = setInterval(() => {
      const newRipple = {
        id: Date.now(),
        x: Math.random() * 100,
        y: Math.random() * 100
      };
      setRipples(prev => [...prev.slice(-2), newRipple]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 3000);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden relative"
      onClick={createRipple}
    >
      {/* 水波纹背景 */}
      <div className="absolute inset-0 water-surface opacity-25">
        <div className="water-texture" />
      </div>

      {/* 动态水波纹 */}
      <div className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute w-96 h-96 rounded-full"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
              animation: 'ripple-expand 4s ease-out',
            }}
          />
        ))}
      </div>

      {/* 流动装饰元素 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-8"
            style={{
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              animation: `water-flow ${20 + i * 3}s ease-in-out infinite`,
              animationDelay: `${i * 2.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 主内容区域 */}
        <div className={`space-y-8 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } smooth-transition-slow`}>

          {/* 头部导航 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <button
                className="px-6 py-3 bg-white/60 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover-lift smooth-transition ripple-effect border border-white/40"
                onClick={onBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2 inline-block" />
                Back
              </button>
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-100">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <h1 className="text-4xl font-bold gradient-text">Portfolio</h1>
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { number: '37', label: 'Total Projects', icon: FileText, color: 'from-blue-400 to-cyan-500' },
              { number: '3', label: 'Categories', icon: TrendingUp, color: 'from-purple-400 to-pink-500' },
              { number: '12', label: 'Awards', icon: Award, color: 'from-yellow-400 to-orange-500' },
              { number: '284K', label: 'Total Views', icon: Eye, color: 'from-green-400 to-emerald-500' }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className={`glass-effect rounded-2xl p-6 text-center hover-lift soft-shadow ripple-effect cursor-pointer ${
                  mounted ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  animationDelay: mounted ? `${0.2 + index * 0.1}s` : '0s',
                  animation: mounted ? `slide-in-up 0.6s ease-out ${0.2 + index * 0.1}s both` : 'none'
                }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 标签页导航 */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-effect p-2 rounded-2xl border border-white/20">
              <TabsTrigger
                value="literary"
                className="data-[state=active]:bg-white data-[state=active]:shadow-lg text-gray-700 font-medium rounded-xl smooth-transition ripple-effect hover:bg-white/50"
              >
                <FileText className="w-4 h-4 mr-2" />
                Literary
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="data-[state=active]:bg-white data-[state=active]:shadow-lg text-gray-700 font-medium rounded-xl smooth-transition ripple-effect hover:bg-white/50"
              >
                <Video className="w-4 h-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger
                value="games"
                className="data-[state=active]:bg-white data-[state=active]:shadow-lg text-gray-700 font-medium rounded-xl smooth-transition ripple-effect hover:bg-white/50"
              >
                <GamepadIcon className="w-4 h-4 mr-2" />
                Games
              </TabsTrigger>
            </TabsList>

            {/* 标签页内容 */}
            <div className="mt-8">
              <TabsContent
                value="literary"
                className={`space-y-6 ${
                  activeTab === 'literary' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } smooth-transition`}
              >
                <LiteraryWorks />
              </TabsContent>

              <TabsContent
                value="video"
                className={`space-y-6 ${
                  activeTab === 'video' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } smooth-transition`}
              >
                <InteractiveVideo />
              </TabsContent>

              <TabsContent
                value="games"
                className={`space-y-6 ${
                  activeTab === 'games' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                } smooth-transition`}
              >
                <GameDesign />
              </TabsContent>
            </div>
          </Tabs>

          {/* 页脚信息 */}
          <div className="glass-effect rounded-2xl p-6 text-center smooth-transition">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm">
                Total projects: 37 | Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};